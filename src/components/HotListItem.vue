<template>
  <div class="hot-list">
    <div v-for="(item, index) in list" :key="index" class="hot-list-item" @click="handleClick(item)">
      <div class="rank" :class="{ 'top-three': index < 3 }">{{ index + 1 }}</div>
      <div class="content">
        <div class="title-wrapper">
          <div class="title">{{ item.title }}</div>
          <template v-if="platform === 'toutiao'">
            <div class="hot-value">
              <div class="hot-info">
                <span class="hot-count">{{ formatHotValue(item.hot) }}</span>
                <img v-if="item.cover" :src="item.cover" class="cover-image" alt="cover" />
              </div>
            </div>
          </template>
          <template v-else-if="platform === 'maoyan'">
            <div class="hot-value">
              <div class="hot-info">
                <span class="box-office">{{ item.boxOffice }}</span>
              </div>
            </div>
          </template>
          <template v-else-if="platform !== 'zhihu' && platform !== 'douyin' && item.hot">
            <div class="hot-value">
              <div class="hot-info">
                <span class="hot-count">{{ formatHotValue(item.hot) }}</span>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  list: {
    type: Array,
    required: true
  },
  platform: {
    type: String,
    required: true
  }
})

const formatHotValue = (value) => {
  if (!value) return ''
  if (value >= 100000000) {
    return (value / 100000000).toFixed(1) + '亿'
  } else if (value >= 10000) {
    return (value / 10000).toFixed(1) + '万'
  }
  return value.toString()
}

const handleClick = (item) => {
  if (item.url) {
    window.open(item.url, '_blank')
  }
}
</script>

<style scoped>
.hot-list {
  padding: 10px;
}

.hot-list-item {
  display: flex;
  align-items: center;
  padding: 16px;
  border-radius: 12px;
  background: #fff;
  margin-bottom: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  border: 1px solid #e8eaed;
}

.hot-list-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border-color: #ff6b6b;
}

.rank {
  width: 32px;
  height: 32px;
  line-height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: bold;
  color: #666;
  margin-right: 16px;
  background: #f0f7ff;
  border-radius: 10px;
  border: 1px solid #e8eaed;
  transition: all 0.3s ease;
}

.top-three {
  background: linear-gradient(135deg, #ff6b6b, #4ecdc4);
  color: #fff;
  border: none;
  box-shadow: 0 4px 12px rgba(255, 107, 107, 0.2);
  transform: scale(1.1);
}

.top-three:nth-child(1) {
  background: linear-gradient(135deg, #ff6b6b, #ff8e8e);
  box-shadow: 0 4px 12px rgba(255, 107, 107, 0.3);
}

.top-three:nth-child(2) {
  background: linear-gradient(135deg, #ff8e8e, #ffb3b3);
  box-shadow: 0 4px 12px rgba(255, 142, 142, 0.3);
}

.top-three:nth-child(3) {
  background: linear-gradient(135deg, #ffb3b3, #4ecdc4);
  box-shadow: 0 4px 12px rgba(255, 179, 179, 0.3);
}

.content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
}

.title-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  margin: 0;
}

.title {
  flex: 1;
  font-size: 15px;
  color: #333;
  line-height: 1.5;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.hot-value {
  min-width: 120px;
  text-align: right;
}

.hot-info {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
}

.hot-count {
  color: #ff6b6b;
  font-size: 14px;
  font-weight: 500;
}

.event-time {
  color: #666;
  font-size: 13px;
}

.answer-count, .follower-count {
  color: #666;
  font-size: 13px;
  background: #f0f7ff;
  padding: 2px 8px;
  border-radius: 6px;
  border: 1px solid #e8eaed;
}

.box-office {
  color: #ff6b6b;
  font-size: 14px;
  font-weight: 500;
}

.cover-image {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  object-fit: cover;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border: 1px solid #e8eaed;
}

@media (max-width: 768px) {
  .hot-list-item {
    padding: 8px;
    margin-bottom: 8px;
  }

  .rank {
    width: 24px;
    height: 24px;
    line-height: 24px;
    font-size: 14px;
    margin-right: 10px;
  }

  .content {
    gap: 4px;
  }

  .title {
    font-size: 13px;
    -webkit-line-clamp: 1;
  }

  .hot-count, .box-office {
    font-size: 12px;
  }

  .hot-value {
    min-width: 60px;
  }

  .event-time, .answer-count, .follower-count {
    font-size: 11px;
    padding: 1px 4px;
  }

  .cover-image {
    width: 28px;
    height: 28px;
  }
}
</style> 