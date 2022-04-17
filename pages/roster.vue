<template>
  <v-card>
    <v-card-title>
      <v-container>
        <v-row>
          <v-col>Roster</v-col>
          <v-col>
            <player-dialog :edit-mode="false" @confirm="create($event)" />
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
      <template #item.quarterback="{ item }">
        <v-simple-checkbox
          v-model="item.quarterback"
          @input="updateItem(item)"
        />
      </template>
      <template #item.runningBack="{ item }">
        <v-simple-checkbox
          v-model="item.runningBack"
          @input="updateItem(item)"
        />
      </template>
      <template #item.tightEnd="{ item }">
        <v-simple-checkbox v-model="item.tightEnd" @input="updateItem(item)" />
      </template>
      <template #item.reciever="{ item }">
        <v-simple-checkbox v-model="item.reciever" @input="updateItem(item)" />
      </template>
      <template #item.edit="{ item }">
        <player-dialog
          :old-name="item.name"
          :old-number="item.number"
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
import axios from 'axios';
import PlayerDialog from '@/components/PlayerDialog.vue';

export default {
  components: {
    PlayerDialog,
  },

  data: () => ({
    dataTable: {
      headers: [
        { text: '#', value: 'number' },
        { text: 'Name', value: 'name' },
        { text: 'QB', value: 'quarterback' },
        { text: 'RB', value: 'runningBack' },
        { text: 'TE', value: 'tightEnd' },
        { text: 'WR', value: 'reciever' },
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

  mounted() {
    this.load();
  },

  methods: {
    update(item, event) {
      item.number = event.number;
      item.name = event.name;
      this.updateItem(item);
    },

    updateItem(item) {
      axios
        .put('http://localhost:8090/api/v1/Athletes', item)
        .finally((response) => this.load());
    },

    create(event) {
      axios
        .post('http://localhost:8090/api/v1/Athletes', event)
        .finally((response) => this.load());
    },

    deleteItem(item) {
      axios
        .delete(`http://localhost:8090/api/v1/Athletes/${item.id}`)
        .finally((response) => this.load());
    },

    load() {
      this.loading = true;
      axios
        .get(
          `http://localhost:8090/api/v1/Athletes?length=${
            this.options.itemsPerPage
          }&index=${this.options.itemsPerPage * (this.options.page - 1)}`
        )
        .then((response) => {
          this.players = response.data.itens;
          this.playerCount = response.data.count;
        })
        .finally(() => (this.loading = false));
    },
  },
};
</script>

<style>
</style>