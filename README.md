# 超级快捷键网站

超级快捷键（SuperKey）的官网和使用文档：<https://superkeyapp.github.io>

## 一、这是什么

- **首页**：软件能做什么，每个功能一段介绍 + 演示视频；下载入口。
- **下载页**：各版本的对比和下载。
- **使用文档**：安装与开始使用等。

## 二、用了什么技术

| 项目 | 说明 |
|---|---|
| [VitePress](https://vitepress.dev) 1.6 | 文档网站生成器：文档页用 Markdown 写；首页是自己写的 Vue 组件 |
| Vue | 只用在首页组件（`HomePage.vue`）里；文档页不用写 |
| medium-zoom | 首页图片点击放大 |
| GitHub Actions + GitHub Pages | 推送到 `main` 后自动打包、发布 |
| Node.js | 18 或更新的版本（推荐装最新的长期支持版） |

## 三、目录

```
docs/
├─ .vitepress/
│  ├─ config.mts           网站配置：标题、顶部导航、文档目录、搜索、页脚
│  └─ theme/
│     ├─ index.ts          主题：默认主题 + 首页组件 + 图片点击放大
│     ├─ HomePage.vue      首页组件（标题区、功能演示、选择版本）：只管排版
│     ├─ home.ts           首页的文字、图片、视频、版本说明：改内容只改这里
│     └─ style.css         主色等少量样式
├─ public/                 原样复制的文件：logo.svg、首页截图（screens/）、演示视频（home/）
├─ index.md                首页（只放一个 HomePage 组件）
├─ download.md             下载页
└─ guide/                  使用文档（Markdown）
.github/workflows/deploy.yml   自动发布到 GitHub Pages
```

## 四、怎么修改

| 要改什么 | 改哪里 |
|---|---|
| 首页的文字、功能介绍、例子 | `docs/.vitepress/theme/home.ts`：每个功能一项（`features`），不用碰排版 |
| 首页的演示视频、图片 | 文件放到 `docs/public/home/`，在 `home.ts` 对应功能的 `media.src` 填路径（如 `/home/gesture.mp4`），`poster` 填封面图 |
| 首页的排版、样式 | `docs/.vitepress/theme/HomePage.vue` |
| 顶部导航、文档目录、页脚 | `docs/.vitepress/config.mts` |
| 文档页 | `docs/` 下的 `.md` 文件，用 Markdown 写；新增页面后在 `config.mts` 的 `sidebar` 里加上 |

演示视频的规格：16:10、960×600、MP4（H.264，无声音），几十 KB 到 200 KB；
图片（png / jpg / webp）点击可放大，视频自动播放、静音、循环；`media.src` 不填时显示占位框。

## 五、修改后怎么预览

第一次使用先安装（只要装一次）：

```bash
npm install
```

然后：

```bash
npm run dev
```

浏览器打开 http://localhost:5173 ，改了文件保存后页面自动刷新。

## 六、怎么打包

```bash
npm run build     # 打包到 docs/.vitepress/dist：HTML、CSS、JS 压缩，文件名带编号
npm run preview   # 在本地打开打包后的结果，确认一遍
```

## 七、怎么部署

**平时不用手动部署**：把改动推送到 `main` 分支，GitHub Actions 会自动打包并发布到 <https://superkeyapp.github.io>，
一两分钟后生效。进度在仓库的 Actions 页面查看；也可以在那里手动运行“Deploy”。

要放到别的服务器：上传 `docs/.vitepress/dist/` 里的全部文件到网站根目录。

### 更新以后，用户会不会看到旧内容？

- **CSS、JS**：VitePress 打包时文件名带按内容算出的编号，内容一变文件名就变，浏览器一定会下载新的。
- **HTML 页面和 `public/` 里的文件**（截图、演示视频）不带编号：
  - GitHub Pages 默认只缓存 10 分钟，更新后最多等 10 分钟就能看到，不用另外设置；
  - 放到自己的服务器时，要把这些文件设置成“每次都向服务器确认有没有更新”（Nginx：`add_header Cache-Control "no-cache";`），
    `assets/` 里带编号的文件可以缓存很久。
  - 想让新视频马上生效，也可以换个文件名（如 `gesture-2.mp4`），再改 `home.ts` 里的路径。

## 问题反馈

使用中遇到问题或有建议，欢迎在 [Issues](https://github.com/superkeyapp/superkeyapp.github.io/issues) 里告诉我们。

## 声明

仅供学习和交流使用，请勿用于任何非法用途。
