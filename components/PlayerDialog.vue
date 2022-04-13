<template>
  <v-dialog v-model="dialog" width="640px">
    <template #activator="{ on }">
      <v-btn icon small v-on="on">
        <v-icon>mdi-pencil-outline</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        Edit player
        <v-spacer />
        <v-btn small color="red" icon @click="close()">
          <v-icon>mdi-close-thick</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider />
      <v-card-text class="mt-10">
        <v-text-field v-model="name" label="Name" outlined />
        <v-text-field v-model="number" label="Number" outlined />
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn outlined @click="confirm()">
          <v-icon>mdi-check-bold</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'ConfigurationDialog',

  props: {
    oldName: {
      type: String,
      required: true,
      default: '',
    },
    oldNumber: {
      type: String,
      required: true,
      default: '',
    },
  },

  data: () => ({
    dialog: false,
    name: '',
    number: '',
  }),

  mounted() {
    this.name = this.oldName
    this.number = this.oldNumber
  },

  methods: {
    close() {
      this.dialog = false
    },
    confirm() {
      this.$emit('update', { name: this.name, number: this.number })
      this.close()
    },
  },
}
</script>