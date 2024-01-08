<template>
  <ContentField v-if="$store.state.user.show_content">
    <div class="row justify-content-md-center">
      <div class="col-3">
        <form @submit.prevent="login">
          <div class="mb-3">
            <label for="username" class="form-label">用户名</label>
            <input
              v-model="username"
              type="text"
              class="form-control"
              id="username"
              placeholder="请输入用户名"
            />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">密码</label>
            <input
              v-model="password"
              type="password"
              class="form-control"
              id="password"
              placeholder="请输入密码"
            />
          </div>
          <div class="error-message">{{ error_message }}</div>
          <button type="submit" class="btn btn-primary">提交</button>
        </form>
      </div>
    </div>
  </ContentField>
</template>

<script>
import { useStore } from "vuex";
import { ref } from "vue";
import router from "../../../router/index";
import ContentField from "@/components/ContentField";
export default {
  components: {
    ContentField,
  },
  setup() {
    let store = useStore();
    let username = ref("");
    let password = ref("");
    let error_message = ref("");

    // 每次重定向到登录页面时，进行jwt_token判断，如果localstorage里有值则利用值进行登录并进行跳转
    const jwt_token = localStorage.getItem("jwt_token");
    if (jwt_token) {
      store.commit("updateToken", jwt_token);
      store.dispatch("getinfo", {
        success() {
          router.push({ name: "home" });
          store.commit("updateShowContent", false); // 登录验证成功，不展示了
        },
        error() {
          store.commit("updateShowContent", true); // 其他情况一律修改变量，进行展示
        },
      });
    } else {
      store.commit("updateShowContent", true);
    }

    const login = () => {
      error_message.value = "";
      store.dispatch("login", {
        username: username.value,
        password: password.value,
        success() {
          store.dispatch("getinfo", {
            success() {
              router.push({ name: "home" });
              console.log(store.state.user);
            },
          });
        },
        error() {
          error_message.value = "用户名或密码错误";
        },
      });
    };

    return {
      username,
      password,
      error_message,
      login,
    };
  },
};
</script>

<style>
button {
  width: 100%;
}

div.error-message {
  color: red;
}
</style>