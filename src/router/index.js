import { createRouter, createWebHistory } from 'vue-router'
import HotList from '../views/HotList.vue'

const routes = [
  {
    path: '/',
    name: 'HotList',
    component: HotList
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router 