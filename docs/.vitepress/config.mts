import { defineConfig } from 'vitepress'

// 网站配置：https://vitepress.dev/reference/site-config
// 网站发布在 https://superkeyapp.github.io（组织主页仓库，在根路径，不用设 base）
export default defineConfig({
  lang: 'zh-CN',
  title: '超级快捷键',
  description: 'Windows 效率工具：短语替换、多步热键、屏幕边缘、复制搜索、CapsLock 增强、鼠标手势',
  cleanUrls: true,
  head: [['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }]],

  themeConfig: {
    logo: '/logo.svg',

    // 右上角导航
    nav: [
      { text: '文档', link: '/guide/start', activeMatch: '/guide/' },
      { text: '下载', link: '/download' },
      { text: '问题反馈', link: 'https://github.com/superkeyapp/superkeyapp.github.io/issues' },
    ],

    // 文档页左侧目录
    sidebar: {
      '/download': [
        {
          text: '开始',
          items: [
            { text: '安装与开始使用', link: '/guide/start' },
            { text: '下载', link: '/download' },
          ],
        },
      ],
      '/guide/': [
        {
          text: '开始',
          items: [
            { text: '安装与开始使用', link: '/guide/start' },
            { text: '下载', link: '/download' },
          ],
        },
      ],
    },

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
    sidebarMenuLabel: '目录',
    darkModeSwitchLabel: '外观',
    lightModeSwitchTitle: '切换到浅色',
    darkModeSwitchTitle: '切换到深色',

    footer: {
      copyright: 'Copyright © 2026 超级快捷键',
    },
  },
})
