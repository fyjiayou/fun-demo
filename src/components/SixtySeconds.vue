<template>
  <div class="sixty-seconds-card" v-if="data">
    <ul class="sixty-news">
      <li v-for="(item, idx) in data.news" :key="idx">
        <span class="news-index">{{ idx + 1 }}.</span> {{ item }}
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
.sixty-seconds-card {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.06);
  padding: 24px 18px 18px 18px;
  width: 100%;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.sixty-news {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.sixty-news li {
  background: #f6fafd;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,161,214,0.06);
  padding: 14px 12px 14px 12px;
  font-size: 1.08em;
  color: #333;
  line-height: 1.8;
  display: flex;
  align-items: flex-start;
  transition: box-shadow 0.2s;
}
.sixty-news li:hover {
  box-shadow: 0 4px 16px rgba(0,161,214,0.13);
}
.news-index {
  color: #00a1d6;
  font-weight: bold;
  font-size: 1.25em;
  margin-right: 12px;
  flex-shrink: 0;
  line-height: 1.5;
}
@media (max-width: 900px) {
  .sixty-seconds-card {
    height: auto !important;
    max-height: none !important;
    overflow-y: visible !important;
  }
}
</style> 