// 首页的内容：标题区、功能演示、三个版本。改文字、换图片只改这里，样式在 HomePage.vue

/** 一段文字：普通文字，或加粗强调的一句 */
export type Paragraph = string | { text: string; strong: true }

/** 演示图：图片（png / jpg / gif / webp）或视频（mp4 / webm，自动播放、静音、循环）；没有时显示占位框 */
export interface Media {
  src?: string
  poster?: string   // 视频加载前显示的封面图
  alt: string
}

export interface Feature {
  id: string
  title: string
  content: Paragraph[]
  media: Media
}

export interface Edition {
  id: 'winui' | 'win32' | 'tauri'
  name: string
  recommended?: boolean
  summary: string              // 一句话定位
  points: string[]             // 卡片上的几点
  size: string                 // 下载大小（显示用）
  downloads: { label: string; link: string }[]
}

export interface CompareRow {
  label: string
  values: [string, string, string]   // WinUI、Win32、Tauri
}

// 还没有正式发布：下载按钮先指向“下载”页面
const downloadPage = '/download'

export const hero = {
  name: '超级快捷键',
  title: '让常用操作一键完成',
  tagline: '短语替换、多步热键、屏幕边缘、复制搜索、CapsLock 增强、鼠标手势',
  note: '免费 · Windows 10 / 11 · 全部在本机运行，不联网、不记录也不上传任何按键',
  primary: { text: '下载 WinUI 版', link: downloadPage },
  secondary: { text: '其他版本', link: '#editions' },
}

export const features: Feature[] = [
  {
    id: 'phrase',
    title: '短语替换：输入缩写，自动变成整段文字',
    content: [
      '邮箱、地址、常用回复、当前日期时间，不用每次都打一遍。',
      { text: '在任意输入框里打 ,,d，自动替换成今天的日期。', strong: true },
      '缩写和替换内容都可以自己设，还能按程序分别设置。',
    ],
    media: { alt: '短语替换演示' },
  },
  {
    id: 'hotkey',
    title: '多步热键：一个热键，做一串事',
    content: [
      '模拟按键、输出文字、运行程序、窗口置顶、调音量……按顺序执行。',
      { text: '一个热键就能完成原来要点好几下的操作。', strong: true },
      '可以只在某些程序里生效，不和其他软件冲突。',
    ],
    media: { alt: '多步热键演示' },
  },
  {
    id: 'edge',
    title: '屏幕边缘：鼠标移到角落，滚轮就能调音量',
    content: [
      '不用再去右下角瞄准小小的音量图标。',
      { text: '把鼠标移到屏幕左上角，滚动滚轮，就能调整音量。', strong: true },
      '四条边和四个角都能设：切换桌面、切歌、翻页……',
    ],
    media: { alt: '屏幕边缘演示' },
  },
  {
    id: 'copySearch',
    title: '复制搜索：复制完再按一个键，直接出结果',
    content: [
      '看到不认识的词、想查的资料，复制以后不用再开浏览器、粘贴。',
      { text: '选中文字，连按两次 Ctrl+C，再按一个键，直接搜索或翻译。', strong: true },
      '内置常用的搜索和翻译网站，也可以自己加。',
    ],
    media: { alt: '复制搜索演示' },
  },
  {
    id: 'caps',
    title: 'CapsLock 增强：手不离开主键区',
    content: [
      '平时很少用的 CapsLock，变成一个好用的功能键。',
      { text: '按住 CapsLock 再按 J、K、L、I，就是方向键。', strong: true },
      '单独按一下仍然切换大小写，不影响原来的用法。',
    ],
    media: { alt: 'CapsLock 增强演示' },
  },
  {
    id: 'gesture',
    title: '鼠标手势：按住右键画一下',
    content: [
      '后退、前进、关闭标签页、最小化窗口，不用找按钮。',
      { text: '按住右键往左一划就是后退，往下再往右就是关闭标签页。', strong: true },
      '画的时候显示轨迹和提示，画错了停一下就取消。',
    ],
    media: { alt: '鼠标手势演示' },
  },
]

export const editionsIntro = {
  title: '三个版本，功能完全相同',
  text: '只是界面和体积不同，规则和配置通用，随时可以换。',
}

export const editions: Edition[] = [
  {
    id: 'winui',
    name: 'WinUI 版',
    recommended: true,
    summary: '界面最好看，体验最好',
    points: ['Windows 11 风格，支持深色', '关闭设置窗口后，占用和 Win32 版相近'],
    size: '约 63 MB',
    downloads: [
      { label: '下载安装版', link: downloadPage },
      { label: '免安装版', link: downloadPage },
    ],
  },
  {
    id: 'win32',
    name: 'Win32 版',
    summary: '体积最小，最省资源',
    points: ['经典 Windows 界面', '单个文件，不用装任何运行库'],
    size: '约 3 MB',
    downloads: [
      { label: '下载安装版', link: downloadPage },
      { label: '免安装版', link: downloadPage },
    ],
  },
  {
    id: 'tauri',
    name: 'Tauri 版',
    summary: '下载体积小，界面现代',
    points: ['网页风格界面', '使用系统自带的 WebView2'],
    size: '约 2 MB',
    downloads: [{ label: '下载安装版', link: downloadPage }],
  },
]

export const compareTitle = '详细对比'

export const compareRows: CompareRow[] = [
  { label: '功能', values: ['全部功能', '全部功能', '全部功能'] },
  { label: '界面', values: ['Windows 11 风格，深色 / 浅色', '经典 Windows 界面，浅色', '网页风格，深色 / 浅色'] },
  { label: '下载大小', values: ['安装包约 63 MB', '安装包约 3 MB，免安装版约 1 MB', '安装包约 2 MB'] },
  { label: '关闭设置窗口后', values: ['只剩后台核心，占用很少', '占用最少', '只剩后台核心，占用很少'] },
  { label: '系统要求', values: ['Windows 10 1809 或更新', 'Windows 10 1607 或更新', 'Windows 10 或更新（需要 WebView2，Windows 11 自带）'] },
]
