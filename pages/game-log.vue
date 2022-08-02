<template>
  <v-card>
    <v-card-title>
      <v-container>
        <v-row>
          <v-col>Game log</v-col>
          <v-col>
            <game-dialog :edit-mode="false" @confirm="create($event)" />
          </v-col>
        </v-row>
      </v-container>
    </v-card-title>
    <v-data-table
      :headers="dataTable.headers"
      :items="players"
      :options.sync="options"
      :loading="loading"
      :server-items-length="playerCount"
    >
      <template #item.date="{ item }">
        {{ formatDate(item.date) }}
      </template>
      <template #item.edit="{ item }">
        <game-dialog
          :old-date="item.date"
          :old-home-team="item.homeTeam"
          :old-away-team="item.awayTeam"
          :old-location="item.location"
          edit-mode
          @confirm="update(item, $event)"
        />
      </template>
      <template #item.delete="{ item }">
        <v-icon icon @click="deleteItem(item)"> mdi-delete-outline </v-icon>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import GamesService from '@/services/GamesService';
import GameDialog from '@/components/GameDialog.vue';

export default {
  components: {
    GameDialog,
  },

  data: () => ({
    dataTable: {
      headers: [
        { text: 'Date', value: 'date' },
        { text: 'Home Team', value: 'homeTeam' },
        { text: 'Away Team', value: 'awayTeam' },
        { text: 'Location', value: 'location' },
        { text: 'Edit', value: 'edit' },
        { text: 'Delete', value: 'delete' },
      ],
    },
    players: [],
    playerCount: 0,
    info: null,
    options: {
      itemsPerPage: 5,
    },
    loading: false,
  }),

  computed: {
    fields() {
      return this.players;
    },
  },

  watch: {
    options: {
      handler() {
        this.load();
      },
      deep: true,
    },
  },

  methods: {
    update(item, event) {
      item.date = event.date;
      item.homeTeam = event.homeTeam;
      item.awayTeam = event.awayTeam;
      item.location = event.location;
      this.updateItem(item);
    },

    updateItem(item) {
      const service = new GamesService();
      service.Update(item).finally((response) => this.load());
    },

    create(event) {
      const service = new GamesService();
      service.Create(event).finally((response) => this.load());
    },

    deleteItem(item) {
      const service = new GamesService();
      service.Delete(item.id).finally((response) => this.load());
    },

    load() {
      this.loading = true;
      const index = this.options.itemsPerPage * (this.options.page - 1);
      const length = this.options.itemsPerPage;

      const service = new GamesService();
      service
        .List(index, length)
        .then((response) => {
          this.players = response.data.itens;
          this.playerCount = response.data.count;
        })
        .finally(() => (this.loading = false));
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

<style lang="scss" scoped>
</style>