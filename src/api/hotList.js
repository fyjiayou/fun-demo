import axios from 'axios'

// 创建axios实例
const request = axios.create({
  baseURL: '/api',
  timeout: 5000
})

// B站热搜
export const getBilibiliHot = async () => {
  try {
    const response = await request.get('/bilibili?cache=true')
    return {
      list: response.data.data.map((item) => ({
        title: item.title,
        hot: item.hot || 0,
        url: item.url,
        mobileUrl: item.mobileUrl
      })),
      updateTime: response.data.updateTime || new Date().toISOString()
    }
  } catch (error) {
    console.error('哔哩哔哩热榜:', error)
    return { list: [], updateTime: null }
  }
}

// 微博热搜
export const getWeiboHot = async () => {
  try {
    const response = await request.get('/weibo?cache=true')
    return {
      list: response.data.data.map((item) => ({
        title: item.title,
        hot: item.hot,
        url: item.url,
        mobileUrl: item.mobileUrl
      })),
      updateTime: response.data.updateTime
    }
  } catch (error) {
    console.error('获取微博热搜失败:', error)
    return { list: [], updateTime: null }
  }
}

// 知乎热榜
export const getZhihuHot = async () => {
  try {
    const response = await request.get('/zhihu?cache=true')
    return {
      list: response.data.data.map((item) => ({
        title: item.title,
        hot: parseInt(item.hot_value_desc) || 0,
        url: item.url,
        mobileUrl: item.mobileUrl,
        answerCount: item.answer_cnt,
        followerCount: item.follower_cnt,
        createdAt: item.created_at
      })),
      updateTime: response.data.updateTime || new Date().toISOString()
    }
  } catch (error) {
    console.error('获取知乎热榜失败:', error)
    return { list: [], updateTime: null }
  }
}

// 抖音热搜
export const getDouyinHot = async () => {
  try {
    const response = await request.get('/douyin?cache=true')
    return {
      list: response.data.data.map((item) => ({
        title: item.title,
        hot: item.hot,
        url: item.url,
        mobileUrl: item.mobileUrl,
        eventTime: item.event_time,
        cover: item.cover
      })),
      updateTime: response.data.updateTime || new Date().toISOString()
    }
  } catch (error) {
    console.error('获取抖音热榜失败:', error)
    return { list: [], updateTime: null }
  }
}

// 头条热搜
export const getToutiaoHot = async () => {
  try {
    const response = await request.get('/toutiao?cache=true')
    return {
      list: response.data.data.map((item) => ({
        title: item.title,
        hot: item.hot,
        url: item.url,
        mobileUrl: item.mobileUrl,
        cover: item.cover
      })),
      updateTime: response.data.updateTime || new Date().toISOString()
    }
  } catch (error) {
    console.error('获取头条热榜失败:', error)
    return { list: [], updateTime: null }
  }
}

// 猫眼票房
export const getMaoyanHot = async () => {
  try {
    const response = await request.get('/maoyan?cache=true')
    // 处理返回的数据，确保返回格式统一
    return response.data.data.list.map((item) => ({
      title: `${item.movie_name} (${item.release_year})`,
      hot: item.box_office,
      url: `https://www.maoyan.com/films/${item.move_maoyan_id}`,
      boxOffice: item.box_office_desc // 添加票房描述字段
    }))
  } catch (error) {
    console.error('获取猫眼票房失败:', error)
    return []
  }
}

// 历史上的今天
export const getTodayInHistory = async () => {
  try {
    const response = await request.get('/history?cache=true')
    // 处理返回的数据，确保返回格式统一
    return {
      list: response.data.data.map((item) => ({
        title: item.title,
        hot: item.box_office,
        id: item.id,
        url: item.url,
        mobileUrl: item.mobileUrl
      })),
      type: response.data.type
    }
  } catch (error) {
    console.error('获取历史上的今日失败:', error)
    return []
  }
}

export const getSixtySeconds = async () => {
  const res = await fetch('https://60s-api.viki.moe/v2/60s')
  const json = await res.json()
  return json.data
}
