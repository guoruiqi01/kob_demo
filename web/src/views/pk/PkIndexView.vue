<template>
  <PlayGround v-if="$store.state.pk.status === 'playing'" />
  <MatchGround v-if="$store.state.pk.status === 'matching'" />
</template>

<script>
import PlayGround from "@/components/PlayGround";
import MatchGround from "@/components/MatchGround";
import { onMounted, onUnmounted } from "vue";
import { useStore } from "vuex";
export default {
  components: {
    PlayGround,
    MatchGround,
  },
  setup() {
    const store = useStore();
    const socketUrl = `ws://localhost:3000/websocket/${store.state.token}/`;

    let socket = null;
    onMounted(() => {
      store.commit("updateOpponent", {
        username: "我的对手",
        photo:
          "https://cdn.acwing.com/media/article/image/2022/08/09/1_1db2488f17-anonymous.png",
      });

      socket = new WebSocket(socketUrl);

      socket.onopen = () => {
        console.log("connected!");
      };

      socket.onmessage = (msg) => {
        const data = JSON.parse(msg.data);
        console.log(data);
      };

      socket.onclose = () => {
        console.log("disconnected!");
      };
    });

    onUnmounted(() => {
      socket.close();
    });
  },
};
</script>

<style>
</style>