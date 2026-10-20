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
├─ .vitepress/
│  ├─ config.mts           网站配置：标题、导航、文档目录、搜索
│  └─ theme/
│     ├─ index.ts          主题：默认主题 + 首页组件 + 图片点击放大
│     ├─ HomePage.vue      首页组件（标题区、功能演示、选择版本）：只管排版
│     ├─ home.ts           首页的文字、图片、三个版本的说明：改内容只改这里
│     └─ style.css         主色等少量样式
├─ public/                 图片等静态文件（logo.svg；首页演示图放 public/home/）
├─ index.md                首页（只放一个 HomePage 组件）
├─ download.md             下载：三个版本的对比
└─ guide/                  使用文档

首页的功能演示图：在 `home.ts` 里给每个功能的 `media.src` 填文件路径即可，
图片（png / jpg / gif / webp）点击可放大，视频（mp4 / webm）自动播放、静音、循环；不填时显示占位框。
```

## 问题反馈

使用中遇到问题或有建议，欢迎在 [Issues](https://github.com/superkeyapp/superkeyapp.github.io/issues) 里告诉我们。
