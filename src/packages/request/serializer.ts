/**
 * 参数序列化
 * @param preventTransParams 是否清除 null, undefined, '' 值
 */
import qs from 'qs'

export function serializer(preventTransParams = false) {
  return (params: Record<string, any>) => {
    const str = qs.stringify(params)
    if (preventTransParams) {
      return str
    }
    return str
      .split('&')
      .filter((item: string) => {
        const [, value] = item.split('=')
        return (
          value !== null &&
          value !== undefined &&
          value !== ''
        )
      })
      .join('&')
  }
}
