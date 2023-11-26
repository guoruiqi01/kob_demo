<template>
  <div ref="parent" class="gamemap">
    <canvas ref="canvas" tabindex="0"></canvas>
  </div>
</template>

<script>
// 调试那么久竟然是import GameMap 和 import { GameMap } 的区别
import { GameMapObject } from "../assets/scripts/GameMapObject";
import { ref, onMounted } from "vue";

export default {
  setup() {
    let parent = ref(null);
    let canvas = ref(null);

    onMounted(() => {
      new GameMapObject(canvas.value.getContext("2d"), parent.value);
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