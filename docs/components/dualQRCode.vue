<template>
  <div class="demo-image__placeholder">
    <div v-for="code in qrCodes" :key='code.name' class="block">
      <el-image :src="code.src" fit="contain"/>
      <span class="demonstration">{{ code.name }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ElImage } from 'element-plus'

const qrCodes = [
  {
    name: 'CSDN',
    src: '/QR-code/qq-group.jpg',
  },
  {
    name: '微信',
    src: '/QR-code/wechat.jpg',
  }
]
</script>

<style scoped>
.demo-image__placeholder .block {
  padding: 40px 0;
  text-align: center;
  display: inline-block;
  width: 50%;
  box-sizing: border-box;
  vertical-align: top;
}

.demo-image__placeholder .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 1rem;
}

@media screen and (min-width: 641px) {
  .el-image {
    width: 14rem;
    height: 14rem;
  }
}
@media screen and (max-width: 640px) {
  .el-image {
    width: 10rem;
    height: 10rem;
  }
}

</style>
