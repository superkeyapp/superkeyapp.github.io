// 主题：沿用 VitePress 默认主题，加两样：
//   - 首页组件 HomePage（首页 index.md 里用）
//   - 图片点击放大（medium-zoom）：首页演示图、文档里标了 data-zoomable 的图片
import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import { onMounted, watch, nextTick } from 'vue'
import { useRoute } from 'vitepress'
import mediumZoom from 'medium-zoom'
import HomePage from './HomePage.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('HomePage', HomePage)
  },
  setup() {
    const route = useRoute()
    const zoom = () => mediumZoom('[data-zoomable], .vp-doc img', { background: 'var(--vp-c-bg)' })
    onMounted(zoom)
    watch(() => route.path, () => nextTick(zoom))   // 换页后新页面里的图片也要能放大
  },
} satisfies Theme
