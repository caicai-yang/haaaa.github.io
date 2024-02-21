<script lang="ts">
export default {
  name: 'RequestDemo',
  title: 'request demo',
}
</script>

<script lang="ts" setup>
import { request } from '../source.ts'
const service = request({
  baseURL: 'https://mock.apifox.com/m1/2418902-0-default',
})

function handleRequest() {
  service
    .post(
      '/request-demo-api',
      {
        field1: 'filed1',
        field2: '',
      },
      {
        params: {
          test: 'test',
          param1: '11',
          // params2, param3, param4 被参数序列化时移除
          param2: '',
          param3: null,
          param4: undefined,
        },
        preventTransParams: false, // 决定GET参数是否移除'', undefined, null 值
      }
    )
    .then((res: any) => {
      console.log('res', res)
    })
}
</script>

<template>
  <button type="button" @click="handleRequest">
    疯狂点击此按钮
  </button>

  <button type="button" @click="handleRequest">
    调低网速，间隔1s内点击，观察请求次数
  </button>
</template>

<style>
button + button {
  margin-left: 20px;
}
</style>
