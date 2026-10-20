# 超级快捷键网站

超级快捷键（SuperKey）的官网和使用文档：<https://superkeyapp.github.io>

用 [VitePress](https://vitepress.dev) 搭建，推送到 `main` 后由 GitHub Actions 自动发布到 GitHub Pages。

## 本地运行

需要 Node.js 18 或更新版本。

```bash
npm install
npm run dev       # 开发：http://localhost:5173，改了文件自动刷新
npm run build     # 编译到 docs/.vitepress/dist
npm run preview   # 预览编译结果
```

## 目录

```
docs/
├─ .vitepress/config.mts   网站配置：标题、导航、文档目录、搜索
├─ public/                 图片等静态文件（logo.svg）
├─ index.md                首页
└─ guide/                  使用文档
```

## 问题反馈

使用中遇到问题或有建议，欢迎在 [Issues](https://github.com/superkeyapp/superkeyapp.github.io/issues) 里告诉我们。
