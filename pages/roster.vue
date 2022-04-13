<template>
  <v-card>
    <v-card-title>
      <v-container>
        <v-row>
          <v-col>Roster</v-col>
          <v-col>
            <player-dialog :edit-mode="false" @confirm="create($event)" />
          </v-col>
          <v-col>
            <v-text-field
              v-model="dataTable.search"
              label="Search"
              outlined
              append-icon="mdi-magnify"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-card-title>
    <v-data-table
      :headers="dataTable.headers"
      :items="players"
      :search="dataTable.search"
    >
      <template #item.isQb="{ item }">
        <v-simple-checkbox v-model="item.isQb" />
      </template>
      <template #item.isRb="{ item }">
        <v-simple-checkbox v-model="item.isRb" />
      </template>
      <template #item.isTe="{ item }">
        <v-simple-checkbox v-model="item.isTe" />
      </template>
      <template #item.isWr="{ item }">
        <v-simple-checkbox v-model="item.isWr" />
      </template>
      <template #item.edit="{ item }">
        <player-dialog
          :old-name="item.name"
          :old-number="item.number"
          edit-mode
          @confirm="update(item, $event)"
        />
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
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
        { text: 'QB', value: 'isQb' },
        { text: 'RB', value: 'isRb' },
        { text: 'TE', value: 'isTe' },
        { text: 'WR', value: 'isWr' },
        { text: 'Edit', value: 'edit' },
      ],
      search: '',
    },
    players: [],
  }),

  computed: {
    fields() {
      return this.players;
    },
  },

  methods: {
    update(item, event) {
      item.number = event.number;
      item.name = event.name;
    },

    create(event) {
      const newPlayer = {
        id: this.players.length + 1,
        number: event.number,
        name: event.name,
        isQb: false,
        isRb: false,
        isTe: false,
        isWr: false,
      };
      this.players.push(newPlayer);
    },
  },
};
</script>

<style>
</style>