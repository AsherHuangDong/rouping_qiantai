export default {
  namespaced: true, // 区分命名空间
  state: {
    params: {}, // 所传的参数，一般包括url和Id
    successShow: false, // 成功的提示
    failedShow: false, // 失败的提示
    successText: '',
    failedText: '',
    failedText2: ''
  },
  getters: {
    getParams: state => {
      return state.params
    },
    getSuccessShow: state => {
      return state.successShow
    },
    getFailedShow: state => {
      return state.failedShow
    },
    getSuccessText: state => {
      return state.successText
    },
    getFailedText: state => {
      return state.failedText
    },
    getFailedText2: state => {
      return state.failedText2
    }
  },
  mutations: {
    setParams(state, value) {
      state.params = value
    },
    setSuccessShow(state, value) {
      state.successShow = value
    },
    setFailedShow(state, value) {
      state.failedShow = value
    },
    setSuccessText(state, value) {
      state.successText = value
    },
    setFailedText(state, value) {
      state.failedText = value
    },
    setFailedText2(state, value) {
      state.failedText2 = value
    }
  }
}
