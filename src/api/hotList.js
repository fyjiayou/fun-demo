import axios from 'axios'

// 创建axios实例
const request = axios.create({
  baseURL: 'https://60s-api.viki.moe',
  timeout: 5000
})

// B站热搜
export const getBilibiliHot = async () => {
  try {
    const response = await request.get('/v2/bili')
    // 处理返回的数据，确保返回格式统一
    return response.data.data.map((item, index) => ({
      title: item.title,
      hot: 0, // 新API没有热度数据
      url: item.link // 使用link作为url
    }))
  } catch (error) {
    console.error('获取B站热搜失败:', error)
    return []
  }
}

// 微博热搜
export const getWeiboHot = async () => {
  try {
    const response = await request.get('/v2/weibo')
    return response.data.data.map((item) => ({
      title: item.title,
      hot: item.hot_value, // 使用hot_value作为热度值
      url: item.link
    }))
  } catch (error) {
    console.error('获取微博热搜失败:', error)
    return []
  }
}

// 知乎热榜
export const getZhihuHot = async () => {
  try {
    const response = await request.get('/v2/zhihu')
    return response.data.data.map((item) => {
      // 修正知乎链接为 https://zhihu.com/question/xxx
      let url = item.link
      const match = url.match(/questions\/(\d+)/)
      if (match) {
        url = `https://zhihu.com/question/${match[1]}`
      }
      return {
        title: item.title,
        hot: parseInt(item.hot_value_desc) || 0, // 从热度描述中提取数字
        url,
        answerCount: item.answer_cnt, // 添加回答数
        followerCount: item.follower_cnt, // 添加关注数
        createdAt: item.created_at // 添加创建时间
      }
    })
  } catch (error) {
    console.error('获取知乎热榜失败:', error)
    return []
  }
}

// 抖音热搜
export const getDouyinHot = async () => {
  try {
    const response = await request.get('/v2/douyin')
    return response.data.data.map((item) => ({
      title: item.title,
      hot: item.hot_value,
      url: item.link,
      eventTime: item.event_time,
      cover: item.cover
    }))
  } catch (error) {
    console.error('获取抖音热搜失败:', error)
    return []
  }
}

// 头条热搜
export const getToutiaoHot = async () => {
  try {
    const response = await request.get('/v2/toutiao')
    return response.data.data.map((item) => ({
      title: item.title,
      hot: item.hot_value,
      url: item.link,
      cover: item.cover
    }))
  } catch (error) {
    console.error('获取头条热搜失败:', error)
    return []
  }
}

// 猫眼票房
export const getMaoyanHot = async () => {
  try {
    const response = await request.get('/v2/maoyan')
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

export const getSixtySeconds = async () => {
  const res = await fetch('https://60s-api.viki.moe/v2/60s')
  const json = await res.json()
  return json.data
} 