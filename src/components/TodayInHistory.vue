<template>
  <div class="today-history-card" v-if="data && data.items && data.items.length">
    <ul class="today-history-list">
      <li v-for="(item, idx) in data.items" :key="idx" class="hot-list-item">
        <div class="rank" :class="{ 'top-three': idx < 3 }">{{ idx + 1 }}</div>
        <div class="content">
          <div class="title-wrapper">
            <a :href="item.link" class="title" target="_blank" rel="noopener">{{ item.title }}</a>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
defineProps({
  data: Object
})
</script>

<style scoped>
.today-history-card {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.06);
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 0;
  height: 100%;
}
.today-history-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0;
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
  background: #fff;
}
.hot-list-item:hover {
  background: #f5f7fa;
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
  color: #2c3e50;
  margin: 0;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: break-all;
  text-decoration: none;
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
@media (max-width: 768px) {
  .today-history-card {
    padding: 4px;
  }
}
</style> 