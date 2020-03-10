export default {
  namespaced: true, // 区分命名空间
  state: {
    showPersonalData: false, // 个人资料对话框显示状态
    userInfo: {}, // 用户信息
    avatar: '' // 用户头像
  },
  getters: {
    getShowPersonalData: state => {
      return state.showPersonalData
    },
    getAvatar: state => {
      return state.avatar
    },
    getUserInfo: state => {
      state.userInfo = JSON.parse(localStorage.getItem('userInfo'))
      return state.userInfo
    }
  },
  mutations: {
    setShowPersonalData(state, value) {
      state.showPersonalData = value
    },
    setAvatar(state, data) {
      console.log(data)
      state.avatar = data
    },
    setUserInfo(state, data) {
      console.log(data)
      localStorage.setItem('userInfo', JSON.stringify(data))
      state.userInfo = data
    }
  }
}
