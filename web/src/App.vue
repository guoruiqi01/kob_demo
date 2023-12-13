<template>
  <NavBar />
  <router-view />
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import $ from "jquery";

export default {
  components: {
    NavBar,
  },
  setup() {
    $.ajax({
      url: "http://localhost:3000/user/account/token/",
      type: "post",
      data: {
        username: "grq",
        password: "pgrq",
      },
      success(resp) {
        console.log(resp);
      },
      error(resp) {
        console.log(resp);
      },
    }),
      $.ajax({
        url: "http://localhost:3000/user/account/info/",
        type: "get",
        headers: {
          Authorization:
            "Bearer " +
            "eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI2ZjZiZDg1ZTAzNWQ0ZWM5OWI3YWM2YzllMjNhN2NmYiIsInN1YiI6IjEiLCJpc3MiOiJzZyIsImlhdCI6MTcwMjQ2MDQxNSwiZXhwIjoxNzAzNjcwMDE1fQ.XFbWhkml9rV5AAW0fY6N1ziMZ8M0xCr17EuaNNWe9v4",
        },
        success(resp) {
          console.log(resp);
        },
        error(resp) {
          console.log(resp);
        },
      });
  },
};
</script>

<style>
body {
  background-image: url("@/assets/images/background.png");
  background-size: cover;
}
</style>
