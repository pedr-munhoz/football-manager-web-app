<template>
  <v-card>
    <v-card-title>{{ title }}</v-card-title>
    <v-card-subtitle v-if="loaded">{{ subtitle }}</v-card-subtitle>
    <v-card-text v-if="loaded">
      <v-card-actions>
        <v-dialog width="640px">
          <template #activator="{ on }">
            <v-btn outlined v-on="on" @click="loadAvailableAthletes()">
              Include athletes
            </v-btn>
          </template>
          <v-card>
            <v-card-title>Athletes Available</v-card-title>
            <v-card-text>
              <v-text-field
                v-model="availableAthleteSearchQuery"
                prepend-icon="mdi-magnify"
                autofocus
                @input="loadAvailableAthletes()"
              />
              <v-list>
                <v-list-item
                  v-for="athlete in availableAthletes"
                  :key="athlete.id"
                  @click="addAthleteToGame(athlete.id)"
                >
                  <v-list-item-icon>
                    <v-icon>mdi-account</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>
                      {{ athlete.name }} #{{ athlete.number }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-card-actions>
      <v-list>
        <v-list-group
          v-for="(item, index) in sections"
          :key="index"
          prepend-icon="mdi-account-group"
          no-action
        >
          <template #activator>
            <v-list-item-content>
              <v-list-item-title>
                {{ item.title }}
              </v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item v-for="athlete in game.athletes" :key="athlete.id">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                {{ athlete.name }} #{{ athlete.number }}
                <v-btn icon @click="removeAthleteFromGame(athlete.id)">
                  <v-icon icon>mdi-close</v-icon>
                </v-btn>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
import AthletesService from '@/services/AthletesService';
import GamesService from '@/services/GamesService';

export default {
  name: 'GameLogPage',

  data: () => ({
    loaded: false,
    game: null,
    sections: [{ title: 'Athletes' }],
    allAthletes: [],
    availableAthleteSearchQuery: '',
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
    availableAthletes() {
      return this.allAthletes.filter(
        (x) => !this.currentAthletesIds.includes(x.id)
      );
    },
    currentAthletesIds() {
      return this.game.athletes.map((x) => x.id);
    },
    availableAthleteSearchName() {
      if (this.availableAthleteSearchQuery == null) return null;

      if (this.availableAthleteSearchQuery === '') return null;

      if (!isNaN(this.availableAthleteSearchQuery)) return null;

      return this.availableAthleteSearchQuery;
    },
    availableAthleteSearchNumber() {
      if (this.availableAthleteSearchQuery == null) return null;

      if (this.availableAthleteSearchQuery === '') return null;

      if (isNaN(this.availableAthleteSearchQuery)) return null;

      return this.availableAthleteSearchQuery;
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
    loadAvailableAthletes() {
      const service = new AthletesService();
      service
        .Search(
          this.availableAthleteSearchNumber,
          this.availableAthleteSearchName
        )
        .then((response) => {
          this.allAthletes = response.data.itens;
        })
        .finally(() => (this.loading = false));
    },
    addAthleteToGame(athleteId) {
      const service = new GamesService();
      service.AddAthlete(this.game.id, athleteId).finally(() => this.load());
    },
    removeAthleteFromGame(athleteId) {
      const service = new GamesService();
      service.RemoveAthlete(this.game.id, athleteId).finally(() => this.load());
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