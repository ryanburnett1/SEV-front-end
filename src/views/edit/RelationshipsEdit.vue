<template>
  <member-card></member-card>
</template>

<script>
import MemberCard from '../../components/MemberCard.vue'
//import Person from "@/models/person.model";

export default {
  props: {
    id: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      relationships: [],
    }
  },
  components: {
    MemberCard,
  },
}
</script>