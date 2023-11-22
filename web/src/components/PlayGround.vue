<template>
  <div class="play-ground">
    <GameMap />
  </div>
</template>

<script>
import GameMap from "@/components/GameMap.vue";
export default {
  components: {
    GameMap,
  },
};
</script>

<style>
div.play-ground {
  width: 60vw;
  height: 70vh;
  background-color: lightblue;
  margin: 40px auto;
}
</style>