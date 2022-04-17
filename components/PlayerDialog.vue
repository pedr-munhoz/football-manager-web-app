<template>
  <v-dialog v-model="dialog" width="640px">
    <template #activator="{ on }">
      <v-btn v-if="editMode" icon small v-on="on">
        <v-icon>mdi-pencil-outline</v-icon>
      </v-btn>
      <v-btn v-else icon outlined v-on="on">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-form @submit.prevent="confirm()">
        <v-card-title>
          {{ editMode ? 'Edit player' : 'Create Player' }}
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
          <v-btn type="submit" outlined>
            <v-icon>mdi-check-bold</v-icon>
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'ConfigurationDialog',

  props: {
    oldName: {
      type: String,
      required: false,
      default: '',
    },
    oldNumber: {
      type: Number,
      required: false,
      default: null,
    },
    editMode: {
      type: Boolean,
      required: true,
      default: true,
    },
  },

  data: () => ({
    dialog: false,
    name: '',
    number: '',
  }),

  mounted() {
    this.name = this.oldName;
    this.number = this.oldNumber;
  },

  methods: {
    close() {
      this.dialog = false;
    },
    confirm() {
      this.$emit('confirm', { name: this.name, number: this.number });

      if (!this.editMode) {
        this.name = '';
        this.number = '';
      }

      this.close();
    },
  },
};
</script>