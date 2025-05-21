<template>
  <div class="app" :class="{ 'dark-mode': isDarkMode }">
    <GlobalActions v-model="isDarkMode" />
    <router-view></router-view>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import GlobalActions from './components/GlobalActions.vue'

const isDarkMode = ref(false)

onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme) {
    isDarkMode.value = savedTheme === 'dark'
  }
})
</script>

<style>
:root {
  --bg-color: #fafafc;
  --main-bg: #fff;
  --card-bg: #fff;
  --list-item-bg: #fff;
  --text-color: #333;
  --button-bg: #fff;
  --button-shadow: rgba(0, 0, 0, 0.1);
  --card-shadow: 0 2px 8px rgba(0,0,0,0.05);
  --border-color: #ebeef5;
  --divider-color: #ebeef5;
  --scrollbar-thumb: #e4e7ed;
  --rank-bg: #ff6b6b;
  --rank-bg-normal: #f5f7fa;
  --rank-color-normal: #909399;
  --title-color: #2c3e50;
}

.dark-mode {
  --bg-color: #181a1b;
  --main-bg: #23272e;
  --card-bg: #23272e;
  --list-item-bg: #262a31;
  --text-color: #f5f5f7;
  --button-bg: #2d2d2d;
  --button-shadow: rgba(0, 0, 0, 0.3);
  --card-shadow: 0 2px 8px rgba(0,0,0,0.4);
  --border-color: #3335;
  --divider-color: #3332;
  --scrollbar-thumb: #444a;
  --rank-bg: #ff6b6b;
  --rank-bg-normal: #23272e;
  --rank-color-normal: #b0b3b8;
  --title-color: #f5f5f7;
}

.app {
  min-height: 100vh;
  background-color: var(--bg-color);
  color: var(--text-color);
  transition: background-color 0.3s, color 0.3s;
}

.theme-toggle {
  position: fixed;
  top: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background-color: var(--button-bg);
  color: var(--text-color);
  font-size: 20px;
  cursor: pointer;
  box-shadow: 0 2px 8px var(--button-shadow);
  transition: all 0.3s ease;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.theme-toggle:hover {
  transform: scale(1.1);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}
</style> 