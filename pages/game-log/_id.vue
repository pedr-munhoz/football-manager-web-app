<template>
  <v-card>
    <v-card-title>{{ title }}</v-card-title>
    <v-card-subtitle v-if="loaded">{{ subtitle }}</v-card-subtitle>
  </v-card>
</template>

<script>
import GamesService from '@/services/GamesService';

export default {
  name: 'GameLogPage',

  data: () => ({
    loaded: false,
    game: null,
  }),

  computed: {
    title() {
      if (this.loaded) return `${this.game.homeTeam} vs ${this.game.awayTeam}`;

      return 'Loading...';
    },
    subtitle() {
      if (this.loaded)
        return `${this.game.location}, ${this.formatDate(this.game.date)}`;

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
    formatDate(dateToBeFormatted) {
      const date = new Date(dateToBeFormatted);
      return new Intl.DateTimeFormat('default', {
        dateStyle: 'full',
      }).format(date);
    },
  },
};
</script>

<style>
</style>