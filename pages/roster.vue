/* eslint-disable vue/valid-v-slot */
<template>
  <v-card>
    <v-card-title>
      <v-container>
        <v-row>
          <v-col>Roster</v-col>
          <v-col />
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
      :items="fields"
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
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    dataTable: {
      headers: [
        { text: '#', value: 'number' },
        { text: 'Name', value: 'name' },
        { text: 'QB', value: 'isQb' },
        { text: 'RB', value: 'isRb' },
        { text: 'TE', value: 'isTe' },
        { text: 'WR', value: 'isWr' },
      ],
      search: '',
    },
  }),

  computed: {
    fields() {
      return [
        {
          id: '1',
          number: '8',
          name: 'José Mombelli Jr',
          isQb: true,
          isRb: false,
          isTe: false,
          isWr: false,
        },
        {
          id: '2',
          number: '87',
          name: 'Pedro Munhoz',
          isQb: false,
          isRb: true,
          isTe: false,
          isWr: true,
        },
        {
          id: '3',
          number: '14',
          name: 'Marta Munhoz',
          isQb: false,
          isRb: false,
          isTe: false,
          isWr: true,
        },
        {
          id: '4',
          number: '27',
          name: 'Enzo Mombelli',
          isQb: false,
          isRb: true,
          isTe: false,
          isWr: false,
        },
        {
          id: '5',
          number: '03',
          name: 'Arthur Mombelli',
          isQb: false,
          isRb: false,
          isTe: false,
          isWr: true,
        },
      ]
    },
  },
}
</script>

<style>
</style>