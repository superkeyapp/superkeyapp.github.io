import { defineConfig } from 'vitepress'

// 网站配置：https://vitepress.dev/reference/site-config
// 网站发布在 https://superkeyapp.github.io（组织主页仓库，在根路径，不用设 base）
const NO_ACTIVE = '^$'   // 永远匹配不上的路径：导航项不高亮

// 顶部导航的“使用教程”在这些页面上高亮（下载页单独一项）
const DOC_PAGES = '^/(start|keyboard|mouse|manage)/'

export default defineConfig({
  lang: 'zh-CN',
  title: '超级快捷键',
  description: 'Windows 效率工具：短语替换、多步热键、屏幕边缘、复制搜索、CapsLock 增强、鼠标手势',
  cleanUrls: true,
  head: [['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }]],

  themeConfig: {
    logo: '/logo.svg',

    // 右上角导航
    // 顶部导航：先放几个代表性的功能（跳到首页对应的那一节），打开就知道能做什么；后面才是使用教程、下载
    //（叫“使用教程”不叫“文档”：普通用户一看就知道里面有每个功能的用法）
    // 这些都在首页上：不高亮（VitePress 只在换页时判断高亮，页内跳到别的节时不会更新，会一直亮着上次点的那个）
    nav: [
      { text: '快捷键', link: '/#hotkey', activeMatch: NO_ACTIVE },
      { text: '鼠标手势', link: '/#gesture', activeMatch: NO_ACTIVE },
      { text: '屏幕边缘', link: '/#edge', activeMatch: NO_ACTIVE },
      {
        text: '更多功能',
        items: [
          { text: '音乐和视频手势', link: '/#gestureMedia', activeMatch: NO_ACTIVE },
          { text: '后台媒体控制', link: '/#mediaGlobal', activeMatch: NO_ACTIVE },
          { text: '复制搜索', link: '/#copySearch', activeMatch: NO_ACTIVE },
          { text: 'CapsLock 增强', link: '/#caps', activeMatch: NO_ACTIVE },
          { text: '多步按键', link: '/#macro', activeMatch: NO_ACTIVE },
          { text: '短语替换', link: '/#phrase', activeMatch: NO_ACTIVE },
        ],
      },
      { text: '使用教程', link: '/start/install', activeMatch: DOC_PAGES },
      { text: '下载', link: '/download' },
      { text: '问题反馈', link: 'https://github.com/superkeyapp/superkey-release/issues' },
    ],

    // 文档页左侧目录：和软件左侧的菜单一一对应（软件里每页的“了解详细信息”打开同名的文档，见 superkey-core 的 ui_service.cpp）
    // 文件夹就是地址：docs/mouse/gesture.md → /mouse/gesture（开始 start、键盘 keyboard、鼠标 mouse、管理 manage）
    sidebar: [
      {
        text: '开始',
        items: [
          { text: '安装与开始使用', link: '/start/install' },
          { text: '下载', link: '/download' },
          { text: '概览', link: '/start/overview' },
        ],
      },
      {
        text: '键盘',
        items: [
          { text: '短语替换', link: '/keyboard/phrase' },
          { text: '多步热键', link: '/keyboard/hotkey' },
          { text: 'CapsLock 增强', link: '/keyboard/capslock' },
          { text: '复制搜索', link: '/keyboard/copy-search' },
        ],
      },
      {
        text: '鼠标',
        items: [
          { text: '鼠标手势', link: '/mouse/gesture' },
          { text: '鼠标按键', link: '/mouse/buttons' },
          { text: '屏幕边缘', link: '/mouse/edge' },
        ],
      },
      {
        text: '管理',
        items: [
          { text: '程序与方案', link: '/manage/apps' },
          { text: '全部规则', link: '/manage/rules' },
          { text: '设置', link: '/manage/settings' },
        ],
      },
    ],

    // 站内搜索（不依赖外部服务）
    search: {
      provider: 'local',
      options: {
        translations: {
          button: { buttonText: '搜索', buttonAriaLabel: '搜索' },
          modal: {
            displayDetails: '显示详细列表',
            resetButtonTitle: '清除',
            backButtonTitle: '关闭搜索',
            noResultsText: '没有找到',
            footer: { selectText: '选择', navigateText: '切换', closeText: '关闭' },
          },
        },
      },
    },

    docFooter: { prev: '上一页', next: '下一页' },
    outline: { label: '本页目录' },
    returnToTopLabel: '回到顶部',
    // 地址不存在时的页面（默认是英文）
    notFound: {
      title: '页面不存在',
      quote: '这个地址可能写错了，或者页面已经搬走。可以回到首页，或者从使用教程里找找。',
      linkLabel: '回到首页',
      linkText: '回到首页',
    },
    sidebarMenuLabel: '目录',
    darkModeSwitchLabel: '外观',
    lightModeSwitchTitle: '切换到浅色',
    darkModeSwitchTitle: '切换到深色',

    // 页脚只在没有左侧目录的页面显示（首页、下载页）
    footer: {
      message: '本网站的页面和文字由 AI 通过 Vibe Coding 生成，内容仅供参考，如有不准确之处，以软件实际为准。'
        + '有任何意见或建议，欢迎<a href="https://github.com/superkeyapp/superkey-release/issues" target="_blank" rel="noopener">联系我们</a>。'
        + '<br>超级快捷键参考了市面上的同类软件，但功能可能不如它们完善和稳定。仅供学习和研究使用，请勿用于任何非法用途。',
      copyright: 'Copyright © 2026 超级快捷键',
    },
  },
})
