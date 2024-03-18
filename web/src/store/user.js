import $ from 'jquery'

export default{
  state: {
    id: "",
    username: "",
    photo: "",
    token: "",
    is_login: false,
    show_content: false,
  },
  // 一般用不到
  getters: {
  },
  // 用来修改数据（辅助函数）
  mutations: {
    updateUser(state, user) {
      state.id = user.id;
      state.username = user.username;
      state.photo = user.photo;
      state.is_login = user.is_login;
    },
    updateToken(state, token) {
      state.token = token;
    },
    logout(state) {
      state.id = "",
      state.username = "",
      state.photo = "",
      state.is_login = false;
    },
    updateShowContent(state, show_content) {
      state.show_content = show_content;
    }
  },
  // 这里还是辅助函数
  actions: {
    login(context, data) {
      $.ajax({
        url: "https://app2580.acapp.acwing.com.cn/api/user/account/token/",
        type: "post",
        data: {
          username: data.username,
          password: data.password,
        },
        // 调用后端这个接口返回的字典验证信息为{"error_message": "success", "token": jwt}
        // 如果登录反正出错，后端会直接报错，不再返回字典
        success(resp) {
          if (resp.error_message === "success") {
            localStorage.setItem("jwt_token", resp.token); // 登录持久化操作
            context.commit("updateToken", resp.token);
            data.success();
          } else {
            data.error();
          }
        },
        error() {
          data.error();
        }
      })
    },
    getinfo(context, data) {
      $.ajax({
        url: "https://app2580.acapp.acwing.com.cn/api/user/account/info/",
        type: "get",
        headers: {
          Authorization:
            "Bearer " + context.state.token,
        },
        // 如果通过token正确查询到用户
        // resp是后端返回的数据，字典验证信息为
        // {"error_message": "success", "id": "", "username": "", "photo": ""}
        success(resp) { // 这个success()是ajax的
          if (resp.error_message === "success") {
            context.commit("updateUser", {
              ...resp,
              is_login: true,
            });
            // 这里的data.success是组件在调用时编写的具体回调函数
            data.success(resp); // 这个是调用时在{}内编写的
          } else {
            data.error(resp);
          }
        },
        error(resp) {
          data.error(resp);
        },
      });
    },
    logout(context) {
      localStorage.removeItem("jwt_token"); // 退出时将其删掉
      context.commit("logout");
    }
  },
  modules: {
  }
}