---
# 最新版本：发布新版本时改这里（和软件的 VERSION 一致），再在下面的“更新记录”加一条
version: 1.0.0
# 下载地址分国内、海外两组（国内用户点 GitHub 常常很慢），每个按钮上写明来源。都填短链接（a.ixuea.com，统计点击次数）：
# 发新版本时，在 https://a.ixuea.com/uris/new 给每个地址新建一个短链接，Source 填新版本的下载地址（文件名带版本号），
# Media 填“官网”、Unit 填“下载页”、Key 填来源、按钮名和版本号；把返回的代码拼在 https://a.ixuea.com/ 后面填到这里。
# 空着的不显示；网盘一个都没填时显示“即将提供”
# 国内只放网盘，不放自己服务器的直链（服务器带宽小，直接下载很慢）
cn:
  # 网盘：每个一个按钮，按钮上写网盘名，后面一句说明要不要登录、要不要会员，用户按自己的情况选；
  # 分享的文件夹里放安装版、免安装版两个文件。按推荐顺序排（免费账号就快的在前）。
  # 要加别的网盘，照样加一项。百度网盘的分享地址带上提取码（?pwd=…），打开时自动填好，页面上不用写
  pans:
    - name: 123 网盘
      note: 免费账号登录就能下载，速度快
      url: https://a.ixuea.com/Rl   # 123 网盘的分享
    - name: 百度网盘
      note: 不开会员会限速，有会员的选这个
      url: https://a.ixuea.com/Rj   # 百度网盘的分享
github:
  setupLink: https://a.ixuea.com/c2      # superkey-release 1.0.0 的安装包
  portableLink: https://a.ixuea.com/cm   # superkey-release 1.0.0 的免安装版
---

# 下载

**最新版本：{{ $frontmatter.version }}**

<!-- 两组下载地址并排（手机上上下排），每个按钮写明来源；按钮在新标签页打开：短链接先打开一个跳转页再开始下载，这样下载页还留着 -->
<div class="dl-sources">
  <div class="dl-source">
    <div class="dl-source-title">国内下载</div>
    <div class="dl-source-desc">中国大陆用户选这里，速度快</div>
    <div v-if="$frontmatter.cn.pans.some(p => p.url)" class="dl-row">
      <div class="dl-row-label">网盘（安装版、免安装版都在里面）</div>
      <template v-for="p in $frontmatter.cn.pans" :key="p.name">
        <div v-if="p.url" class="dl-pan">
          <a class="dl-btn" :href="p.url" target="_blank" rel="noopener">{{ p.name }}</a>
          <span class="dl-pan-note">{{ p.note }}</span>
        </div>
      </template>
    </div>
    <div v-else class="dl-buttons">
      <span class="dl-btn dl-disabled">即将提供</span>
    </div>
  </div>
  <div class="dl-source">
    <div class="dl-source-title">海外下载</div>
    <div class="dl-source-desc">海外用户选这里；国内访问可能较慢</div>
    <div class="dl-row">
      <div class="dl-row-label">GitHub</div>
      <div class="dl-buttons">
        <a class="dl-btn dl-primary" :href="$frontmatter.github.setupLink" target="_blank" rel="noopener">安装版</a>
        <a class="dl-btn" :href="$frontmatter.github.portableLink" target="_blank" rel="noopener">免安装版</a>
      </div>
      <div class="dl-source-more">以前的版本：<a href="https://a.ixuea.com/ce" target="_blank" rel="noopener">GitHub 发布页</a></div>
    </div>
  </div>
</div>

在软件里点“检查新版本”会打开这一页。软件不会自己联网检查更新，看看下面的最新版本号，比软件里的新就下载安装（见[怎么更新](#怎么更新)）。

| | 超级快捷键 |
|---|---|
| 界面 | Windows 11 风格，深色 / 浅色 |
| 下载大小 | 安装包 63 MB，免安装版 91 MB |
| 关掉设置窗口后 | 只剩后台核心，占用很少 |
| 系统要求 | Windows 10 1809 或更新、Windows 11 |

## 界面预览

点图片可以放大。

<div class="screens">
  <figure><img src="/screens/overview.webp" alt="概览：运行状态、常用开关、我的快捷方式" data-zoomable loading="lazy" /><figcaption>概览：运行状态、常用开关、我的快捷方式</figcaption></figure>
  <figure><img src="/screens/hotkey.webp" alt="快捷键：每一条一张卡片，可以单独开关" data-zoomable loading="lazy" /><figcaption>快捷键：每一条一张卡片，可以单独开关</figcaption></figure>
  <figure><img src="/screens/hotkey-edit.webp" alt="编辑：录入组合键，按顺序添加几个动作" data-zoomable loading="lazy" /><figcaption>编辑：录入组合键，按顺序添加几个动作</figcaption></figure>
  <figure><img src="/screens/gesture.webp" alt="鼠标手势：选项和自带的手势" data-zoomable loading="lazy" /><figcaption>鼠标手势：选项和自带的手势</figcaption></figure>
</div>

## 安装版和免安装版

- **安装版**：双击安装，开始菜单里有快捷方式，可以在系统的“应用”里卸载。不需要管理员权限。
- **免安装版**：解压后得到一个 `SuperKey` 文件夹，双击里面的 `SuperKey.Core.exe` 就能运行，适合放在 U 盘或不想安装的电脑上。卸载时在程序的“设置 → 日志与诊断 → 清除并退出”，再删除文件夹。

## 怎么更新

1. 看软件里的版本号：打开软件，概览最上面的“版本”一栏（设置页的软件信息里也有）。
2. 和本页的最新版本比较，比软件里的新就下载。
3. **安装版**：直接运行新的安装包，装在原来的位置，设置会保留。**免安装版**：先在托盘图标上右键“退出”，再解压新的压缩包，用里面的 `SuperKey` 文件夹覆盖原来的那个。

## 更新记录

### 1.0.0（2026-10-23）

- 第一个版本。

## 第一次运行

程序常驻在屏幕右下角的托盘里（闪电图标），左键点它打开主窗口。详见 [安装与开始使用](/start/install)。

::: info 更多版本
体积更小的其他版本（最小约 3 MB），敬请期待。
:::

<!--
以后发布其他版本时，换回下面的三版对比（首页 home.ts 里的 showOtherEditions 也改成 true）：

超级快捷键有三个版本，**功能完全相同**，只是界面和体积不同。规则和配置通用，随时可以换用另一个版本。

## 选哪个版本

| | WinUI 版（推荐） | Win32 版 | Tauri 版 |
|---|---|---|---|
| 适合 | 想要最好的界面和体验 | 想要最小的体积、最少的资源占用 | 想要下载快、界面现代 |
| 界面 | Windows 11 风格，深色 / 浅色 | 经典 Windows 界面，浅色 | 网页风格，深色 / 浅色 |
| 下载大小 | 安装包 63 MB，免安装版 91 MB | 安装包 3 MB，免安装版 2 MB | 安装包 3 MB |
| 关闭设置窗口后 | 只剩后台核心，占用很少 | 占用最少 | 只剩后台核心，占用很少 |
| 系统要求 | Windows 10 1809 或更新 | Windows 10 1607 或更新 | Windows 10 或更新（需要 WebView2，Windows 11 自带） |

不确定选哪个，就用 **WinUI 版**。
-->
