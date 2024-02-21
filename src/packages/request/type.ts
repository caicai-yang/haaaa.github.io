import {
  Axios,
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosPromise,
} from 'axios'

export interface IAxiosRequestConfig<D = any>
  extends InternalAxiosRequestConfig<D> {
  isCustomCatchError?: boolean // 是否自定义捕获错误
  preventTransParams?: boolean // 是否阻止映射 params 参数
  isRepeat?: boolean // 同个 post, put 请求是否允许并发
  requestKey?: string // 当前请求的唯一标识
}
export interface IAxios extends Axios {
  get<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    config?: IAxiosRequestConfig<D>
  ): Promise<R>
  delete<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    config?: IAxiosRequestConfig<D>
  ): Promise<R>
  head<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    config?: IAxiosRequestConfig<D>
  ): Promise<R>
  options<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    config?: IAxiosRequestConfig<D>
  ): Promise<R>
  post<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: IAxiosRequestConfig<D>
  ): Promise<R>
  put<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: IAxiosRequestConfig<D>
  ): Promise<R>
  patch<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: IAxiosRequestConfig<D>
  ): Promise<R>
}
export interface IAxiosInstance extends IAxios {
  (config: IAxiosRequestConfig): AxiosPromise
  (url: string, config?: IAxiosRequestConfig): AxiosPromise
}
export interface IAxiosResponse<T = any, D = any>
  extends Omit<AxiosResponse<T, D>, 'config'> {
  config: IAxiosRequestConfig<D>
}
