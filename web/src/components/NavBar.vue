<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
    <div class="container-fluid" style="margin-left: 10%">
      <!-- <a class="navbar-brand" href="#">King of Bot</a> -->
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
            <!-- <a class="nav-link" aria-current="page" href="#">对战</a> -->
            <router-link
              class="nav-link"
              aria-current="page"
              href="#"
              :to="{ name: 'pk_index' }"
              >对战</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              href="#"
              :to="{ name: 'ranklist_index' }"
              >对局列表</router-link
            >
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">排行榜</a>
          </li>
        </ul>
        <ul class="navbar-nav">
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              guoruiqi
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li><a class="dropdown-item" href="#">我的Bot</a></li>
              <li><hr class="dropdown-divider" /></li>
              <li><a class="dropdown-item" href="#">退出</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {};
</script>

<style scoped>
</style>