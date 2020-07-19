export default {
    namespaced: true,
    state: {
     unit:[]
    },
    mutations: {
      // 设置分页大小
      SET_UNIT(state, data) {
        state.unit = data;
      },
    },
    actions: {
      // 设置分页大小
      setUnit({ commit }, data) {
        commit('SET_UNIT', data)
      }
    }
  }
  