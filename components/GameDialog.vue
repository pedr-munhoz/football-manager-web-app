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
          {{ editMode ? 'Edit Game' : 'Create Game' }}
          <v-spacer />
          <v-btn small color="red" icon @click="close()">
            <v-icon>mdi-close-thick</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider />
        <v-card-text class="mt-10">
          <base-date-picker :initial-date="date" @update="log($event)" />
          <v-text-field v-model="homeTeam" label="Home Team" outlined />
          <v-text-field v-model="awayTeam" label="Away Team" outlined />
          <v-text-field v-model="location" label="Location" outlined />
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
import BaseDatePicker from '@/components/BaseDatePicker.vue';

export default {
  name: 'ConfigurationDialog',

  components: {
    BaseDatePicker,
  },

  props: {
    oldDate: {
      type: String,
      required: false,
      default: '',
    },
    oldHomeTeam: {
      type: String,
      required: false,
      default: '',
    },
    oldAwayTeam: {
      type: String,
      required: false,
      default: '',
    },
    oldLocation: {
      type: String,
      required: false,
      default: '',
    },
    editMode: {
      type: Boolean,
      required: true,
      default: true,
    },
  },

  data: () => ({
    dialog: false,
    date: null,
    homeTeam: '',
    awayTeam: '',
    location: '',
  }),

  mounted() {
    this.date = this.oldDate.substr(0, 10);
    this.homeTeam = this.oldHomeTeam;
    this.awayTeam = this.oldAwayTeam;
    this.location = this.oldLocation;
  },

  methods: {
    close() {
      this.dialog = false;
    },
    confirm() {
      this.$emit('confirm', {
        date: this.date,
        homeTeam: this.homeTeam,
        awayTeam: this.awayTeam,
        location: this.location,
      });

      if (!this.editMode) {
        this.name = '';
        this.number = '';
      }

      this.close();
    },
    log(event) {
      this.date = event;
    },
  },
};
</script>