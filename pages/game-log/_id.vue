<template>
  <v-card>
    <v-card-title>{{ title }}</v-card-title>
    <v-card-subtitle v-if="loaded">{{ subtitle }}</v-card-subtitle>
    <v-card-text v-if="loaded">
      <v-list>
        <v-list-group
          v-for="(item, index) in sections"
          :key="index"
          prepend-icon="mdi-account-group"
          no-action
        >
          <template #activator>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item v-for="athlete in game.athletes" :key="athlete.id">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                {{ athlete.name }} #{{ athlete.number }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
import GamesService from '@/services/GamesService';

export default {
  name: 'GameLogPage',

  data: () => ({
    loaded: false,
    game: null,
    sections: [{ title: 'Athletes' }],
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