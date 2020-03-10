export default {
    namespaced: true, // 区分命名空间
    state: {
     name:''
    },
    getters: {
      getName: state => {
        state.name = localStorage.getItem('name')
        return state.name
      }
    },
    mutations: {
      setName(state, value) {
        state.name = value
        localStorage.setItem('name',value);
      }
    }
  }
  