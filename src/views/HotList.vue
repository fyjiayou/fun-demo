<template>
  <div class="hot-list-container">
    <div class="header">
      <div class="header-left">
        <img src="/logo.svg" class="logo" alt="Logo" />
        <div class="logo-text">
          <div class="main-title">趣热搜</div>
          <div class="sub-title">动态掌握热搜数据，发现新鲜事</div>
        </div>
      </div>
      <div class="header-center">
        <div class="hitokoto" v-if="hitokoto">
          <span class="quote-mark">"</span>
          <span class="hitokoto-text">{{ hitokoto }}</span>
          <span class="quote-mark">"</span>
        </div>
        <div class="update-time">
          <i class="el-icon-time"></i>
          <span>数据更新时间：{{ lastUpdateTime }}</span>
        </div>
      </div>
      <div class="header-right">
        <button
          class="reset-order-btn header-reset-btn icon-btn"
          @click="resetCardOrder"
          title="默认排序"
          aria-label="默认排序"
        >
          <svg t="1747895427688" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11627" width="20" height="20"><path d="M432 176.085V871.98a8.021 8.021 0 0 1-8.021 8.021h-59.99a8.021 8.021 0 0 1-7.978-8.021V266.837L172.97 411.136A8.064 8.064 0 0 1 160 404.864v-72.533c0-4.907 2.219-9.472 6.101-12.587l214.102-168.79A32 32 0 0 1 432 176.129z m235.99-24.106v605.226l183.04-144.298a8.064 8.064 0 0 1 12.97 6.272v72.533a16 16 0 0 1-6.101 12.587L643.797 873.088A32 32 0 0 1 592 848V151.979c0-4.395 3.584-7.979 7.979-7.979h60.032c4.394 0 7.978 3.584 7.978 7.979z" p-id="11628" fill="currentColor"></path></svg>
        </button>
        <el-button
          type="primary"
          :icon="Refresh"
          circle
          size="default"
          title="刷新页面"
          aria-label="刷新页面"
          class="refresh-btn"
          @click="refreshCurrentTab"
        />
        <button
          type="primary"
          :icon="isDarkMode ? 'Sunny' : 'Moon'"
          size="default"
          class="theme-toggle-btn"
          @click="toggleDarkMode"
          :aria-label="isDarkMode ? '切换到浅色模式' : '切换到深色模式'"
          :title="isDarkMode ? '浅色模式' : '深色模式'"
        >
          <span v-if="isDarkMode" class="theme-icon">
            <!-- 太阳SVG -->
            <svg width="1.2em" height="1.2em" viewBox="0 0 48 48" fill="none">
              <path d="M24 37C31.1797 37 37 31.1797 37 24C37 16.8203 31.1797 11 24 11C16.8203 11 11 16.8203 11 24C11 31.1797 16.8203 37 24 37Z" fill="none" stroke="currentColor" stroke-width="4" stroke-linejoin="round"></path>
              <path d="M24 6C25.3807 6 26.5 4.88071 26.5 3.5C26.5 2.11929 25.3807 1 24 1C22.6193 1 21.5 2.11929 21.5 3.5C21.5 4.88071 22.6193 6 24 6Z" fill="currentColor"></path>
              <path d="M38.5 12C39.8807 12 41 10.8807 41 9.5C41 8.11929 39.8807 7 38.5 7C37.1193 7 36 8.11929 36 9.5C36 10.8807 37.1193 12 38.5 12Z" fill="currentColor"></path>
              <path d="M44.5 26.5C45.8807 26.5 47 25.3807 47 24C47 22.6193 45.8807 21.5 44.5 21.5C43.1193 21.5 42 22.6193 42 24C42 25.3807 43.1193 26.5 44.5 26.5Z" fill="currentColor"></path>
              <path d="M38.5 41C39.8807 41 41 39.8807 41 38.5C41 37.1193 39.8807 36 38.5 36C37.1193 36 36 37.1193 36 38.5C36 39.8807 37.1193 41 38.5 41Z" fill="currentColor"></path>
              <path d="M24 47C25.3807 47 26.5 45.8807 26.5 44.5C26.5 43.1193 25.3807 42 24 42C22.6193 42 21.5 43.1193 21.5 44.5C21.5 45.8807 22.6193 47 24 47Z" fill="currentColor"></path>
              <path d="M9.5 41C10.8807 41 12 39.8807 12 38.5C12 37.1193 10.8807 36 9.5 36C8.11929 36 7 37.1193 7 38.5C7 39.8807 8.11929 41 9.5 41Z" fill="currentColor"></path>
              <path d="M3.5 26.5C4.88071 26.5 6 25.3807 6 24C6 22.6193 4.88071 21.5 3.5 21.5C2.11929 21.5 1 22.6193 1 24C1 25.3807 2.1193 26.5 3.5 26.5Z" fill="currentColor"></path>
              <path d="M9.5 12C10.8807 12 12 10.8807 12 9.5C12 8.11929 10.8807 7 9.5 7C8.11929 7 7 8.11929 7 9.5C7 10.8807 8.11929 12 9.5 12Z" fill="currentColor"></path>
            </svg>
          </span>
          <span v-else class="theme-icon">
            <!-- 月亮SVG -->
            <svg width="1.2em" height="1.2em" viewBox="0 0 48 48" fill="none">
              <path d="M28.0527 4.41085C22.5828 5.83695 18.5455 10.8106 18.5455 16.7273C18.5455 23.7564 24.2436 29.4545 31.2727 29.4545C37.1894 29.4545 42.1631 25.4172 43.5891 19.9473C43.8585 21.256 44 22.6115 44 24C44 35.0457 35.0457 44 24 44C12.9543 44 4 35.0457 4 24C4 12.9543 12.9543 4 24 4C25.3885 4 26.744 4.14149 28.0527 4.41085Z" fill="none" stroke="currentColor" stroke-width="4" stroke-linejoin="round"></path>
            </svg>
          </span>
        </button>
      </div>
    </div>
    <!-- 内容区 -->
    <draggable
      v-model="cards"
      item-key="platform"
      class="tab-pages"
      :animation="120"
      :delay="80"
      :touchStartThreshold="5"
      :ghost-class="'tab-page-ghost'"
      :chosen-class="'tab-page-chosen'"
      :drag-class="'tab-page-drag'"
      :force-fallback="true"
    >
      <template #item="{element: card}">
        <div class="tab-page">
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
            <template v-if="card.platform === 'todayInHistory'">
              <span class="today-date-right">
                {{ todayInHistoryData?.type || '' }}
              </span>
            </template>
            <template v-else-if="['weibo', 'bilibili', 'zhihu', 'douyin', 'toutiao', 'baidu', 'weRead', 'jianshu'].includes(card.platform)">
              <div class="card-header-actions">
                <el-button
                  type="primary"
                  :icon="Refresh"
                  circle
                  size="small"
                  class="card-refresh-btn"
                  @click="refreshCard(card.platform)"
                />
                <template v-if="getListByPlatform(card.platform) && getListByPlatform(card.platform).length > 0">
                  <div class="update-time-info">
                    <i class="el-icon-time"></i>
                    {{ getUpdateTimeByPlatform(card.platform) ? formatUpdateTime(getUpdateTimeByPlatform(card.platform)) : '未知' }}更新
                  </div>
                </template>
                <template v-else>
                  <div class="card-failed-badge"></div>
                </template>
              </div>
            </template>
          </div>
          <div class="tab-page-content">
            <TodayInHistory v-if="card.platform === 'todayInHistory'" :data="todayInHistoryData" />
            <SixtySeconds v-else-if="card.platform === 'sixtySeconds'" :data="sixtySecondsData" />
            <component
              v-else-if="card.component"
              :is="card.component"
              :list="getListByPlatform(card.platform)"
              :platform="card.platform"
              :is-mobile="isMobile"
            />
          </div>
        </div>
      </template>
    </draggable>
    <template v-if="showBackTop">
      <button class="back-top-btn" @click="scrollToTop" aria-label="返回顶部">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" :stroke="backTopActive ? '#ff3b30' : '#222'" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
      </button>
    </template>
  </div>
  <footer class="icp-footer">
    趣热搜 @ Copyright By fystart |
    <a href="mailto:fystart@163.com" class="feedback-link">意见反馈</a>
    <br/>
    <a href="https://beian.miit.gov.cn" target="_blank" rel="noopener" class="icp-link">鄂ICP备2025116821号</a>
  </footer>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, computed } from 'vue'
import HotListItem from '../components/HotListItem.vue'
import SixtySeconds from '../components/SixtySeconds.vue'
import TodayInHistory from '../components/TodayInHistory.vue'
import EntertainmentCard from '../components/EntertainmentCard.vue'
import { getBilibiliHot, getWeiboHot, getZhihuHot, getDouyinHot, getToutiaoHot, getSixtySeconds, getTodayInHistory, getBaiduHot, getWeReadHot, getJSHot } from '../api/hotList'
import { ElMessage } from 'element-plus'
import draggable from 'vuedraggable'
import { Refresh } from '@element-plus/icons-vue'

const loading = ref(false)
const bilibiliList = ref({
  list: [],
  updateTime: null
})
const weiboList = ref({
  list: [],
  updateTime: null
})
const zhihuList = ref({
  list: [],
  updateTime: null
})
const douyinList = ref({
  list: [],
  updateTime: null
})
const toutiaoList = ref({
  list: [],
  updateTime: null
})
const baiduList = ref({
  list: [],
  updateTime: null
})
const weReadList = ref({
  list: [],
  updateTime: null
})
const sixtySecondsData = ref(null)
const todayInHistoryData = ref({
  type: '',
  list: []
})
const lastUpdateTime = ref(new Date().toLocaleString())
const hitokoto = ref('')
const showBackTop = ref(false)
const backTopActive = ref(false)
const currentTime = ref(new Date())
const isMobile = ref(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
const isDarkMode = ref(false)
const jsHotList = ref({
  list: [],
  updateTime: null
})

let timeUpdateInterval

function getListByPlatform(platform) {
  switch (platform) {
    case 'weibo': return weiboList.value.list
    case 'toutiao': return toutiaoList.value.list
    case 'zhihu': return zhihuList.value.list
    case 'douyin': return douyinList.value.list
    case 'bilibili': return bilibiliList.value.list
    case 'sixtySeconds': return sixtySecondsData.value?.list
    case 'todayInHistory': return todayInHistoryData.value?.list
    case 'baidu': return baiduList.value.list
    case 'weRead': return weReadList.value.list
    case 'jianshu': return jsHotList.value.list
    default: return []
  }
}

function getUpdateTimeByPlatform(platform) {
  switch (platform) {
    case 'weibo': return weiboList.value.updateTime
    case 'toutiao': return toutiaoList.value.updateTime
    case 'zhihu': return zhihuList.value.updateTime
    case 'douyin': return douyinList.value.updateTime
    case 'bilibili': return bilibiliList.value.updateTime
    case 'baidu': return baiduList.value.updateTime
    case 'weRead': return weReadList.value.updateTime
    case 'jianshu': return jsHotList.value.updateTime
    default: return null
  }
}

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
    const data = await getTodayInHistory()
    todayInHistoryData.value = data
  } catch (error) {
    console.error('获取历史上的今日失败:', error)
    ElMessage.error('获取历史上的今日失败')
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
  const data = await getBilibiliHot()
  bilibiliList.value = data
}

const fetchWeiboHot = async () => {
  const data = await getWeiboHot()
  weiboList.value = data
}

const fetchBaiduHot = async () => {
    const data = await getBaiduHot()
    baiduList.value = data
}
const fetchWeReadHot = async () => {
    const data = await getWeReadHot()
    weReadList.value = data
}

const fetchZhihuHot = async () => {
  const data = await getZhihuHot()
  zhihuList.value = data
}

const fetchDouyinHot = async () => {
  const data = await getDouyinHot()
  douyinList.value = data
}

const fetchToutiaoHot = async () => {
  const data = await getToutiaoHot()
  toutiaoList.value = data
}

const fetchJSHot = async () => {
  const data = await getJSHot()
  jsHotList.value = data
}

const refreshCurrentTab = async () => {
  if (loading.value) return

  loading.value = true
  try {
    await Promise.all([
      fetchTodayInHistory(),
      fetchWeiboHot(),
      fetchToutiaoHot(),
      fetchZhihuHot(),
      fetchDouyinHot(),
      fetchBilibiliHot(),
      fetchBaiduHot(),
      fetchWeReadHot(),
      fetchJSHot(),
      fetchSixtySeconds(),
      fetchHitokoto()
    ])
    lastUpdateTime.value = new Date().toLocaleString()
    ElMessage({
      message: '全部数据刷新成功',
      type: 'success',
      duration: 1000
    })
  } catch (error) {
    console.error('刷新数据失败:', error)
    ElMessage.error('刷新数据失败')
  } finally {
    loading.value = false
  }
}

const refreshCard = async (platform) => {
  if (loading.value) return

  loading.value = true
  try {
    switch (platform) {
      case 'weibo': {
        const weiboData = await getWeiboHot()
        weiboList.value = weiboData
        if (!weiboData.list || weiboData.list.length === 0) {
          ElMessage.error('微博热搜刷新失败')
        } else {
          ElMessage({
            message: '微博热搜刷新成功',
            type: 'success',
            duration: 1000
          })
        }
        break
      }
      case 'bilibili': {
        const bilibiliData = await getBilibiliHot()
        bilibiliList.value = bilibiliData
        if (!bilibiliData.list || bilibiliData.list.length === 0) {
          ElMessage.error('哔哩哔哩热榜刷新失败')
        } else {
          ElMessage({
            message: '哔哩哔哩热榜刷新成功',
            type: 'success',
            duration: 1000
          })
        }
        break
      }
      case 'zhihu': {
        const zhihuData = await getZhihuHot()
        zhihuList.value = zhihuData
        if (!zhihuData.list || zhihuData.list.length === 0) {
          ElMessage.error('知乎热榜刷新失败')
        } else {
          ElMessage({
            message: '知乎热榜刷新成功',
            type: 'success',
            duration: 1000
          })
        }
        break
      }
      case 'douyin': {
        const douyinData = await getDouyinHot()
        douyinList.value = douyinData
        if (!douyinData.list || douyinData.list.length === 0) {
          ElMessage.error('抖音热榜刷新失败')
        } else {
          ElMessage({
            message: '抖音热榜刷新成功',
            type: 'success',
            duration: 1000
          })
        }
        break
      }
      case 'toutiao': {
        const toutiaoData = await getToutiaoHot()
        toutiaoList.value = toutiaoData
        if (!toutiaoData.list || toutiaoData.list.length === 0) {
          ElMessage.error('头条热榜刷新失败')
        } else {
          ElMessage({
            message: '头条热榜刷新成功',
            type: 'success',
            duration: 1000
          })
        }
        break
      }
      case 'baidu': {
        const baiduData = await getBaiduHot()
        baiduList.value = baiduData
        if (!baiduData.list || baiduData.list.length === 0) {
          ElMessage.error('百度热榜刷新失败')
        } else {
          ElMessage({
            message: '百度热榜刷新成功',
            type: 'success',
            duration: 1000
          })
        }
        break
      }
      case 'weRead': {
        const weReadData = await getWeReadHot()
        weReadList.value = weReadData
        if (!weReadData.list || weReadData.list.length === 0) {
          ElMessage.error('微信阅读飙升榜刷新失败')
        } else {
          ElMessage({
            message: '微信阅读飙升榜刷新成功',
            type: 'success',
            duration: 1000
          })
        }
        break
      }
      case 'jianshu': {
        const jsData = await getJSHot()
        jsHotList.value = jsData
        if (!jsData.list || jsData.list.length === 0) {
          ElMessage.error('简书热门推荐刷新失败')
        } else {
          ElMessage({
            message: '简书热门推荐刷新成功',
            type: 'success',
            duration: 1000
          })
        }
        break
      }
    }
  } catch (error) {
    console.error(`获取${platform}数据失败:`, error)
    ElMessage.error(`获取${platform}数据失败`)
  } finally {
    loading.value = false
  }
}

const defaultCards = [
  { platform: 'todayInHistory', title: '历史上的今天', icon: '', component: TodayInHistory },
  { platform: 'weibo', title: '微博热搜', icon: '/weibo.ico', component: HotListItem },
  { platform: 'toutiao', title: '头条热榜', icon: '/toutiao.ico', component: HotListItem },
  { platform: 'zhihu', title: '知乎热榜', icon: '/zhihu.ico', component: HotListItem },
  { platform: 'baidu', title: '百度热榜', icon: '/baidu.ico', component: HotListItem },
  { platform: 'douyin', title: '抖音热榜', icon: '/douyin.png', component: HotListItem },
  { platform: 'bilibili', title: '哔哩哔哩热榜', icon: '/bilibili.ico', component: HotListItem },
  { platform: 'weRead', title: '微信阅读飙升榜', icon: '/weRead.png', component: HotListItem },
  { platform: 'jianshu', title: '简书热门推荐', icon: '/jian.ico', component: HotListItem },
  { platform: 'sixtySeconds', title: '60秒读懂世界', icon: '/sixty.ico', component: SixtySeconds },
  { platform: 'entertainment', title: '消遣娱乐', icon: '🎲', component: EntertainmentCard },
]
const cards = ref([])

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
  document.documentElement.classList.toggle('dark-mode', isDarkMode.value)
  localStorage.setItem('darkMode', isDarkMode.value.toString())
}

onMounted(() => {
  // 恢复卡片顺序
  const savedOrder = localStorage.getItem('hotListCardOrder')
  if (savedOrder) {
    const orderArr = JSON.parse(savedOrder)
    // 按保存顺序排序
    cards.value = orderArr
      .map(platform => defaultCards.find(card => card.platform === platform))
      .filter(Boolean)
    // 补充未保存的卡片（比如以后新增的）
    defaultCards.forEach(card => {
      if (!cards.value.find(c => c.platform === card.platform)) {
        cards.value.push(card)
      }
    })
  } else {
    cards.value = [...defaultCards]
  }

  // Check for saved dark mode preference
  const savedDarkMode = localStorage.getItem('darkMode')
  if (savedDarkMode !== null) {
    isDarkMode.value = savedDarkMode === 'true'
    document.documentElement.classList.toggle('dark-mode', isDarkMode.value)
  } else {
    // Check system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    isDarkMode.value = prefersDark
    document.documentElement.classList.toggle('dark-mode', prefersDark)
  }

  fetchTodayInHistory()
  fetchWeiboHot()
  fetchToutiaoHot()
  fetchZhihuHot()
  fetchDouyinHot()
  fetchBilibiliHot()
  fetchBaiduHot()
  fetchWeReadHot()
  fetchJSHot()
  fetchSixtySeconds()
  fetchHitokoto()

  timeUpdateInterval = setInterval(() => {
    currentTime.value = new Date()
  }, 60000)
})

onUnmounted(() => {
  if (timeUpdateInterval) {
    clearInterval(timeUpdateInterval)
  }
})

function scrollToTop() {
  backTopActive.value = true
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const formatUpdateTime = (updateTime) => {
  if (!updateTime) return '未知'

  const now = currentTime.value
  const updateDate = new Date(updateTime)

  if (isNaN(updateDate.getTime())) return '未知'

  const diffMilliseconds = now - updateDate
  const diffMinutes = Math.floor(diffMilliseconds / (1000 * 60))

  if (diffMinutes < 1) return '刚刚'
  if (diffMinutes < 60) return `${diffMinutes}分钟前`

  const diffHours = Math.floor(diffMinutes / 60)
  if (diffHours < 24) return `${diffHours}小时前`

  const diffDays = Math.floor(diffHours / 24)
  if (diffDays < 30) return `${diffDays}天前`

  return updateDate.toLocaleString('zh-CN', {
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// 拖拽后保存顺序
watch(cards, (newCards) => {
  const order = newCards.map(card => card.platform)
  localStorage.setItem('hotListCardOrder', JSON.stringify(order))
}, { deep: true })

const showResetOrder = computed(() => {
  const savedOrder = localStorage.getItem('hotListCardOrder')
  if (!savedOrder) return false
  try {
    const arr = JSON.parse(savedOrder)
    // 只要顺序和默认不一样就显示
    return JSON.stringify(arr) !== JSON.stringify(defaultCards.map(c => c.platform))
  } catch {
    return false
  }
})

function resetCardOrder() {
  localStorage.removeItem('hotListCardOrder')
  cards.value = [...defaultCards]
}
</script>

<style scoped>
:root {
  --bg-color: #fafafc;
  --main-bg: #fff;
  --card-bg: #fff;
  --list-bg: #fff;
  --text-color: #333;
  --card-shadow: 0 2px 8px rgba(0,0,0,0.05);
  --border-color: #ebeef5;
  --divider-color: #ebeef5;
  --scrollbar-thumb: #e4e7ed;
}
.dark-mode {
  --bg-color: #181a1b;
  --main-bg: #23272e;
  --card-bg: #222;
  --list-bg: #282c34;
  --text-color: #f5f5f7;
  --card-shadow: 0 2px 8px rgba(0,0,0,0.4);
  --border-color: #3335;
  --divider-color: #3332;
  --scrollbar-thumb: #444a;
}

.hot-list-container {
  max-width: 1300px;
  margin: 20px auto;
  padding: 0 20px;
  min-height: calc(100vh - 40px);
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--bg-color);
  color: var(--text-color);
  justify-content: center;
  align-items: flex-start;
}

.header {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  width: 100%;
  max-width: 1300px;
  margin: 20px auto 30px auto;
  padding: 20px;
  background: var(--main-bg);
  border-radius: 12px;
  box-shadow: var(--card-shadow);
  color: var(--text-color);
  gap: 32px;
  text-align: center;
  position: relative;
}

.header-left {
  justify-self: start;
  display: flex;
  align-items: center;
  gap: 12px;
}

.header-center {
  justify-self: center;
  flex-direction: column;
  align-items: center;
  display: flex;
  gap: 12px;
}

.header-right {
  justify-self: end;
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo {
  height: 48px;
  width: auto;
}

.logo-text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.main-title {
  font-size: 1.8em;
  font-weight: 700;
  color: var(--text-color);
  line-height: 1.2;
}

.sub-title {
  font-size: 0.9em;
  color: #666;
  line-height: 1.4;
}

.hitokoto {
  text-align: center;
  color: #606266;
  font-style: italic;
  font-size: 1em;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
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
  width: 40px !important;
  height: 40px !important;
  background: var(--card-bg) !important;
  border: 1px solid var(--border-color) !important;
  color: var(--text-color) !important;
  transition: all 0.3s ease;
}

.refresh-btn:hover {
  background: var(--card-bg) !important;
  border-color: #409EFF !important;
  color: #409EFF !important;
  transform: rotate(180deg);
}

.tab-pages {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: flex-start;
  width: 100%;
  padding: 0;
  background: transparent;
}

.tab-page {
  width: 400px;
  max-width: 100%;
  min-width: 300px;
  height: 480px;
  background: var(--card-bg);
  border-radius: 12px;
  box-shadow: var(--card-shadow);
  margin-bottom: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  position: relative;
  border: 1px solid var(--border-color);
  transition: all 0.3s ease;
  overflow: hidden;
  color: var(--text-color);
}

.tab-page:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.tab-page-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 0;
  position: sticky;
  top: 0;
  z-index: 99;
  background: var(--card-bg);
  padding: 16px;
  border-bottom: 1px solid var(--divider-color);
  color: var(--text-color);
}

.tab-page-logo {
  width: 24px;
  height: 24px;
  flex-shrink: 0;
}

.tab-page-title {
  font-size: 1.1em;
  font-weight: 600;
  color: var(--text-color);
  flex-shrink: 0;
}

.tab-page-content {
  flex: 1;
  overflow-y: auto;
  padding: 12px 16px;
  scrollbar-width: thin;
  scrollbar-color: var(--scrollbar-thumb) transparent;
  background: transparent;
  color: var(--text-color);
}

.tab-page-content::-webkit-scrollbar {
  width: 4px;
}

.tab-page-content::-webkit-scrollbar-track {
  background: transparent;
}

.tab-page-content::-webkit-scrollbar-thumb {
  background-color: var(--scrollbar-thumb);
  border-radius: 4px;
}

.tab-page-footer {
  padding: 12px 18px;
  border-top: 1px solid var(--divider-color);
  background: var(--card-bg);
  border-radius: 0 0 16px 16px;
}

.update-time-info {
  color: #909399;
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 4px;
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
  background: var(--card-bg) !important;
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
  background: var(--card-bg);
}

:deep(.el-button--primary) {
  background: #ff6b6b;
  border-color: #ff6b6b;
}

:deep(.el-button--primary:hover) {
  background: #ff5252;
  border-color: #ff5252;
}

@media (max-width: 1400px) {
  .tab-page {
    width: 48%;
    min-width: 300px;
    max-width: 100%;
  }
}
@media (max-width: 900px) {
  .tab-page {
    width: 100%;
    min-width: 0;
    max-width: 100%;
  }
}

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
  flex-shrink: 0;
}

.quote-mark {
  font-size: 1.2em;
  color: #909399;
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
  .header {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 16px;
    justify-content: center;
    align-items: center;
  }
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

.card-header-actions {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 12px;
}

.card-refresh-btn {
  width: 24px !important;
  height: 24px !important;
  padding: 0 !important;
  background: transparent !important;
  border: none !important;
  color: #909399 !important;
  transition: all 0.3s ease;
}

.card-refresh-btn:hover {
  transform: rotate(180deg);
  color: #409EFF !important;
}

.card-refresh-btn :deep(.el-icon) {
  font-size: 16px;
}

.update-time-info {
  margin-left: 0;
  padding-left: 12px;
  border-left: 1px solid #eee;
}

:deep(.refresh-btn.el-button:focus),
:deep(.refresh-btn.el-button:active) {
  background: transparent !important;
  box-shadow: none !important;
  outline: none !important;
}

.theme-toggle-btn {
  width: 40px !important;
  height: 40px !important;
  padding: 0 !important;
  background: var(--card-bg) !important;
  border: 1px solid var(--border-color) !important;
  border-radius: 50% !important;
  color: var(--text-color) !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  cursor: pointer !important;
  transition: all 0.3s ease !important;
}

.theme-toggle-btn:hover {
  background: var(--card-bg) !important;
  border-color: #409EFF !important;
  color: #409EFF !important;
}

.theme-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

:deep(.el-button.is-circle) {
  padding: 0 !important;
}

:deep(.el-button .el-icon) {
  font-size: 20px !important;
}

.card-failed-badge {
  background: #dedede;
  color: #444;
  font-size: 13px;
  font-weight: 500;
  border-radius: 8px;
  padding: 0 22px;
  margin-left: 10px;
  box-shadow: 0 2px 8px rgba(160,160,160,0.08);
  display: flex;
  align-items: center;
  height: 18px;
  letter-spacing: 1px;
  user-select: none;
  border: 1px solid #d2d2d2;
  transition: background 0.3s;
  animation: failed-badge-flash 2s infinite alternate;
  animation-timing-function: ease-in-out;
}
@keyframes failed-badge-flash {
  0% { background: #dedede; }
  50% { background: #eee; }
  100% { background: #dedede; }
}
.dark-mode .card-failed-badge {
  background: #444;
  color: #ccc;
  border: 1px solid #333;
  animation: failed-badge-flash-dark 2s infinite alternate;
  animation-timing-function: ease-in-out;
}
@keyframes failed-badge-flash-dark {
  0% { background: #444; }
  50% { background: #222; }
  100% { background: #444; }
}

.icp-footer {
  width: 100%;
  text-align: center;
  margin: 32px 0 12px 0;
  font-size: 14px;
  color: #aaa;
  letter-spacing: 1px;
}

.icp-link {
  color: #aaa;
  text-decoration: none;
  transition: color 0.2s;
}

.icp-link:hover {
  color: #222;
  text-decoration: none;
}

/* 拖拽时的卡片样式优化 */
.tab-page-ghost {
  opacity: 0.5;
  border: 2px dashed #409EFF;
  background: #f0f7ff;
}
.tab-page-chosen {
  border: 2px solid #409EFF !important;
  box-shadow: 0 0 0 3px #409EFF, 0 4px 12px rgba(0, 0, 0, 0.08);
  z-index: 10;
  transition: border 0.15s, box-shadow 0.15s;
}
.tab-page-drag {
  opacity: 0.8;
}

.drag-tip-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 0 10px 0;
  padding: 0 4px;
}

.drag-tip {
  display: flex;
  align-items: center;
  color: #aaa;
  font-size: 15px;
  gap: 6px;
  user-select: none;
}

.drag-icon {
  vertical-align: middle;
  opacity: 0.7;
}

.reset-order-btn.icon-btn {
  margin-right: 10px;
  width: 40px;
  height: 40px;
  padding: 0;
  background: var(--card-bg) !important;
  border: 1px solid var(--border-color) !important;
  color: var(--text-color) !important;
  border-radius: 50% !important;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.reset-order-btn.icon-btn:hover {
  background: var(--card-bg) !important;
  border-color: #409EFF !important;
  color: #409EFF !important;
}

.reset-order-btn.icon-btn .icon {
  width: 20px;
  height: 20px;
  display: block;
}

.feedback-link {
  color: #aaa;
  text-decoration: none;
  margin: 0 4px;
  transition: color 0.2s;
}

.feedback-link:hover {
  color: #409EFF;
  text-decoration: none;
}
</style>
