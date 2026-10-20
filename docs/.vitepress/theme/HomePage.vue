<script setup lang="ts">
// 首页：标题区 → 功能演示（一段文字一张图，左右交替）→ 选择版本（三张卡片 + 详细对比）→ 底部下载
// 内容都在 home.ts；这里只管排版。颜色用 VitePress 的主题变量，深色、浅色都适配
import { withBase } from 'vitepress'
import { hero, features, editionsIntro, editions, compareTitle, compareRows, type Media } from './home'

const isVideo = (m: Media) => !!m.src && /\.(mp4|webm)$/i.test(m.src)
</script>

<template>
  <div class="home">
    <!-- 标题区 -->
    <section class="hero">
      <img class="hero-logo" :src="withBase('/logo.svg')" alt="" />
      <h1 class="hero-name">{{ hero.name }}</h1>
      <p class="hero-title">{{ hero.title }}</p>
      <p class="hero-tagline">{{ hero.tagline }}</p>
      <div class="hero-actions">
        <a class="btn btn-brand" :href="withBase(hero.primary.link)">{{ hero.primary.text }}</a>
        <a class="btn btn-alt" :href="hero.secondary.link">{{ hero.secondary.text }} ↓</a>
      </div>
      <p class="hero-note">{{ hero.note }}</p>
    </section>

    <!-- 功能演示：一段文字一张图，左右交替 -->
    <section class="features">
      <div v-for="(f, i) in features" :id="f.id" :key="f.id" class="feature" :class="{ reverse: i % 2 === 1 }">
        <div class="feature-text">
          <h2>{{ f.title }}</h2>
          <template v-for="(p, j) in f.content" :key="j">
            <p v-if="typeof p === 'string'">{{ p }}</p>
            <p v-else class="strong">{{ p.text }}</p>
          </template>
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
    <section id="editions" class="editions">
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
      <h2>{{ hero.title }}</h2>
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
  padding: 72px 0 56px;
}
.hero-logo {
  width: 96px;
  height: 96px;
  margin: 0 auto 20px;
}
.hero-name {
  font-size: 56px;
  line-height: 1.15;
  font-weight: 700;
  letter-spacing: -0.02em;
  background: linear-gradient(120deg, var(--vp-c-brand-1), #8b5cf6);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.hero-title {
  margin-top: 12px;
  font-size: 32px;
  line-height: 1.3;
  font-weight: 600;
  color: var(--vp-c-text-1);
}
.hero-tagline {
  margin-top: 16px;
  font-size: 18px;
  color: var(--vp-c-text-2);
}
.hero-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  margin-top: 32px;
}
.hero-note {
  margin-top: 20px;
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
}
.btn-alt {
  background: var(--vp-c-default-soft);
  color: var(--vp-c-text-1);
}
.btn-alt:hover {
  background: var(--vp-c-default-2);
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
.feature-text h2 {
  font-size: 28px;
  line-height: 1.35;
  font-weight: 700;
  margin-bottom: 20px;
  color: var(--vp-c-text-1);
}
.feature-text p {
  font-size: 16px;
  line-height: 1.8;
  color: var(--vp-c-text-2);
  margin: 8px 0;
}
.feature-text p.strong {
  color: var(--vp-c-text-1);
  font-weight: 600;
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
  .hero {
    padding: 48px 0 32px;
  }
  .hero-name {
    font-size: 40px;
  }
  .hero-title {
    font-size: 24px;
  }
  .hero-tagline {
    font-size: 16px;
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
    font-size: 22px;
  }
}
</style>
