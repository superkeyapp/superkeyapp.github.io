// 访问统计（百度统计）：只在正式网址上统计，本地预览不统计（事件改为打在浏览器控制台里，方便检查）。统计了这些：
//   - 页面访问：第一次打开由百度统计自己记；之后在网站里换页（VitePress 是单页应用，不会重新打开页面）手动上报
//   - 点击：所有链接、按钮、可展开的标题自动上报 —— 分类是所在区域（顶部导航、左侧目录、首页首屏、某个功能……），
//     动作是点了什么（文字），标签是去哪里（链接地址）。个别按钮要更明确的名字时，加 data-track="名字"
//   - 首页滚动看到了哪一节（每次打开页面每节只报一次）、文档读到了底
//   - 站内搜索输入的词（首页的演示视频是自动静音循环播放的，不算用户操作，不统计；看没看到那一节见“滚动到”）
// 换成自己的域名时，把它加进 HOSTS。
import type { Router } from 'vitepress'

const SITE_ID = '04c90f5b6a0cf673debb3794856d9d94'
const HOSTS = ['superkeyapp.github.io']

declare global {
  interface Window {
    _hmt?: unknown[]
  }
}

const live = () => HOSTS.includes(location.hostname)

function send(...args: unknown[]) {
  if (live()) (window._hmt ??= []).push(args)
  else console.debug('[统计]', ...args)
}

function event(category: string, action: string, label = '') {
  if (!category || !action) return   // 百度统计会丢掉分类或动作为空的事件
  send('_trackEvent', category.slice(0, 30), action.slice(0, 50), label.slice(0, 200))
}

const clean = (s: string | null | undefined) => (s ?? '').replace(/[\u200b\u200c\u200d\ufeff]/g, '').replace(/\s+/g, ' ').trim()   // 去掉标题锚点里看不见的零宽字符

// 点在哪个区域：自己标的 data-track-area 优先，其次是 VitePress 默认主题、首页的各块
function area(el: Element): string {
  const marked = el.closest<HTMLElement>('[data-track-area]')
  if (marked) return marked.dataset.trackArea!
  const feature = el.closest('.feature')
  if (feature) return '功能·' + clean(feature.querySelector('.feature-name')?.textContent)
  const rules: [string, string][] = [
    ['.VPLocalSearchBox', '站内搜索'],
    ['.VPNavScreen', '顶部导航（手机）'],
    ['.VPNav', '顶部导航'],
    ['.VPSidebar', '左侧目录'],
    ['.VPLocalNav', '目录按钮（手机）'],
    ['.VPDocAside', '本页目录'],
    ['.VPDocFooter', '文档底部'],
    ['.VPFooter', '页脚'],
    ['.screens-hero', '界面预览'],
    ['.hero', '首页首屏'],
    ['.editions', '版本'],
    ['.compare', '版本对比'],
    ['.vp-doc', '文档正文'],
  ]
  for (const [selector, name] of rules) if (el.closest(selector)) return name
  return '其他'
}

function onClick(e: MouseEvent) {
  const el = (e.target as Element | null)?.closest<HTMLElement>('a, button, summary, [data-track]')
  if (!el) return
  const what = clean(el.dataset.track) || clean(el.textContent) || clean(el.getAttribute('aria-label')) || clean(el.title) || el.tagName.toLowerCase()
  const href = el instanceof HTMLAnchorElement ? el.getAttribute('href') ?? '' : ''
  event(area(el), what, href)
}

// 首页每一节第一次出现在屏幕上时报一次；文档滚到最后一段时报“读到底”
let observer: IntersectionObserver | undefined
function watchSections(path: string) {
  observer?.disconnect()
  const seen = new Set<Element>()
  observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting || seen.has(entry.target)) continue
      seen.add(entry.target)
      const t = entry.target as HTMLElement
      event('滚动到', t.dataset.trackName!, path)
    }
  }, { rootMargin: '0px 0px -40% 0px' })   // 这一节进入了屏幕上部 60% 才算看到（比屏幕还高的一节也能触发）
  const named = (el: Element, name: string) => {
    ;(el as HTMLElement).dataset.trackName = name
    observer!.observe(el)
  }
  document.querySelectorAll('.hero').forEach((el) => named(el, '首页首屏'))
  document.querySelectorAll('.screens-hero').forEach((el) => named(el, '界面预览'))
  document.querySelectorAll('.feature').forEach((el) => named(el, '功能·' + clean(el.querySelector('.feature-name')?.textContent)))
  document.querySelectorAll('.editions').forEach((el) => named(el, '版本'))
  const doc = document.querySelector('.VPDoc .vp-doc > div')   // 只有文档页（首页不算“读到底”）
  const last = doc?.lastElementChild
  if (last) named(last, '读到底·' + clean(document.querySelector('.vp-doc h1')?.textContent))
}

let searchTimer: number | undefined
function onInput(e: Event) {
  const input = e.target as HTMLInputElement
  if (!input.closest?.('.VPLocalSearchBox')) return
  clearTimeout(searchTimer)
  searchTimer = window.setTimeout(() => {
    const q = clean(input.value)
    if (q) event('站内搜索', q)
  }, 1500)   // 停下来 1.5 秒才算一次搜索，不是每个字都报
}

export function setupAnalytics(router: Router) {
  if (typeof window === 'undefined') return   // 生成静态页面时不运行
  if (live()) {
    window._hmt ??= []
    const hm = document.createElement('script')
    hm.src = 'https://hm.baidu.com/hm.js?' + SITE_ID
    document.head.appendChild(hm)
  }
  document.addEventListener('click', onClick, true)
  document.addEventListener('input', onInput, true)
  const afterLoad = () => setTimeout(() => watchSections(location.pathname), 500)
  afterLoad()
  const previous = router.onAfterRouteChange
  let first = true
  router.onAfterRouteChange = (to) => {
    previous?.(to)
    if (first) {
      first = false   // 第一次打开：百度统计自己记过了，不重复记
      return
    }
    send('_trackPageview', to)   // 网站里换页：手动记一次访问
    afterLoad()
  }
}
