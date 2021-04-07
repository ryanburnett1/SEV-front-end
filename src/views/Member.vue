<template>
  <v-container>
    <v-row class="ma-2 pa-2" justify="center">
      <v-card flat width="100%">
        <v-img
          :src="family.getPicturePath()"
          :lazy-src="require('@/assets/images/placeholder_gray.png')"
          class="align-end"
          max-height="45vh"
          contain
        >
          <v-container fluid class="pa-8">
            <v-row>
              <v-col cols="0" xl="2" lg="2" md="3" sm="3" xs="3">
                <v-avatar size="150" color="primary">
                  <v-img :src="person.getPicturePath()"></v-img>
                </v-avatar>
              </v-col>
              <v-col align-self="center">
                <h1>
                  <div v-if="person.title">{{ person.title }}</div>
                  {{ person.preferredFullName() }}
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
            <v-col cols="6" v-if="person.address">
              Address: {{ person.address }}
            </v-col>
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
      v-if="!!nonServiceSkills && nonServiceSkills.length > 0"
    >
      <v-card width="100%">
        <v-card-title>Non-Service Skills:</v-card-title>
        <v-divider></v-divider>
        <v-container fluid>
          <v-row>
            <v-col cols="6" v-for="skill in nonServiceSkills" :key="skill.id">
              {{ skill.name }}
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-row>
    <v-row
      class="ma-2 pa-2"
      justify="center"
      v-if="!!serviceSkills && serviceSkills.length > 0"
    >
      <v-card width="100%">
        <v-card-title>Service Skills:</v-card-title>
        <v-divider></v-divider>
        <v-container fluid>
          <v-row>
            <v-col cols="6" v-for="skill in serviceSkills" :key="skill.id">
              {{ skill.name }}
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-row>
    <v-row class="ma-2 pa-2" justify="center" v-if="familyCardArr.length > 0">
      <v-card width="100%" tile>
        <v-card-actions>
          <v-card-title>Family:</v-card-title>
          <v-spacer></v-spacer>
          <v-btn
            color="secondary"
            outlined
            dark
            class="mr-4"
            @click="gotoFamilyPage"
          >
            View Family Page
          </v-btn>
        </v-card-actions>
        <v-divider></v-divider>
        <v-container fluid>
          <v-row no-gutters>
            <v-col cols="6" v-for="person in familyCardArr" :key="person.id">
              <v-hover v-slot="{ hover }">
                <v-card
                  :elevation="hover ? 6 : 0"
                  @click="
                    $router.push({
                      name: 'MemberView',
                      params: { id: person.id },
                    })
                  "
                  style="border-radius: 0"
                >
                  <v-container fluid>
                    <v-row>
                      <v-col cols="3">
                        <v-avatar color="primary">
                          <v-img
                            :src="person.getPicturePath()"
                            :lazy-src="
                              require('@/assets/images/placeholder_gray.png')
                            "
                          ></v-img>
                        </v-avatar>
                      </v-col>
                      <v-col>
                        <v-card-text>{{
                          person.preferredFullName()
                        }}</v-card-text>
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
import Family from "@/models/family.model";
import RestService from "@/services/restServices";

export default {
  props: ["id"],
  components: {
    AdminFab,
  },
  data() {
    return {
      user: new User(),
      person: new Person(),
      family: new Family(),
      familyCardArr: [],
      //normSkills: [],
      //servSkills: [],
    };
  },
  computed: {
    nonServiceSkills: function(){
      return this.person.skill.filter(skill => !skill.serviceSkill);
    },
    serviceSkills: function(){
      return this.person.skill.filter(skill => skill.serviceSkill);
    },
  },
  methods: {
    edit() {
      this.$router.push({
        name: "MemberEdit",
        params: { id: this.id, isAdd: false },
      });
    },
    gotoFamilyPage() {
      this.$router.push({
        name: "FamilyView",
        params: { id: this.family.id },
      });
    },
  },
  mounted() {
    // get the person by prop id
    MemberService.get(this.id).then(response => {
      this.person = new Person(response.data.data); // create a new Person Class for data
      /*if (this.person.skill) {
        this.person.skill.forEach(element => {

        })
      }*/
      // if person has a family add them for easy of navigation
      if (this.person.family) {
        RestService.get("/family/", this.person.family[0].id).then(res => {
          this.family = new Family(res.data.data);
          this.family.person.forEach(element => {
            element.id != this.person.id
              ? this.familyCardArr.push(new Person(element))
              : null;
          });
        });
      }
    });

    // get user info for email
    UserService.getByPerson(this.id).then(res => {
      this.user = new User(res.data.data[0]);
    });
  },
};
</script>

<style scoped lang="scss"></style>
