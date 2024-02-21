export default{
  state: {
    status: "matching",
    socket: null,
    opponent_username: "",
    opponent_photo: "",
    gamemap: null,
  },
  // 一般用不到
  getters: {
  },
  // 用来修改数据（辅助函数）
  mutations: {
    updateSocket(state, socket) {
      state.socket = socket;
    },
    updateOpponent(state, opponent) {
      state.opponent_username = opponent.username;
      state.opponent_photo = opponent.photo;
    },
    updateStatus(state, status) {
      state.status = status;
    },
    updateGamemap(state, gamemap) {
      state.gamemap = gamemap;
    }
  },
  // 这里还是辅助函数
  actions: {
  },
  modules: {
  }
}