<template>
  <v-container>
    <v-row class="ma-2 pa-2" justify="center">
      <v-card flat>
        <v-img
          :src="require('@/assets/images/placeholder_gray.png')"
          class="align-end"
          max-height="45vh"
        >
          <v-container fluid class="pa-8">
            <v-row>
              <v-col cols="0" xl="2" lg="2" md="3" sm="3" xs="3">
                <v-avatar size="150" color="primary">
                  <v-img :src="person.picture"></v-img>
                </v-avatar>
              </v-col>
              <v-col align-self="center">
                <h1>
                  <div v-if="person.title">{{ person.title }}</div>
                  {{ person.fullName() }}
                </h1>
              </v-col>
            </v-row>
          </v-container>
        </v-img>
      </v-card>
    </v-row>
    <v-row class="ma-2 pa-2" justify="center">
      <v-card width="100%">
        <v-card-title>Info:</v-card-title>
        <v-divider></v-divider>
        <v-container fluid>
          <v-row>
            <v-col cols="6"> Email: {{ user.email }} </v-col>
            <v-col cols="6" v-if="person.preferredName">
              Preferred Name: {{ person.preferredName }}
            </v-col>
            <v-col cols="6" v-if="person.phoneCell">
              Phone: {{ person.maskPhoneNumber(person.phoneCell) }}
            </v-col>
            <v-col cols="6" v-if="person.birthday">
              Birthday: {{ person.birthday }}
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-row>
    <v-row
      class="ma-2 pa-2"
      justify="center"
      v-if="!!person.skill && person.skill.length > 0"
    >
      <v-card width="100%">
        <v-card-title>Skills:</v-card-title>
        <v-divider></v-divider>
        <v-container fluid>
          <v-row>
            <v-col cols="6" v-for="skill in person.skill" :key="skill.id">
              {{ skill.name }}
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-row>
    <v-row class="ma-2 pa-2" justify="center">
      <v-card width="100%" tile>
        <v-card-actions>
          <v-card-title>Family:</v-card-title>
          <v-spacer></v-spacer>
          <v-btn color="secondary" outlined dark class="mr-4">
            View Family Page
          </v-btn>
        </v-card-actions>
        <v-divider></v-divider>
        <v-container fluid>
          <v-row no-gutters>
            <v-col cols="6" v-for="(thing, i) in family" :key="i">
              <v-hover v-slot="{ hover }">
                <v-card
                  :elevation="hover ? 6 : 0"
                  @click="
                    $router.push({ name: 'MemberView', params: { id: thing.id } })
                  "
                  style="border-radius: 0"
                >
                  <v-container fluid>
                    <v-row>
                      <v-col cols="3">
                        <v-avatar color="primary">
                          <v-img :src="thing.picture" :lazy-src="require('@/assets/images/placeholder_gray.png')"></v-img>
                        </v-avatar>
                      </v-col>
                      <v-col>
                        <v-card-text>{{ thing.fullName() }}</v-card-text>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card>
              </v-hover>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-row>

    <admin-fab :editFunction="edit"></admin-fab>
  </v-container>
</template>

<script>
import Person from "@/models/person.model";
import User from "@/models/user.model";
import MemberService from "@/services/memberServices";
import UserService from "@/services/userServices";
import AdminFab from "@/components/AdminFab.vue";

export default {
  props: ["id"],
  components: {
    AdminFab,
  },
  data() {
    return {
      user: new User(),
      person: new Person(),
      family: [],
    };
  },
  computed: {},
  methods: {
    edit() {
      this.$router.push({
        name: "MemberEdit",
        params: { id: this.id, isAdd: false },
      });
    },
  },
  mounted() {
    MemberService.get(this.id).then(response => {
      this.person = new Person(response.data.data);
    });
    UserService.getByPerson(this.id).then(res => {
      this.user = new User(res.data.data[0]);
    });

    MemberService.getAll().then(res => {
      res.data.data.forEach(element => {
        let person = new Person(element);
        this.family.push(person);
      });
    });
  },
};
</script>

<style scoped lang="scss"></style>
