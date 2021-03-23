<template>
  <v-hover
    :disabled="disabled"
    v-slot="{ hover }"
    :class="disabled ? 'disabled-style' : ''"
  >
    <v-skeleton-loader type="card">
      <v-card
        v-if="!!person"
        :disabled="disabled"
        :class="{ 'on-hover': hover, 'max-auto': true }"
        :elevation="hover ? 16 : 2"
      >
        <v-skeleton-loader type="image" class="px-4 pt-4">
          <v-avatar size="150" color="primary">
            <v-img
              :src="person.getPicturePath()"
              :lazy-src="require('@/assets/images/placeholder_gray.png')"
            >
            </v-img>
          </v-avatar>
        </v-skeleton-loader>
        <v-card-title class="px-4 pt-2 pb-0">
          {{ person.fullName() }}
        </v-card-title>
        <v-card-text v-if="$store.getters.isAdmin" class="px-4 pb-4">
          id: {{ person.id }}
        </v-card-text>
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
      default: new Person({
        firstName: "Test",
        lastName: "McTest",
        picture: "RANDOM",
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
      return this.person.status == "Disabled";
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
