// 首页的内容：优势、标题区、功能演示、三个版本。改文字、换图片只改这里，样式在 HomePage.vue
// 写法：短、直接。每个功能一句话 + 一个例子，不堆形容词

/** 演示图：图片（png / jpg / gif / webp）或视频（mp4 / webm，自动播放、静音、循环）；没有时显示占位框 */
export interface Media {
  src?: string
  poster?: string   // 视频加载前显示的封面图
  alt: string
}

/** 例子里的一段：普通文字，或画成按键的一段（如 Ctrl+C） */
export type ExamplePart = string | { key: string }

export interface Feature {
  id: string
  name: string            // 功能名（小字，标题上面）
  title: string           // 一句话说它能做什么
  text: string            // 补充一句
  examples: ExamplePart[][]  // 具体例子，一行一个
  media: Media
}

export interface Advantage {
  icon: 'free' | 'offline' | 'small' | 'editions'   // 图标（HomePage.vue 里画）
  title: string
  text: string
}

export interface Edition {
  id: 'winui' | 'win32' | 'tauri'
  name: string
  recommended?: boolean
  summary: string
  points: string[]
  size: string
  downloads: { label: string; link: string }[]
}

export interface CompareRow {
  label: string
  values: [string, string, string]   // WinUI、Win32、Tauri
}

// 体积：按实际文件向上取整（62.8 MB 写 63 MB）
// 还没有正式发布：下载按钮先指向“下载”页面
const downloadPage = '/download'

/** 打开首页第一眼看到的：先说放心（免费、离线），再说软件 */
export const advantages: Advantage[] = [
  { icon: 'free', title: '免费使用', text: '无广告，不用注册' },
  { icon: 'offline', title: '完全离线', text: '不联网，不上传' },
  { icon: 'small', title: '小巧轻快', text: '最小 3 MB' },
  { icon: 'editions', title: '三种版本', text: '功能一样，任选' },
]

export const hero = {
  name: '超级快捷键',
  title: '常用操作，一步完成',
  tagline: '不光是快捷键，鼠标也能用',
  // 能用哪些方式触发；以后加了轮盘等，在这里加一项
  ways: ['快捷键', '鼠标手势', '屏幕边缘', '复制搜索', 'CapsLock 组合键', '多步按键', '短语替换'],
  bottom: '常用操作，一步完成',
  primary: { text: '免费下载', link: downloadPage },
  secondary: { text: '其他版本 · 最小 3 MB', link: '#editions' },
  note: 'WinUI 版 · 63 MB · Windows 10 / 11',
}

export const features: Feature[] = [
  // 顺序：先讲快捷键（和名字对上），再讲鼠标能做的（别处没有），最后是进阶和输入法也有的
  // 例子只写装好就能用的；要自己设的写成“自己设…”
  {
    id: 'hotkey',
    name: '快捷键',
    title: '一个快捷键，打开常用的网站和软件',
    text: '自己设一个组合键，按一下就打开。',
    examples: [
      [{ key: 'Ctrl+Alt+B' }, ' → 打开百度'],
      [{ key: 'Ctrl+Alt+X' }, ' → 打开微信'],
      [{ key: 'Ctrl+Alt+Shift+P' }, ' → 暂停 / 恢复全部功能（自带）'],
      ['前两个是例子，在设置里一分钟就能加好'],
    ],
    media: { alt: '快捷键演示' },
  },
  {
    id: 'gesture',
    name: '鼠标手势',
    title: '按住右键，划一下',
    text: '后退、关标签页、最小化，不用找按钮。装好就能用。',
    examples: [
      ['右键划 ', { key: '←' }, ' → 后退'],
      ['右键划 ', { key: '↓→' }, ' → 关闭标签页'],
      ['右键划 ', { key: '↓←' }, ' → 最小化窗口'],
    ],
    media: { alt: '鼠标手势演示' },
  },
  {
    id: 'edge',
    name: '屏幕边缘',
    title: '鼠标放到屏幕边上，滚一下',
    text: '不用找音量图标，不用开设置。',
    examples: [
      ['左上角 + ', { key: '滚轮' }, ' → 调音量'],
      ['左上角 + ', { key: '按滚轮' }, ' → 静音'],
      ['顶边 + ', { key: '滚轮' }, ' → 调亮度（笔记本）'],
    ],
    media: { alt: '屏幕边缘演示' },
  },
  {
    id: 'copySearch',
    name: '复制搜索',
    title: '复制完，直接搜',
    text: '不用开浏览器、不用粘贴。',
    examples: [['选中文字 → ', { key: 'Ctrl+C' }, ' ', { key: 'Ctrl+C' }, ' → ', { key: 'B' }, ' 百度 / ', { key: 'T' }, ' 翻译']],
    media: { alt: '复制搜索演示' },
  },
  {
    id: 'caps',
    name: 'CapsLock 增强',
    title: '手不离主键区',
    text: '按住 CapsLock，字母键变成方向、翻页、删除。单按照样切大小写。',
    examples: [[{ key: 'CapsLock' }, ' + ', { key: 'I' }, ' ', { key: 'J' }, ' ', { key: 'K' }, ' ', { key: 'L' }, ' → 方向键']],
    media: { alt: 'CapsLock 增强演示' },
  },
  {
    id: 'macro',
    name: '多步按键',
    title: '一个快捷键，连着做好几件事',
    text: '按键、打字、打开软件、窗口操作，按顺序执行。',
    examples: [
      ['例如“老板键”：静音 + 显示桌面'],
      ['例如“日报”：打出标题、日期和固定格式'],
    ],
    media: { alt: '多步按键演示' },
  },
  {
    id: 'phrase',
    name: '短语替换',
    title: '打几个字母，出来一整段',
    text: '邮箱、地址、常用回复，设一次，到处能用。',
    examples: [
      [{ key: ',,d' }, ' → 2026-10-20'],
      [{ key: ',,t' }, ' → 2026-10-20 14:30:05'],
      [{ key: ',,sj' }, ' → 14:30:05'],
      [{ key: ',,rq' }, ' → 2026年10月20日'],
      [{ key: ',,xq' }, ' → 星期二'],
      ['还可以自己添加更多'],
    ],
    media: { src: '/home/phrase.mp4', alt: '短语替换演示' },
  },
]

export const editionsIntro = {
  title: '三个版本，功能一样',
  text: '规则和配置通用，随时可以换。',
}

export const editions: Edition[] = [
  {
    id: 'winui',
    name: 'WinUI 版',
    recommended: true,
    summary: '界面最好',
    points: ['Windows 11 风格，支持深色', '关掉窗口后占用很少'],
    size: '63 MB',
    downloads: [
      { label: '下载安装版', link: downloadPage },
      { label: '免安装版', link: downloadPage },
    ],
  },
  {
    id: 'win32',
    name: 'Win32 版',
    summary: '最小、最省',
    points: ['经典 Windows 界面', '单个文件，不用装运行库'],
    size: '3 MB',
    downloads: [
      { label: '下载安装版', link: downloadPage },
      { label: '免安装版', link: downloadPage },
    ],
  },
  {
    id: 'tauri',
    name: 'Tauri 版',
    summary: '下载小，界面新',
    points: ['网页风格界面', '用系统自带的 WebView2'],
    size: '3 MB',
    downloads: [{ label: '下载安装版', link: downloadPage }],
  },
]

export const compareTitle = '详细对比'

export const compareRows: CompareRow[] = [
  { label: '功能', values: ['全部', '全部', '全部'] },
  { label: '界面', values: ['Windows 11 风格，深色 / 浅色', '经典界面，浅色', '网页风格，深色 / 浅色'] },
  { label: '下载', values: ['安装包 63 MB，免安装版 91 MB', '安装包 3 MB，免安装版 2 MB', '安装包 3 MB'] },
  { label: '关掉窗口后', values: ['只剩后台核心，占用很少', '占用最少', '只剩后台核心，占用很少'] },
  { label: '系统要求', values: ['Windows 10 1809 起', 'Windows 10 1607 起', 'Windows 10 起（需要 WebView2，Win11 自带）'] },
]
