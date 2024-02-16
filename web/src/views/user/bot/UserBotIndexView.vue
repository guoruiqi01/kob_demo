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
              data-bs-toggle="modal"
              data-bs-target="#add-bot-btn"
            >
              创建Bot
            </button>

            <!-- Modal -->
            <div class="modal fade" id="add-bot-btn" tabindex="-1">
              <div class="modal-dialog modal-xl">
                <div class="modal-content">
                  <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">
                      创建Bot
                    </h1>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="modal-body">
                    <form>
                      <div class="mb-3">
                        <label for="add-bot-title" class="form-label"
                          >名称</label
                        >
                        <input
                          type="text"
                          class="form-control"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          placeholder="请输入Bot名称"
                          v-model="addbot.title"
                        />
                      </div>
                      <div class="mb-3">
                        <label for="add-bot-description" class="form-label"
                          >简介</label
                        >
                        <textarea
                          type="password"
                          class="form-control"
                          id="add-bot-description"
                          placeholder="请输入Bot简介"
                          rows="3"
                          v-model="addbot.description"
                        />
                      </div>
                      <div class="mb-3">
                        <label for="add-bot-description" class="form-label"
                          >代码</label
                        >
                        <textarea
                          type="password"
                          class="form-control"
                          id="add-bot-description"
                          placeholder="请输入Bot代码"
                          rows="8"
                          v-model="addbot.content"
                        />
                      </div>
                    </form>
                  </div>
                  <div class="modal-footer">
                    <div class="error-message">{{ addbot.error_message }}</div>
                    <button
                      @click="add_bot"
                      type="button"
                      class="btn btn-primary"
                      style="width: 100px"
                    >
                      创建
                    </button>
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-bs-dismiss="modal"
                      style="width: 100px"
                    >
                      取消
                    </button>
                  </div>
                </div>
              </div>
            </div>
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
import { ref, reactive } from "vue";
import { Modal } from "bootstrap/dist/js/bootstrap";
export default {
  components: {},
  setup() {
    const store = useStore();

    let bots = ref([]);

    const addbot = reactive({
      title: "",
      description: "",
      content: "",
      error_message: "",
    });

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

    const add_bot = () => {
      addbot.error_message = "";
      $.ajax({
        url: "http://localhost:3000/user/bot/add/",
        type: "post",
        data: {
          title: addbot.title,
          description: addbot.description,
          content: addbot.content,
        },
        headers: {
          Authorization: "Bearer " + store.state.user.token,
        },
        success(resp) {
          if (resp.error_message === "success") {
            addbot.title = "";
            addbot.description = "";
            addbot.content = "";
            Modal.getInstance("#add-bot-btn").hide();
            refresh_bots();
          } else {
            addbot.error_message = resp.error_message;
          }
        },
      });
    };

    refresh_bots();

    return {
      bots,
      addbot,
      add_bot,
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