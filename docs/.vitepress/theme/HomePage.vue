<script setup lang="ts">
// 首页：优势（免费、离线……，最先看到）→ 软件名和下载 → 功能演示（一句话 + 例子 + 一张图，左右交替）
//       → 选择版本（三张卡片 + 详细对比）→ 底部下载
// 内容都在 home.ts；这里只管排版。颜色用 VitePress 的主题变量，深色、浅色都适配
import { ref } from 'vue'
import { withBase } from 'vitepress'
import { advantages, hero, screens, features, showOtherEditions, editionsIntro, editions, compareTitle, compareRows, type Media } from './home'

const shown = ref(0)   // 首屏截图：当前显示第几张

const isVideo = (m: Media) => !!m.src && /\.(mp4|webm)$/i.test(m.src)

// 优势的图标：24×24 的线条图（颜色跟着文字）
const icons: Record<string, string[]> = {
  free: ['M3 8h18v4H3z', 'M5 12v8h14v-8', 'M12 8v12', 'M12 8C10.5 4.5 6.5 4.5 7.5 7.2 8.2 8 12 8 12 8', 'M12 8c1.5-3.5 5.5-3.5 4.5-.8C15.8 8 12 8 12 8'],
  offline: ['M2 8.8a15 15 0 0 1 20 0', 'M5.3 12.3a10 10 0 0 1 13.4 0', 'M8.7 15.7a5 5 0 0 1 6.6 0', 'M12 19.5h.01', 'M3 3l18 18'],
  small: ['M21 8l-9-5-9 5 9 5z', 'M3 8v8l9 5 9-5V8', 'M12 13v8'],
  editions: ['M12 3l9 5-9 5-9-5z', 'M3 12.5l9 5 9-5', 'M3 16.5l9 5 9-5'],
  ready: ['M20 6L9 17l-5-5'],
  light: ['M13 2L4 14h7l-1 8 9-12h-7z'],
}
</script>

<template>
  <div class="home">
    <!-- 标题区：先看到优势，再看到软件名 -->
    <section class="hero">
      <ul class="advantages">
        <li v-for="a in advantages" :key="a.title">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path v-for="d in icons[a.icon]" :key="d" :d="d" />
          </svg>
          <div>
            <strong>{{ a.title }}</strong>
            <span>{{ a.text }}</span>
          </div>
        </li>
      </ul>
      <div class="hero-brand">
        <img class="hero-logo" :src="withBase('/logo.svg')" alt="" />
        <h1 class="hero-name">{{ hero.name }}</h1>
      </div>
      <p class="hero-title">{{ hero.title }}</p>
      <p class="hero-tagline">{{ hero.tagline }}</p>
      <ul class="hero-ways">
        <li v-for="w in hero.ways" :key="w">{{ w }}</li>
      </ul>
      <div class="hero-actions">
        <a class="btn btn-brand btn-lg" :href="withBase(hero.primary.link)">{{ hero.primary.text }}</a>
        <p class="hero-note">{{ hero.note }}</p>
        <a v-if="showOtherEditions" class="btn btn-alt btn-sm" :href="hero.secondary.link">{{ hero.secondary.text }} ↓</a>
        <span v-else class="coming-soon">{{ hero.comingSoon }}</span>
      </div>

      <!-- 界面截图：一打开就能看到软件长什么样；标签切换几张 -->
      <div class="screens-hero">
        <div class="screen-tabs" role="tablist">
          <button v-for="(s, i) in screens" :key="s.id" role="tab" :aria-selected="shown === i"
                  :class="{ active: shown === i }" @click="shown = i">{{ s.label }}</button>
        </div>
        <div class="screen-frame">
          <img v-for="(s, i) in screens" v-show="shown === i" :key="s.id" :src="withBase(s.src)" :alt="s.alt"
               data-zoomable :loading="i === 0 ? 'eager' : 'lazy'" />
        </div>
        <p class="screen-caption">{{ screens[shown].alt }}</p>
      </div>
    </section>

    <!-- 功能演示：一句话 + 一个例子 + 一张图，左右交替 -->
    <section class="features">
      <div v-for="(f, i) in features" :id="f.id" :key="f.id" class="feature" :class="{ reverse: i % 2 === 1 }">
        <div class="feature-text">
          <p class="feature-name">{{ f.name }}</p>
          <h2>{{ f.title }}</h2>
          <p>{{ f.text }}</p>
          <ul class="examples">
            <li v-for="(line, i) in f.examples" :key="i" :class="{ note: line.every(p => typeof p === 'string') }">
              <template v-for="(part, j) in line" :key="j">
                <kbd v-if="typeof part !== 'string'">{{ part.key }}</kbd>
                <template v-else>{{ part }}</template>
              </template>
            </li>
          </ul>
          <p v-if="f.status" class="feature-status" :class="{ off: !f.status.on }">
            <span class="dot" aria-hidden="true" />
            <strong>{{ f.status.on ? '装好就能用' : '默认关闭' }}</strong>
            <span>{{ f.status.text }}</span>
          </p>
        </div>
        <div class="feature-media">
          <video v-if="isVideo(f.media)" :src="withBase(f.media.src!)" :poster="f.media.poster && withBase(f.media.poster)"
                 autoplay muted loop playsinline preload="none" :aria-label="f.media.alt" />
          <img v-else-if="f.media.src" :src="withBase(f.media.src)" :alt="f.media.alt" loading="lazy" data-zoomable />
          <div v-else class="placeholder" role="img" :aria-label="f.media.alt">
            <span>{{ f.media.alt }}</span>
            <small>演示图片待补充</small>
          </div>
        </div>
      </div>
    </section>

    <!-- 选择版本 -->
    <section v-if="showOtherEditions" id="editions" class="editions">
      <h2>{{ editionsIntro.title }}</h2>
      <p class="editions-text">{{ editionsIntro.text }}</p>
      <div class="edition-cards">
        <div v-for="e in editions" :key="e.id" class="edition" :class="{ recommended: e.recommended }">
          <div class="edition-head">
            <h3>{{ e.name }}</h3>
            <span v-if="e.recommended" class="badge">推荐</span>
          </div>
          <p class="edition-summary">{{ e.summary }}</p>
          <ul>
            <li v-for="p in e.points" :key="p">{{ p }}</li>
          </ul>
          <p class="edition-size">下载 {{ e.size }}</p>
          <div class="edition-actions">
            <a v-for="(d, k) in e.downloads" :key="d.label" class="btn" :class="k === 0 && e.recommended ? 'btn-brand' : 'btn-alt'"
               :href="withBase(d.link)">{{ d.label }}</a>
          </div>
        </div>
      </div>

      <details class="compare">
        <summary>{{ compareTitle }}</summary>
        <div class="compare-table">
          <table>
            <thead>
              <tr>
                <th></th>
                <th v-for="e in editions" :key="e.id">{{ e.name }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="r in compareRows" :key="r.label">
                <th>{{ r.label }}</th>
                <td v-for="(v, k) in r.values" :key="k">{{ v }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </details>
    </section>

    <!-- 底部再给一次下载 -->
    <section class="bottom">
      <h2>{{ hero.bottom }}</h2>
      <a class="btn btn-brand" :href="withBase(hero.primary.link)">{{ hero.primary.text }}</a>
    </section>
  </div>
</template>

<style scoped>
.home {
  max-width: 1152px;
  margin: 0 auto;
  padding: 0 24px 64px;
}
/* 首页内容外面套着文档的样式（.vp-doc）：去掉文档标题上方的分隔线和间距、列表和表格的文档样式 */
.home h1,
.home h2,
.home h3 {
  border-top: none;
  padding-top: 0;
  margin-top: 0;
  letter-spacing: normal;
}
.home table {
  display: table;
  margin: 0;
}
.home tr {
  background: none;
}

/* ---- 标题区 ---- */
.hero {
  text-align: center;
  padding: 40px 0 56px;
}
/* 优势：一排四块，最先看到 */
.advantages {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  max-width: 880px;
  margin: 0 auto 48px;
  padding: 0;
  list-style: none;
}
.advantages li {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 0;
  padding: 14px 16px;
  border-radius: 14px;
  background: var(--vp-c-brand-soft);
  text-align: left;
}
.advantages svg {
  flex: none;
  width: 28px;
  height: 28px;
  fill: none;
  stroke: var(--vp-c-brand-1);
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.advantages strong {
  display: block;
  font-size: 18px;
  line-height: 1.3;
  color: var(--vp-c-text-1);
}
.advantages span {
  display: block;
  font-size: 13px;
  line-height: 1.4;
  color: var(--vp-c-text-2);
}
.hero-brand {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
}
.hero-logo {
  width: 64px;
  height: 64px;
}
.hero-name {
  font-size: 52px;
  line-height: 1.15;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--vp-c-text-1);
}
.hero-title {
  margin-top: 14px;
  font-size: 24px;
  line-height: 1.4;
  color: var(--vp-c-text-2);
}
.hero-tagline {
  margin-top: 6px;
  font-size: 16px;
  color: var(--vp-c-text-2);
}
/* 能用的操作方式：一排小标签 */
.hero-ways {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  margin: 16px 0 0;
  padding: 0;
  list-style: none;
}
.hero-ways li {
  margin: 0;
  padding: 2px 12px;
  font-size: 14px;
  line-height: 24px;
  color: var(--vp-c-text-2);
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
}
/* 主按钮（推荐版本）单独一行、大一号；其他版本在下面、小一号 */
/* 首屏截图 */
.screens-hero {
  max-width: 960px;
  margin: 48px auto 0;
}
.screen-tabs {
  display: inline-flex;
  gap: 4px;
  padding: 4px;
  margin-bottom: 16px;
  border-radius: 20px;
  background: var(--vp-c-default-soft);
}
.screen-tabs button {
  padding: 0 16px;
  line-height: 32px;
  border-radius: 16px;
  font-size: 14px;
  color: var(--vp-c-text-2);
  transition: background-color 0.2s, color 0.2s;
}
.screen-tabs button.active {
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-weight: 600;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
.screen-frame img {
  display: block;
  width: 100%;
  aspect-ratio: 16 / 10;
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider);
  box-shadow: 0 20px 48px rgba(0, 0, 0, 0.12);
  cursor: zoom-in;
}
.screen-caption {
  margin-top: 12px;
  font-size: 14px;
  color: var(--vp-c-text-2);
}
.hero-actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  margin-top: 32px;
}
/* 主按钮下面的小字：下的是哪个版本、多大 */
.hero-note {
  margin: -4px 0 8px;
  font-size: 14px;
  color: var(--vp-c-text-3);
}

/* ---- 按钮 ---- */
.btn {
  display: inline-block;
  padding: 0 24px;
  line-height: 44px;
  border-radius: 22px;
  font-weight: 600;
  font-size: 16px;
  text-decoration: none;
  transition: background-color 0.2s, border-color 0.2s;
  border: 1px solid transparent;
}
.btn-brand {
  background: var(--vp-c-brand-3);
  color: var(--vp-c-white);
}
.btn-brand:hover {
  background: var(--vp-c-brand-2);
  color: var(--vp-c-white); /* 主题里链接悬停会变成品牌蓝，和按钮底色一样：文字固定不变 */
}
.btn-lg {
  min-width: 260px;
  padding: 0 48px;
  line-height: 60px;
  border-radius: 30px;
  font-size: 21px;
  letter-spacing: 0.08em;
  text-align: center;
  box-shadow: 0 6px 20px rgba(26, 115, 232, 0.28);
}
.btn-sm {
  padding: 0 18px;
  line-height: 36px;
  border-radius: 18px;
  font-size: 14px;
  font-weight: 500;
}
/* 还没发布的版本：小标签，不能点 */
.coming-soon {
  margin-top: 4px;
  padding: 0 20px;
  line-height: 40px;
  border-radius: 20px;
  font-size: 15px;
  font-weight: 500;
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}
.btn-alt {
  background: var(--vp-c-default-soft);
  color: var(--vp-c-text-1);
}
.btn-alt:hover {
  background: var(--vp-c-default-2);
  color: var(--vp-c-text-1);
}

/* ---- 功能演示 ---- */
.features {
  display: flex;
  flex-direction: column;
  gap: 96px;
  padding: 48px 0;
}
.feature {
  display: grid;
  grid-template-columns: 5fr 7fr;
  gap: 56px;
  align-items: center;
}
.feature.reverse {
  grid-template-columns: 7fr 5fr;   /* 图在左：宽的一栏给图 */
}
.feature.reverse .feature-text {
  order: 2;
}
.feature-text .feature-name {
  margin: 0 0 6px;
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-brand-1);
}
.feature-text h2 {
  font-size: 30px;
  line-height: 1.3;
  font-weight: 700;
  margin-bottom: 14px;
  color: var(--vp-c-text-1);
}
.feature-text p {
  font-size: 16px;
  line-height: 1.7;
  color: var(--vp-c-text-2);
  margin: 0;
}
/* 例子：按键画成键帽 */
.feature-text .examples {
  margin: 18px 0 0;
  padding: 0;
  list-style: none;
  color: var(--vp-c-text-1);
  line-height: 2.2;
}
.feature-text .examples li {
  margin: 0;
}
/* 只有文字、没有按键的一行（如“还可以自己添加更多”）：灰色小字 */
.feature-text .examples li.note {
  font-size: 14px;
  color: var(--vp-c-text-2);
}
/* 一行一个缩写时，键帽一样宽，后面的箭头对齐 */
.feature-text .examples li > kbd:first-child {
  min-width: 44px;
}
/* 默认开没开、在哪打开：绿点 = 装好就能用，灰点 = 要在设置里打开 */
.feature-text .feature-status {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px 8px;
  margin-top: 16px;
  padding: 8px 12px;
  font-size: 14px;
  line-height: 1.5;
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
}
.feature-status .dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--vp-c-green-1);
}
.feature-status.off .dot {
  background: var(--vp-c-text-3);
}
.feature-status strong {
  color: var(--vp-c-text-1);
  font-weight: 600;
}
kbd {
  display: inline-block;
  min-width: 24px;
  padding: 0 8px;
  margin: 0 2px;
  line-height: 24px;
  font-family: var(--vp-font-family-mono);
  font-size: 13px;
  text-align: center;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-bottom-width: 2px;
  border-radius: 6px;
}
.feature-media img,
.feature-media video,
.placeholder {
  display: block;
  width: 100%;
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.08);
  background: var(--vp-c-bg-soft);
}
.placeholder {
  aspect-ratio: 16 / 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  color: var(--vp-c-text-2);
  font-size: 18px;
  background: linear-gradient(135deg, var(--vp-c-bg-soft), var(--vp-c-default-soft));
}
.placeholder small {
  font-size: 13px;
  color: var(--vp-c-text-3);
}

/* ---- 选择版本 ---- */
.editions {
  padding: 64px 0 24px;
  text-align: center;
  scroll-margin-top: 80px;
}
.editions h2,
.bottom h2 {
  font-size: 32px;
  font-weight: 700;
  color: var(--vp-c-text-1);
}
.editions-text {
  margin-top: 12px;
  font-size: 17px;
  color: var(--vp-c-text-2);
}
.edition-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 40px;
  text-align: left;
}
.edition {
  display: flex;
  flex-direction: column;
  padding: 28px;
  border-radius: 16px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
}
.edition.recommended {
  border: 2px solid var(--vp-c-brand-1);
}
.edition-head {
  display: flex;
  align-items: center;
  gap: 10px;
}
.edition-head h3 {
  font-size: 22px;
  font-weight: 700;
  color: var(--vp-c-text-1);
}
.badge {
  font-size: 12px;
  font-weight: 600;
  padding: 2px 10px;
  border-radius: 10px;
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}
.edition-summary {
  margin-top: 8px;
  font-size: 16px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}
.edition ul {
  margin: 12px 0 0;
  padding-left: 18px;
  color: var(--vp-c-text-2);
  font-size: 14px;
  line-height: 1.9;
  flex: 1;
}
.edition-size {
  margin-top: 16px;
  font-size: 14px;
  color: var(--vp-c-text-3);
}
.edition-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 16px;
}
.edition-actions .btn {
  font-size: 14px;
  line-height: 38px;
  padding: 0 18px;
}

/* 详细对比：默认收起 */
.compare {
  margin-top: 32px;
  text-align: left;
}
.compare summary {
  cursor: pointer;
  text-align: center;
  color: var(--vp-c-brand-1);
  font-weight: 600;
}
.compare-table {
  overflow-x: auto;
  margin-top: 16px;
}
.compare table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}
.compare th,
.compare td {
  padding: 12px 14px;
  border-bottom: 1px solid var(--vp-c-divider);
  vertical-align: top;
  text-align: left;
}
.compare thead th {
  color: var(--vp-c-text-1);
}
.compare tbody th {
  white-space: nowrap;
  color: var(--vp-c-text-1);
  font-weight: 600;
}
.compare td {
  color: var(--vp-c-text-2);
}

/* ---- 底部 ---- */
.bottom {
  text-align: center;
  padding: 72px 0 24px;
}
.bottom .btn {
  margin-top: 24px;
}

/* ---- 窄屏：上下排列 ---- */
@media (max-width: 960px) {
  .edition-cards {
    grid-template-columns: 1fr;
  }
}
@media (max-width: 768px) {
  /* 对比表：字和边距收小，手机上不用左右滑 */
  .compare table {
    font-size: 12px;
  }
  .compare th,
  .compare td {
    padding: 8px 5px;
  }
  /* 外面 VitePress 已留了 24px 边距，手机上不再加 */
  .home {
    padding: 0 0 48px;
  }
  .hero {
    padding: 24px 0 32px;
  }
  .advantages {
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
    margin-bottom: 32px;
  }
  /* 手机上一块只有一百多像素宽：图标、边距收小，小字才能一行放下 */
  .advantages li {
    gap: 8px;
    padding: 10px 10px;
  }
  .advantages svg {
    width: 22px;
    height: 22px;
  }
  .advantages strong {
    font-size: 16px;
  }
  .advantages span {
    font-size: 12px;
    white-space: nowrap;
  }
  .hero-logo {
    width: 48px;
    height: 48px;
  }
  .hero-name {
    font-size: 36px;
  }
  .hero-title {
    font-size: 18px;
  }
  .features {
    gap: 64px;
  }
  .feature,
  .feature.reverse {
    grid-template-columns: 1fr;
    gap: 24px;
  }
  .feature.reverse .feature-text {
    order: 0;
  }
  .feature-text h2 {
    font-size: 24px;
  }
}
</style>
