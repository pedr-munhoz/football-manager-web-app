<template>
  <v-card>
    <v-card-title>{{ game.homeTeam }} vs {{ game.awayTeam }}</v-card-title>
  </v-card>
</template>

<script>
import GamesService from '@/services/GamesService';

export default {
  name: 'GameLogPage',

  data: () => ({
    loaded: false,
    game: {
      homeTeam: '',
      awayTeam: '',
    },
  }),

  computed: {
    title() {
      if (this.loaded) return `${this.game.homeTeam} vs ${this.game.awayTeam}`;

      return 'Loading...';
    },
  },

  mounted() {
    this.load();
  },

  methods: {
    load() {
      const service = new GamesService();
      service.Find(this.$route.params.id).then((response) => {
        this.game = response.data;
        this.loaded = true;
      });
    },
  },
};
</script>

<style>
</style>