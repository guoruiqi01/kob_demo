<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
    <div class="container-fluid" style="margin-left: 10%">
      <router-link class="navbar-brand" href="#" :to="{ name: 'home' }"
        >King of Bot</router-link
      >
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarText"
        aria-controls="navbarText"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav" style="margin-right: 75%">
          <li class="nav-item">
            <router-link
              :class="route_name == 'pk_index' ? 'nav-link active' : 'nav-link'"
              aria-current="page"
              href="#"
              :to="{ name: 'pk_index' }"
              >对战</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              :class="
                route_name == 'ranklist_index' ? 'nav-link active' : 'nav-link'
              "
              href="#"
              :to="{ name: 'ranklist_index' }"
              >排行榜</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              :class="
                route_name == 'record_index' ? 'nav-link active' : 'nav-link'
              "
              href="#"
              :to="{ name: 'record_index' }"
              >对局记录</router-link
            >
          </li>
        </ul>
        <ul class="navbar-nav" v-if="$store.state.user.is_login">
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {{ $store.state.user.username }}
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li>
                <router-link
                  class="dropdown-item"
                  href="#"
                  :to="{ name: 'user_bot_index' }"
                  >我的Bot</router-link
                >
              </li>
              <li><hr class="dropdown-divider" /></li>
              <li @click="logout">
                <a class="dropdown-item" href="#">退出</a>
              </li>
            </ul>
          </li>
        </ul>

        <ul class="navbar-nav" v-else-if="$store.state.user.show_content">
          <li class="nav-item">
            <router-link
              class="nav-link"
              :to="{ name: 'user_account_login' }"
              role="button"
            >
              登录
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              :to="{ name: 'user_account_register' }"
              role="button"
            >
              注册
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { useRoute } from "vue-router";
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    const route = useRoute();
    let route_name = computed(() => route.name);

    const logout = () => {
      store.dispatch("logout");
    };

    return {
      route_name,
      logout,
    };
  },
};
</script>

<style scoped>
</style>