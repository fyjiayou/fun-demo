<template>
  <div class="entertainment-card">
    <div class="ent-row">
      <div class="ent-block">
        <button class="ent-btn" @click="getDuanzi">搞笑段子</button>
        <div class="ent-result ent-result-center" v-if="duanzi">{{ duanzi }}</div>
      </div>
      <div class="ent-block">
        <button class="ent-btn" @click="getFabing">发病文学</button>
        <div class="ent-result" v-if="fabing">{{ fabing }}</div>
      </div>
    </div>
    <div class="ent-row">
      <div class="ent-block">
        <button class="ent-btn" @click="getLuck">运势</button>
        <div class="ent-result ent-result-center" v-if="luck">
          <div>运势：<span :class="'luck-' + luck.luck_desc">{{ luck.luck_desc }}</span></div>
          <div v-if="luck.luck_tip">建议：{{ luck.luck_tip }}</div>
        </div>
      </div>
      <div class="ent-block">
        <button class="ent-btn" @click="getAnswer">答案之书</button>
        <div class="ent-result ent-result-center" v-if="answer">
          <div>{{ answer.answer }}</div>
          <div v-if="answer.answer_en" class="answer-en">{{ answer.answer_en }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const duanzi = ref('')
const fabing = ref('')
const luck = ref(null)
const answer = ref(null)

const getDuanzi = async () => {
  duanzi.value = ''
  try {
    const res = await fetch('https://60s-api.viki.moe/v2/duanzi')
    const json = await res.json()
    duanzi.value = json.data?.duanzi || '获取失败'
  } catch { duanzi.value = '获取失败' }
}
const getFabing = async () => {
  fabing.value = ''
  try {
    const res = await fetch('https://60s-api.viki.moe/v2/fabing')
    const json = await res.json()
    fabing.value = json.data?.saying || '获取失败'
  } catch { fabing.value = '获取失败' }
}
const getLuck = async () => {
  luck.value = null
  try {
    const res = await fetch('https://60s-api.viki.moe/v2/luck')
    const json = await res.json()
    luck.value = json.data || { luck_desc: '获取失败' }
  } catch { luck.value = { luck_desc: '获取失败' } }
}
const getAnswer = async () => {
  answer.value = null
  try {
    const res = await fetch('https://60s-api.viki.moe/v2/answer')
    const json = await res.json()
    answer.value = json.data || { answer: '获取失败' }
  } catch { answer.value = { answer: '获取失败' } }
}
</script>

<style scoped>
.entertainment-card {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.06);
  padding: 16px 12px 12px 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: 100%;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
}
.ent-row {
  display: flex;
  gap: 12px;
  margin-bottom: 8px;
  flex: 1;
}
.ent-block {
  flex: 1;
  background: #f6fafd;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,161,214,0.06);
  padding: 12px 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 0;
  max-height: none;
  overflow-y: auto;
}
.ent-btn {
  background: linear-gradient(90deg, #ff9966 0%, #ff5e62 100%);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 6px 14px;
  font-size: 0.95em;
  font-weight: 600;
  margin-bottom: 8px;
  cursor: pointer;
  transition: background 0.2s;
  white-space: nowrap;
}
.ent-btn:hover {
  background: linear-gradient(90deg, #ff5e62 0%, #ff9966 100%);
}
.ent-result {
  color: #333;
  font-size: 0.95em;
  word-break: break-all;
  margin-top: 4px;
  width: 100%;
}
.ent-result-center {
  text-align: center;
}
.luck-凶 { color: #ff6b6b; font-weight: bold; }
.luck-吉 { color: #36d1c4; font-weight: bold; }
.luck-中 { color: #f7b731; font-weight: bold; }
.answer-en {
  color: #888;
  font-size: 0.9em;
  margin-top: 4px;
}

@media screen and (max-width: 768px) {
  .entertainment-card {
    padding: 12px 8px 8px 8px;
  }
  .ent-row {
    gap: 8px;
  }
  .ent-block {
    padding: 8px 6px;
  }
  .ent-btn {
    padding: 6px 12px;
    font-size: 0.9em;
  }
  .ent-result {
    font-size: 0.9em;
  }
}
</style> 