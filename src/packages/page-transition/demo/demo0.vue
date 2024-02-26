<script lang="ts">
export default {
  name: 'PageTransitionDemo',
  title: '基本',
}
</script>
<script setup lang="ts">
import PageTransition from 'my-lib/page-transition'
</script>

<template>
  <PageTransition class="page-transition-demo">
    <template #upComponent>
      <div>UpComponent 组件</div>
      <div>
        半屏显示时停留在icon上点击鼠标右键,
        UpComponent组件显示为全屏; 点击鼠标左键恢复为半屏
      </div>
    </template>
    <template #bottomComponent>
      <div>BottomComponent 组件</div>
      <div>
        半屏显示时停留在icon上点击鼠标右键,
        BottomComponent组件显示为全屏;
        点击鼠标左键恢复为半屏
      </div>
    </template>
  </PageTransition>
</template>

<style scoped>
.page-transition-demo {
  min-height: 500px;
}
</style>
