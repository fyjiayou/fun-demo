<template>
  <div class="hot-list-container">
    <div class="header">
      <h1 class="title">实时热搜榜</h1>
      <div class="hitokoto" v-if="hitokoto">
        <span class="quote-mark">“</span>
        <span class="hitokoto-text">{{ hitokoto }}</span>
        <span class="quote-mark">”</span>
      </div>
      <div class="update-info">
        <div class="update-time">
          <i class="el-icon-time"></i>
          <span>数据更新时间：{{ lastUpdateTime }}</span>
        </div>
        <el-button 
          type="primary" 
          :icon="Refresh" 
          circle 
          size="small"
          class="refresh-btn"
          @click="refreshCurrentTab" 
        />
      </div>
    </div>
    <!-- 内容区 -->
    <div class="tab-pages">
      <div class="tab-page" v-for="card in cards" :key="card.platform">
        <div class="tab-page-header">
          <template v-if="card.platform === 'todayInHistory'">
            <img src="/today.svg" class="tab-page-logo" alt="今" />
          </template>
          <template v-else-if="card.platform === 'sixtySeconds'">
            <img src="/world.svg" class="tab-page-logo" alt="60秒" />
          </template>
          <template v-else-if="card.platform === 'entertainment'">
            <img src="/le.svg" class="tab-page-logo" alt="乐" />
          </template>
          <img v-else :src="card.icon" class="tab-page-logo" :alt="card.title" />
          <span class="tab-page-title">{{ card.title }}</span>
          <span v-if="card.platform === 'todayInHistory'" class="today-date-right">
            {{
              (() => {
                if (todayInHistoryData && todayInHistoryData.date) {
                  const match = todayInHistoryData.date.match(/(\d{1,2})月(\d{1,2})日/);
                  if (match) {
                    const m = match[1].padStart(2, '0');
                    const d = match[2].padStart(2, '0');
                    return `${m}-${d}`;
                  }
                }
                return '';
              })()
            }}
          </span>
        </div>
        <TodayInHistory v-if="card.platform === 'todayInHistory'" :data="todayInHistoryData" />
        <component v-else-if="card.component" :is="card.component" :list="card.list?.value" :platform="card.platform" />
        <sixty-seconds v-else-if="card.platform === 'sixtySeconds' && sixtySecondsData" :data="sixtySecondsData" />
      </div>
    </div>
    <template v-if="showBackTop">
      <button class="back-top-btn" @click="scrollToTop" aria-label="返回顶部">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" :stroke="backTopActive ? '#ff3b30' : '#222'" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
      </button>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Refresh } from '@element-plus/icons-vue'
import HotListItem from '../components/HotListItem.vue'
import SixtySeconds from '../components/SixtySeconds.vue'
import TodayInHistory from '../components/TodayInHistory.vue'
import EntertainmentCard from '../components/EntertainmentCard.vue'
import { getBilibiliHot, getWeiboHot, getZhihuHot, getDouyinHot, getToutiaoHot, getSixtySeconds } from '../api/hotList'
import { ElMessage } from 'element-plus'

const loading = ref(false)
const bilibiliList = ref([])
const weiboList = ref([])
const zhihuList = ref([])
const douyinList = ref([])
const toutiaoList = ref([])
const sixtySecondsData = ref(null)
const todayInHistoryData = ref(null)
const lastUpdateTime = ref(new Date().toLocaleString())
const hitokoto = ref('')
const showBackTop = ref(false)
const backTopActive = ref(false)

const fetchHitokoto = async () => {
  try {
    const res = await fetch('https://60s-api.viki.moe/v2/hitokoto')
    const json = await res.json()
    hitokoto.value = json.data?.hitokoto || ''
  } catch {
    hitokoto.value = '获取随机一言失败'
  }
}

const fetchTodayInHistory = async () => {
  try {
    const res = await fetch('https://60s-api.viki.moe/v2/today_in_history')
    const json = await res.json()
    todayInHistoryData.value = json.data
  } catch (error) {
    console.error('获取历史上的今天失败:', error)
    ElMessage.error('获取历史上的今天失败')
  }
}

const fetchSixtySeconds = async () => {
  loading.value = true
  try {
    const data = await getSixtySeconds()
    sixtySecondsData.value = data
    lastUpdateTime.value = new Date().toLocaleString()
  } catch (error) {
    console.error('获取60秒读懂世界失败:', error)
    ElMessage.error('获取60秒读懂世界失败')
  } finally {
    loading.value = false
  }
}

const fetchBilibiliHot = async () => {
  loading.value = true
  try {
    const data = await getBilibiliHot()
    bilibiliList.value = data
    lastUpdateTime.value = new Date().toLocaleString()
  } catch (error) {
    console.error('获取B站热搜失败:', error)
    ElMessage.error('获取B站热搜失败')
  } finally {
    loading.value = false
  }
}

const fetchWeiboHot = async () => {
  loading.value = true
  try {
    const data = await getWeiboHot()
    weiboList.value = data
    lastUpdateTime.value = new Date().toLocaleString()
  } catch (error) {
    console.error('获取微博热搜失败:', error)
    ElMessage.error('获取微博热搜失败')
  } finally {
    loading.value = false
  }
}

const fetchZhihuHot = async () => {
  loading.value = true
  try {
    const data = await getZhihuHot()
    zhihuList.value = data
    lastUpdateTime.value = new Date().toLocaleString()
  } catch (error) {
    console.error('获取知乎热榜失败:', error)
    ElMessage.error('获取知乎热榜失败')
  } finally {
    loading.value = false
  }
}

const fetchDouyinHot = async () => {
  loading.value = true
  try {
    const data = await getDouyinHot()
    douyinList.value = data
    lastUpdateTime.value = new Date().toLocaleString()
  } catch (error) {
    console.error('获取抖音热搜失败:', error)
    ElMessage.error('获取抖音热搜失败')
  } finally {
    loading.value = false
  }
}

const fetchToutiaoHot = async () => {
  loading.value = true
  try {
    const data = await getToutiaoHot()
    toutiaoList.value = data
    lastUpdateTime.value = new Date().toLocaleString()
  } catch (error) {
    console.error('获取头条热搜失败:', error)
    ElMessage.error('获取头条热搜失败')
  } finally {
    loading.value = false
  }
}

const refreshCurrentTab = () => {
  fetchTodayInHistory()
  fetchWeiboHot()
  fetchToutiaoHot()
  fetchZhihuHot()
  fetchDouyinHot()
  fetchBilibiliHot()
  fetchSixtySeconds()
  fetchHitokoto()
}

const cards = [
  { platform: 'todayInHistory', title: '历史上的今天', icon: '', component: TodayInHistory, list: todayInHistoryData },
  { platform: 'weibo', title: '微博热搜', icon: '/weibo.ico', component: HotListItem, list: weiboList },
  { platform: 'toutiao', title: '头条热搜', icon: '/toutiao.ico', component: HotListItem, list: toutiaoList },
  { platform: 'zhihu', title: '知乎热榜', icon: '/zhihu.ico', component: HotListItem, list: zhihuList },
  { platform: 'douyin', title: '抖音热搜', icon: '/douyin.png', component: HotListItem, list: douyinList },
  { platform: 'bilibili', title: 'B站热搜', icon: '/bilibili.ico', component: HotListItem, list: bilibiliList },
  { platform: 'sixtySeconds', title: '60秒读懂世界', icon: '/sixty.ico', component: null, list: undefined },
  { platform: 'entertainment', title: '消遣娱乐', icon: '🎲', component: EntertainmentCard, list: undefined },
]

onMounted(() => {
  fetchTodayInHistory()
  fetchWeiboHot()
  fetchToutiaoHot()
  fetchZhihuHot()
  fetchDouyinHot()
  fetchBilibiliHot()
  fetchSixtySeconds()
  fetchHitokoto()
})

onUnmounted(() => {
})

function scrollToTop() {
  backTopActive.value = true
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<style scoped>
.hot-list-container {
  max-width: 1700px;
  margin: 20px auto;
  padding: 0 20px;
  min-height: calc(100vh - 40px);
  display: flex;
  flex-direction: column;
  background: #f0f7ff;
}

.header {
  text-align: center;
  margin-bottom: 30px;
}

.title {
  font-size: 2.8em;
  color: #303133;
  margin: 0;
  background: linear-gradient(45deg, #2c3e50, #3498db);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 700;
  letter-spacing: 2px;
  text-shadow: 2px 2px 4px rgba(44, 62, 80, 0.1);
  position: relative;
}

.subtitle {
  color: #666;
  margin: 12px 0 0;
  font-size: 1.2em;
  letter-spacing: 1px;
  font-weight: 500;
}

.tab-pages {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  justify-content: center;
  width: 100%;
  padding-bottom: 12px;
}

.tab-page {
  width: 500px;
  max-width: 500px;
  height: 600px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  overflow-y: auto;
  padding: 0 18px 18px 18px;
  margin-bottom: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.tab-page-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
  position: sticky;
  top: 0;
  z-index: 99;
  background: #fff;
  padding: 24px 0 8px 0;
  border-bottom: 1px solid #f0f0f0;
}

.tab-page-logo {
  width: 28px;
  height: 28px;
}

.tab-page-title {
  font-size: 1.25em;
  font-weight: 700;
  color: #222;
}

.footer {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  color: #666;
}

:deep(.el-tabs__header) {
  margin: 0;
  background: #f0f7ff;
  border-bottom: none;
}

:deep(.el-tabs__nav) {
  overflow-x: auto !important;
  white-space: nowrap !important;
  scrollbar-width: none;
  -ms-overflow-style: none;
  border-bottom: 2px solid #e3e8f0;
  background: transparent;
}

:deep(.el-tabs__item) {
  height: 40px !important;
  line-height: 40px !important;
  font-size: 1.15em !important;
  padding: 0 22px !important;
  display: inline-block !important;
  min-width: 72px !important;
  box-sizing: border-box;
  color: #6d757a !important;
  background: transparent !important;
  border-radius: 20px 20px 0 0 !important;
  font-weight: 500;
  margin: 0 4px;
  transition: all 0.2s;
  border: none !important;
}

:deep(.el-tabs__item.is-active) {
  background: #fff !important;
  color: #00a1d6 !important;
  font-weight: 700;
  box-shadow: 0 2px 8px rgba(0,161,214,0.08);
  border-radius: 20px 20px 0 0 !important;
  position: relative;
}

:deep(.el-tabs__item.is-active .tab-label span) {
  position: relative;
  color: #00a1d6 !important;
}
:deep(.el-tabs__item.is-active .tab-label span)::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -2px;
  height: 2px;
  background: linear-gradient(90deg, #00a1d6 0%, #23e3ff 100%);
  border-radius: 2px;
  z-index: 1;
}

:deep(.el-tabs__item:hover) {
  color: #00a1d6 !important;
  background: #eaf8fd !important;
}

:deep(.el-tabs__content) {
  padding: 20px;
  background: #fff;
}

:deep(.el-button--primary) {
  background: #ff6b6b;
  border-color: #ff6b6b;
}

:deep(.el-button--primary:hover) {
  background: #ff5252;
  border-color: #ff5252;
}

@media (max-width: 900px) {
  .hot-list-container {
    max-width: 100% !important;
    padding: 0 4px !important;
  }

  .header .title {
    font-size: 2em !important;
  }

  .subtitle {
    font-size: 1em !important;
  }

  .tab-label {
    font-size: 0.95em !important;
    gap: 4px !important;
  }

  :deep(.el-tabs__header) {
    margin: 0 0 4px 0 !important;
  }

  :deep(.el-tabs__item) {
    height: 32px !important;
    line-height: 32px !important;
    font-size: 13px !important;
    padding: 0 6px !important;
  }

  .tab-page {
    width: 85vw !important;
    max-width: 85vw !important;
    margin: 0 auto !important;
    height: 600px !important;
    overflow-y: auto !important;
  }

  .back-top-btn {
    position: fixed;
    right: 18px;
    bottom: 32px;
    z-index: 9999;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #fff;
    box-shadow: 0 6px 24px rgba(79, 140, 255, 0.13);
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    outline: none !important;
    box-shadow: none;
    -webkit-tap-highlight-color: transparent;
    cursor: pointer;
    transition: box-shadow 0.2s, transform 0.15s;
    opacity: 0.98;
    padding: 0;
  }
  .back-top-btn:focus {
    outline: none !important;
    box-shadow: none !important;
  }
  .back-top-btn:hover {
    box-shadow: 0 2px 8px rgba(160, 132, 238, 0.18);
    transform: scale(1.08);
  }
  .back-top-btn:active svg {
    stroke: #ff3b30;
  }
  .back-top-btn svg {
    stroke: #222;
    transition: stroke 0.18s;
    width: 22px;
    height: 22px;
    display: block;
  }
}

.update-info {
  margin-top: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.update-time {
  color: #666;
  font-size: 0.9em;
  display: flex;
  align-items: center;
  gap: 6px;
}

.update-time i {
  font-size: 1.1em;
}

.refresh-btn {
  background: #3498db;
  border-color: #3498db;
  transition: all 0.3s ease;
}

.refresh-btn:hover {
  background: #2980b9;
  border-color: #2980b9;
  transform: rotate(180deg);
}

/* .today-history-card {
  padding: 0;
} */

.jin-icon {
  display: inline-block;
  width: 28px;
  height: 28px;
  background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
  color: #ff6b6b;
  font-size: 1.18em;
  font-weight: bold;
  border-radius: 50%;
  text-align: center;
  line-height: 28px;
  box-shadow: 0 2px 8px rgba(255, 107, 107, 0.08);
}
.today-date-right {
  margin-left: auto;
  color: #222;
  font-size: 1.1em;
  font-weight: 500;
}

.hitokoto {
  text-align: center;
  color: #888;
  font-style: italic;
  font-size: 1.08em;
  margin: 10px 0 0 0;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
  min-height: 28px;
}
.hitokoto-text {
  max-width: 600px;
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.quote-mark {
  font-size: 1.3em;
  color: #b0b0b0;
  font-family: serif;
  font-style: normal;
}

.sixty-icon {
  display: inline-block;
  width: 28px;
  height: 28px;
  background: linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%);
  color: #7b2ff2;
  font-size: 1.18em;
  font-weight: bold;
  border-radius: 50%;
  text-align: center;
  line-height: 28px;
  box-shadow: 0 2px 8px rgba(123, 47, 242, 0.08);
}

.le-icon {
  display: inline-block;
  width: 28px;
  height: 28px;
  background: linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%);
  color: #ff6a00;
  font-size: 1.18em;
  font-weight: bold;
  border-radius: 50%;
  text-align: center;
  line-height: 28px;
  box-shadow: 0 2px 8px rgba(255, 106, 0, 0.08);
}

.back-top-btn {
  position: fixed;
  right: 32px;
  bottom: 40px;
  z-index: 9999;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 6px 24px rgba(79, 140, 255, 0.13);
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  outline: none;
  cursor: pointer;
  transition: box-shadow 0.2s, transform 0.15s;
  opacity: 0.98;
  padding: 0;
}
.back-top-btn:hover {
  box-shadow: 0 2px 8px rgba(160, 132, 238, 0.18);
  transform: scale(1.08);
}
.back-top-btn svg {
  transition: stroke 0.18s;
  width: 26px;
  height: 26px;
  display: block;
}
@media (max-width: 900px) {
  .back-top-btn {
    right: 18px;
    bottom: 32px;
    width: 40px;
    height: 40px;
  }
  .back-top-btn svg {
    width: 22px;
    height: 22px;
  }
}
</style> 