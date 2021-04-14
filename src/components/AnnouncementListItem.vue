<template>
  <v-list-item
    :key="item.id"
    active-class="accent--text text--accent-4"
    link
    @click="
      $router.push({
        name: 'Event',
        params: { id: item.event[0].id },
      })
    "
  >
    <v-list-item-avatar rounded size="60" v-if="item.picture">
      <v-img :src="item.picture"></v-img>
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title> {{ item.title }} </v-list-item-title>
      Location: {{ item.event[0].location }}
      <br />
      Time:
      {{ $moment(item.event[0].startTime).format("MMMM Do, YYYY hh:mma") }}
      <br />
      {{ item.description }}
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  props: ["item"],
};
</script>
