import axios, { AxiosRequestConfig } from 'axios'
import qs from 'qs'
import { serializer } from '../serializer'

/**
 * 基于 axios 二次封装的请求库
 *  1. 默认支持params清除空值, preventTransParams=true可阻止此行为
 *  2. 默认post, put在1s内不能连续发送相同请求
 *  3. 默认post, put在上一次请求未完成时, 取消下一次相同请求
 */

import type {
  IAxiosInstance,
  IAxiosRequestConfig,
  IAxiosResponse,
} from './type'

const FORM_URLENCODED =
  'application/x-www-form-urlencoded; charset=UTF-8'

// 取消请求
const CancelToken = axios.CancelToken

// 存储所有 pending 状态的请求
const pendingRequests = new Map()

// 两条相同请求发送时间距离小于1s
const TIME_STAMP = 1000
// 上个请求的 requestKey 和 timeStamp
let preRequest: { requestKey: string; timeStamp: number } =
  { requestKey: '', timeStamp: 0 }

export function request({
  timeout = 10 * 60 * 1000,
  headers = {
    'Content-Type': 'application/json; charset=UTF-8',
  },
  ...config
}: AxiosRequestConfig = {}) {
  const service: IAxiosInstance = axios.create({
    timeout, // 默认超时时间为 10s
    headers, // 请求头
    ...config,
  })

  // 请求拦截器
  service.interceptors.request.use(
    (config: IAxiosRequestConfig) => {
      const method = config.method?.toLowerCase() ?? 'get'

      if (
        config.headers['Content-Type'] === FORM_URLENCODED
      ) {
        config.data = qs.stringify(config.data)
      }
      // 参数序列化
      config.paramsSerializer = {
        serialize: serializer(config.preventTransParams),
      }

      // 当前请求标识
      const requestKey = `${config.url}/${JSON.stringify(
        config.params
      )}/${JSON.stringify(
        config.data
      )}&request_type=${method}`

      const source = CancelToken.source()
      config.cancelToken = source.token

      if (
        !config.isRepeat &&
        (method === 'post' || method === 'put')
      ) {
        if (
          preRequest.requestKey === requestKey &&
          Date.now() - preRequest.timeStamp <= TIME_STAMP
        ) {
          source.cancel(`Duplicate request: ${config.url}`)
        }
        if (pendingRequests.has(requestKey)) {
          source.cancel(`Duplicate request: ${config.url}`)
        } else {
          pendingRequests.set(requestKey, true)
          config.requestKey = requestKey
        }
      }
      preRequest = {
        requestKey,
        timeStamp: Date.now(),
      }
      return config
    },
    (error) => {
      pendingRequests.clear()
      return Promise.reject(error.response)
    }
  )

  service.interceptors.response.use(
    (response: IAxiosResponse) => {
      const requestKey = response.config.requestKey
      if (requestKey) {
        pendingRequests.delete(requestKey)
      }
      return Promise.resolve(response)
    },
    (error) => {
      pendingRequests.clear()
      return Promise.reject(error)
    }
  )

  return service
}
