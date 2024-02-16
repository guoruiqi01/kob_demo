<template>
  <div class="container">
    <div class="row">
      <div class="col-3">
        <div class="card" style="margin-top: 20px">
          <div class="card-body">
            <img :src="$store.state.user.photo" alt="" style="width: 100%" />
          </div>
        </div>
      </div>
      <div class="col-9">
        <div class="card" style="margin-top: 20px">
          <div class="card-header">
            <span style="font-size: 130%">我的Bot</span>
            <button
              type="button"
              class="btn btn-primary float-end"
              style="width: 100px"
            >
              创建Bot
            </button>
          </div>
          <div class="card-body">
            <table class="table table-striped table-hover">
              <thead>
                <tr>
                  <th>Bot名称</th>
                  <th>创建时间</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="bot in bots" :key="bot.id">
                  <td>{{ bot.title }}</td>
                  <td>{{ bot.createtime }}</td>
                  <td>
                    <button
                      type="button"
                      class="btn btn-secondary"
                      style="width: 100px; margin-right: 50px"
                    >
                      修改
                    </button>
                    <button
                      type="button"
                      class="btn btn-danger"
                      style="width: 100px"
                    >
                      删除
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import { useStore } from "vuex";
import { ref } from "vue";
export default {
  components: {},
  setup() {
    const store = useStore();

    let bots = ref([]);

    const refresh_bots = () => {
      $.ajax({
        url: "http://localhost:3000/user/bot/getlist/",
        type: "get",
        headers: {
          Authorization: "Bearer " + store.state.user.token,
        },
        success(resp) {
          bots.value = resp;
        },
      });
    };

    refresh_bots();

    return {
      bots,
    };

    // $.ajax({
    //   url: "http://localhost:3000/user/bot/add/",
    //   type: "post",
    //   data: {
    //     title: "Bot的标题",
    //     content: "Bot的内容",
    //     description: "Bot的描述",
    //   },
    //   headers: {
    //     Authorization: "Bearer " + store.state.user.token,
    //   },
    //   success(resp) {
    //     console.log(resp);
    //   },
    //   error(resp) {
    //     console.log(resp);
    //   },
    // });
    // $.ajax({
    //   url: "http://localhost:3000/user/bot/remove/",
    //   type: "post",
    //   data: {
    //     bot_id: 3,
    //   },
    //   headers: {
    //     Authorization: "Bearer " + store.state.user.token,
    //   },
    //   success(resp) {
    //     console.log(resp);
    //   },
    //   error(resp) {
    //     console.log(resp);
    //   },
    // });
    // $.ajax({
    //   url: "http://localhost:3000/user/bot/update/",
    //   type: "post",
    //   data: {
    //     bot_id: 5,
    //     title: "Bot的标题2",
    //     content: "Bot的内容2",
    //     description: "Bot的描述2",
    //   },
    //   headers: {
    //     Authorization: "Bearer " + store.state.user.token,
    //   },
    //   success(resp) {
    //     console.log(resp);
    //   },
    //   error(resp) {
    //     console.log(resp);
    //   },
    // });
    // $.ajax({
    //   url: "http://localhost:3000/user/bot/getlist/",
    //   type: "get",
    //   headers: {
    //     Authorization: "Bearer " + store.state.user.token,
    //   },
    //   success(resp) {
    //     console.log(resp);
    //   },
    //   error(resp) {
    //     console.log(resp);
    //   },
    // });
  },
};
</script>

<style scoped>
</style>