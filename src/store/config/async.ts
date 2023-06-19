import { getConfig } from '@/request/api'
import configStore from './slice'

async function fetchConfig() {
  // const res = await getConfig()
  const res = {
    code: 0,
    data: {
      shop_introduce: '<p><br></p>',
      user_introduce: '<p><br></p>',
      notifications: [],
      website_title: 'ChatGpt',
      website_description: '我是一个基于OpenAI的ChatGpt应用。',
      website_keywords: 'Openai,chat,Gpt,AI',
      website_logo: 'https://u1.dl0.cn/icon/openailogo.svg',
      website_footer: '',
      invite_introduce: '<h1>你好</h1>'
    },
    message: ''
  }
  if (!res.code) {
    configStore.getState().replaceData(res.data)
  }
  return res
}

export default {
  fetchConfig
}
