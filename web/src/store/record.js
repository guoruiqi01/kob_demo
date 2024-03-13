
export default{
  state: {
    is_record: false,
    a_step: "",
    b_step: "",
    record_loser: "",

  },
  // 一般用不到
  getters: {
  },
  // 用来修改数据（辅助函数）
  mutations: {
    updateIsRecord(state, is_record) {
      state.is_record = is_record;
    },
    updateSteps(state, data) { // update方法只能传一个参数
      state.a_steps = data.a_steps;
      state.b_steps = data.b_steps;
    },
    updateRecordLoser(state, loser) {
      state.record_loser = loser;
    }
  },
  // 这里还是辅助函数
  actions: {
  },
  modules: {
  }
}