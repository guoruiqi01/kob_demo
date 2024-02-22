<template>
  <div ref="parent" class="gamemap">
    <canvas ref="canvas" tabindex="0"></canvas>
  </div>
</template>

<script>
// 调试那么久竟然是import GameMap 和 import { GameMap } 的区别
import { GameMapObject } from "../assets/scripts/GameMapObject";
import { ref, onMounted } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    let parent = ref(null);
    let canvas = ref(null);

    // 主体仍然是div->canvas，但是用GameMapObject来控制其fillRect逻辑
    onMounted(() => {
      store.commit(
        "updateGameObject",
        new GameMapObject(canvas.value.getContext("2d"), parent.value, store)
      );
    });

    return {
      parent,
      canvas,
    };
  },
};
</script>

<style>
div.gamemap {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>