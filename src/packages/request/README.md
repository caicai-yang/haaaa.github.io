# Request 请求库
基于 axios 二次封装的请求库
1. 默认清除params参数中为null, undefined, '' 的值, preventTransParams=true可阻止此行为
2. 默认post, put在1s内不能连续发送相同请求, 实现全局防抖
3. 默认post, put在上一次请求未完成时, 取消下一次相同请求

## 源代码
<<< src/packages/request/serializer.ts
<<< src/packages/request/source.ts


## 案例

:::demo  
src/packages/request/demo/demo0.vue  
:::
