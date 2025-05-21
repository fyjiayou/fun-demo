<template>
  <div class="hot-list">
    <div v-for="(item, index) in list" :key="index" class="hot-list-item" @click="handleClick(item)">
      <div class="rank" :class="{ 'top-three': index < 3 }">{{ index + 1 }}</div>
      <div class="content">
        <div class="title-wrapper">
          <div class="title">{{ item.title }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  list: {
    type: Array,
    default: () => []
  },
  platform: {
    type: String,
    required: true
  },
  isMobile: {
    type: Boolean,
    default: false
  }
})

const getItemUrl = (item) => {
  if (!item) return '#'
  return props.isMobile ? (item.mobileUrl || item.url) : (item.url || item.mobileUrl)
}

const handleClick = (item) => {
  if (getItemUrl(item)) {
    window.open(getItemUrl(item), '_blank')
  }
}
</script>

<style scoped>
:root {
  --list-item-bg: #fff;
  --list-item-hover-bg: #f5f7fa;
  --rank-bg: #ff6b6b;
  --rank-bg-normal: #f5f7fa;
  --rank-color-normal: #909399;
  --title-color: #2c3e50;
}
.dark-mode {
  --list-item-bg: #282c34;
  --list-item-hover-bg: #23272e;
  --rank-bg: #ff6b6b;
  --rank-bg-normal: #23272e;
  --rank-color-normal: #b0b3b8;
  --title-color: #f5f5f7;
}

.hot-list {
  padding: 8px;
}

.hot-list-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  margin-bottom: 4px;
  background: var(--list-item-bg);
}

.hot-list-item:hover {
  background: var(--list-item-hover-bg);
  transform: translateX(2px);
}

.rank {
  width: 22px;
  height: 22px;
  line-height: 22px;
  text-align: center;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 700;
  color: #fff;
  flex-shrink: 0;
  background: #ff6b6b;
}

.rank:not(.top-three) {
  background: #f5f7fa;
  color: #909399;
}

.top-three {
  background: #ff6b6b !important;
  color: #fff !important;
}

.content {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.title-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  margin: 0;
}

.title {
  font-size: 14px;
  color: var(--title-color);
  margin: 0;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: break-all;
}

@media (max-width: 900px) {
  .hot-list-item {
    padding: 8px 10px;
  }

  .rank {
    width: 20px;
    height: 20px;
    line-height: 20px;
    font-size: 12px;
  }

  .title {
    font-size: 13px;
  }
}
</style> 