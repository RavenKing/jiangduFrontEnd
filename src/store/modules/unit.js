export default {
    namespaced: true,
    state: {
     unit:[],
     unitBasic:[]
    },
    mutations: {
      // 设置分页大小
      SET_UNIT(state, data) {
        state.unit = data;
      },
      SET_UNITBASIC(state, data) {
        state.unitBasic = data;
      },
    },
    actions: {
      // 设置分页大小
      setUnit({ commit }, data) {
        commit('SET_UNIT', data)
      },
      setUnitBASIC({ commit }, data) {
        commit('SET_UNITBASIC', data)
      }
    }
  }
  