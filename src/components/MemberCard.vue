<template>
  <v-hover
    :disabled="disabled"
    v-slot="{ hover }"
    :class="disabled ? 'disabled-style' : ''"
  >
    <v-skeleton-loader type="card">
      <v-card
        :elevation="hover ? 16 : 2"
        :class="{ 'on-hover': hover, 'max-auto': true }"
        min-width="15vw"
        max-width="35vw"
        min-height="20vh"
        max-height="35vh"
        :disabled="disabled"
        v-if="!!person"
      >
        <v-skeleton-loader type="image">
          <v-img
            :src="person.picture"
            :lazy-src="require('@/assets/images/placeholder_1920x1080.png')"
            class="red--text align-end"
            aspect-ratio="1920/1080"
            contain
          >
            <v-card-title v-if="disabled"
              >Status / Disabled / Left
            </v-card-title>
          </v-img>
        </v-skeleton-loader>
        <v-card-subtitle>
          {{ person.fullName() }}
          <div v-if="$store.getters.isAdmin">| id: {{ person.id }}</div>
        </v-card-subtitle>
        <!-- <v-divider></v-divider> -->
        <v-card-text></v-card-text>
      </v-card>
    </v-skeleton-loader>
  </v-hover>
</template>

<script>
import Person from "@/models/person.model";

export default {
  props: {
    person: {
      type: Person,
      defualt: new Person({
        firstName: "Test",
        lastName: "McTest",
        picture: "https://picsum.photos/1920/1080?random",
        id: -1,
        status: "Inactive",
      }),
    },
  },
  data() {
    return {
      hover: false,
    };
  },
  computed: {
    disabled() {
      return this.person.status !== "Active";
    },
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.on-hover {
  transform: scale(0.97) !important;
  filter: contrast(115%) brightness(115%);
  cursor: pointer;
}

.disabled-style {
  transform: scale(0.97) !important;
  cursor: pointer;
}

// color examples
.v-card {
  background: var(--v-background-lighten1);

  // .v-divider {
  // 	background-color: blue !important;
  // }

  // .v-card__subtitle {
  // 	color: blue !important;
  // }

  // .v-card__text {
  // 	color: green !important;
  // }
}
// .v-card {
// 	padding: 150px;
// }
</style>
