<template>
  <v-card>
    <v-card-title>Game specific page: {{ gameId }}</v-card-title>
  </v-card>
</template>

<script>
export default {
  name: 'GameLogPage',
  data: () => ({
    gameId: null,
  }),
  mounted() {
    this.gameId = this.$route.params.id;
  },
};
</script>

<style>
</style>