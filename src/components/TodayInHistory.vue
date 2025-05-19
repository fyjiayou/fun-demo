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
  padding: 16px;
  min-height: 56px;
  border-radius: 12px;
  background: #fff;
  margin-bottom: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  border: 1px solid #e8eaed;
}
.hot-list-item:last-child {
  margin-bottom: 0;
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
  text-decoration: none;
}
.title:hover {
  text-decoration: underline;
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
}
</style> 