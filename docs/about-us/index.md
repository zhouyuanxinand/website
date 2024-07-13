
## 关于我的信息

<dualQRCode/>

<el-button
type="primary"
size="large"
@click="router.go('/join-us/')"
style="display: block;width: 8rem;margin: 0 auto;"
round
>
🥰 请联系我
</el-button>

<script setup>
import { ElButton } from  'element-plus';
import { useRouter } from 'vitepress';
import dualQRCode from '../components/dualQRCode.vue';
</script>