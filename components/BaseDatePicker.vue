<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    :nudge-right="40"
    transition="scale-transition"
    offset-y
    min-width="auto"
  >
    <template #activator="{ on, attrs }">
      <v-text-field
        v-model="date"
        label="Date"
        prepend-icon="mdi-calendar"
        readonly
        v-bind="attrs"
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker v-model="date" @input="updateValue" />
  </v-menu>
</template>

<script>
export default {
  props: {
    initialDate: {
      type: Date,
      required: false,
      default: null,
    },
  },

  data: () => ({
    menu: false,
    date: null,
  }),

  mounted() {
    this.date = this.initialDate;
  },

  methods: {
    updateValue(event) {
      this.menu = false;
      this.$emit('update', event);
    },
  },
};
</script>