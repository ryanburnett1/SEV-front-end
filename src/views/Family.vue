<template>
  <v-container>
    <v-row class="ma-2 pa-2" justify="center">
      <v-card flat width="100%">
        <v-card-title class="text-h4">{{ family.name }} Family</v-card-title>
        <v-divider></v-divider>
        <v-img
          :src="family.getPicturePath()"
          :lazy-src="require('@/assets/images/placeholder_gray.png')"
          class="align-end mb-1 mt-1"
          max-height="45vh"
          contain
        >
        </v-img>
      </v-card>
    </v-row>
    <v-row class="ma-2 pa-2" justify="center">
      <v-card width="100%">
        <v-card-title>Info:</v-card-title>
        <v-divider></v-divider>
        <v-container fluid>
          <v-row>
            <v-col cols="6"> Email: {{ family.email }} </v-col>
            <v-col cols="6" v-if="family.address">
              Address: {{ family.address }}
            </v-col>
            <v-col cols="6" v-if="family.phone">
              Phone: {{ family.maskPhoneNumber(family.phone) }}
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-row>
    <v-row class="ma-2 pa-2" justify="center" v-if="persons.length > 0">
      <v-card width="100%" tile>
        <v-card-actions class="pl-0">
          <v-card-title>Family Members:</v-card-title>
        </v-card-actions>
        <v-divider></v-divider>
        <v-card-actions class="pl-0">
          <v-card-title>Perspective from</v-card-title>
          <v-select
            :items="persons"
            v-model="personInPerspective"
            @change="loadRelationshipPerspective"
            return-object
          >
            <template v-slot:selection="{ item }">
              <MemberSelectItem :person="item"></MemberSelectItem>
            </template>
            <template v-slot:item="{ item }">
              <MemberSelectItem :person="item"></MemberSelectItem>
            </template>
          </v-select>
          <v-spacer></v-spacer>
          <RelationshipsEdit
            v-if="isLoggedIn && $store.getters.isAdmin"
            :key="relsEditKey"
            @close="relationshipsEditClose"
            :personInPerspective="personInPerspective"
            :persons="minimalPersons"
            :relationships="minimalRels"
            :selectablePersons="personsNotSelected"
          ></RelationshipsEdit>
        </v-card-actions>
        <v-container fluid>
          <v-row no-gutters>
            <v-col
              class="pa-2"
              cols="6"
              v-for="(person, index) in persons"
              :key="person.id"
            >
              <RelationshipCard
                :person="person"
                :personInPerspective="personInPerspective"
                :relationship="relationships[index]"
                :familyAddress="family.address"
              >
              </RelationshipCard>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-row>
    <admin-fab :editFunction="edit" :deleteFunction="deleteFamily"></admin-fab>
    <confirmation-dialog ref="confirm"></confirmation-dialog>
  </v-container>
</template>

<script>
import Person from "@/models/person.model";
import Family from "@/models/family.model";
import Relationship from "@/models/relationship.model";
import rest from "@/services/restServices";
import AdminFab from "@/components/AdminFab.vue";
import MemberSelectItem from "@/components/MemberSelectItem.vue";
import RelationshipCard from "@/components/RelationshipCard.vue";
import RelationshipsEdit from "@/components/RelationshipsEdit.vue";
import ConfirmationDialog from "@/components/ConfirmationDialog";

export default {
  props: ["id"],
  components: {
    AdminFab,
    MemberSelectItem,
    RelationshipCard,
    RelationshipsEdit,
    ConfirmationDialog,
  },
  data() {
    return {
      relsEditKey: 0,
      family: new Family(),
      personInPerspective: new Person({ firstName: "Bob", lastName: "Guy" }),
      //all of the people in the family
      persons: [],
      //a parallel array to persons
      relationships: [],
      //only the people in relationships
      minimalPersons: [],
      //a parallell array to minPersons
      minimalRels: [],
    };
  },
  computed: {
    //all of the people but the person in perspective
    personsNotSelected() {
      return this.persons.filter(p => {
        return p.id != this.personInPerspective.id;
      });
    },
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
  },
  methods: {
    edit() {
      this.$router.push({
        name: "FamilyEdit",
        params: { id: this.id, isAdd: false },
      });
    },
    async relationshipsEditClose(event) {
      //all relationships with no ids are new ones
      if (event.isSave) {
        console.log("isSave");
        console.log(this.minimalRels);
        console.log(event);

        if (this.minimalRels.length > 0) {
          // intersect the event.relationships and relsCopy
          // put the results in updated, added, and deleted
          // if there is no match, add it to the added list
          // if there is a match, add it to the updated list and remove from other list
          // if there is something leftover add it to the deleted list

          let relsCopy = [];
          //make a deep copy of minimalRels
          for (let i = 0; i < this.minimalRels.length; i++) {
            relsCopy.push(new Relationship(this.minimalRels[i]));
          }

          let updated = [];
          let deleted = [];
          let added = [];
          event.relationships.forEach(rel => {
            if (rel.id == undefined) {
              added.push(rel);
            } else {
              //find the matching relationship by id
              let foundIndex = relsCopy.findIndex(r => {
                return r.id == rel.id;
              });
              //if a match was found, check if it has different data
              if (foundIndex != -1) {
                let foundRelationship = new Relationship(relsCopy[foundIndex]);
                if (!foundRelationship.deepEqual(rel)) {
                  //add that relationship to updated
                  updated.push(rel);
                }
                //remove found relationship from relsCopy
                if (relsCopy.length == 1) {
                  relsCopy = [];
                } else {
                  relsCopy.splice(foundIndex, 1);
                }
              } else {
                //if no match was found, add it to the added
                added.push(rel);
              }
            }
          });
          //if there are leftover relationships from the relsCopy, then they are deleted
          if (relsCopy.length > 0) {
            relsCopy.forEach(r => {
              deleted.push(r);
            });
            relsCopy = [];
          }
          //make the proper requests for updated, added, and deleted
          //wrap each request in a promise
          let requests = [];
          for (let i = 0; i < updated.length; i++) {
            requests.push(
              new Promise(resolve => {
                rest
                  .update("relationship/", updated[i].id, updated[i])
                  .then(value => {
                    console.log("updated executed");
                    console.log(value);
                    resolve(value);
                  });
              })
            );
          }
          for (let i = 0; i < added.length; i++) {
            requests.push(
              new Promise(resolve => {
                rest.create("relationship", added[i]).then(value => {
                  console.log("added executed");
                  console.log(value);
                  resolve(value);
                });
              })
            );
          }
          for (let i = 0; i < deleted.length; i++) {
            requests.push(
              new Promise(resolve => {
                rest.delete("relationship/", deleted[i].id).then(value => {
                  console.log("deleted executed");
                  console.log(value);
                  resolve(value);
                });
              })
            );
          }
          //wait for each promise to complete
          await Promise.all(requests).then(values => {
            console.log("all finished");
            console.log(values);
          });
        } else {
          //add all relationships
          //wrap each request in a promise
          let requests = [];
          let d = new Date();
          console.log(d.getTime());
          for (let i = 0; i < event.relationships.length; i++) {
            requests.push(
              new Promise(resolve => {
                rest
                  .create("relationship", event.relationships[i])
                  .then(value => {
                    console.log("then executed");
                    console.log(value);
                    resolve(value);
                  });
              })
            );
          }
          //wait for each promise to complete
          await Promise.all(requests).then(values => {
            console.log("all finished");
            console.log(values);
          });
          d = new Date();
          console.log(d.getTime());
        }
        //wait for the getting of all relationships
        await this.loadRelationshipPerspective();
      }
      this.relsEditKey = !this.relsEditKey;
    },
    async loadRelationshipPerspective() {
      //reset relationships
      this.minimalRels = [];
      //get all relationships for the person
      await rest
        .get(`person/${this.personInPerspective.id}/relationships`)
        .then(response => {
          let data = response.data.data;
          if (data) {
            for (let i = 0; i < data.length; i++) {
              this.minimalRels.push(new Relationship(data[i]));
            }
          }
        });
      //get family ids
      let familyIds = this.persons.map(p => {
        return p.id;
      });
      //filter relationships that aren't in the family
      this.minimalRels = this.minimalRels.filter(r => {
        return (
          familyIds.includes(r.person1Id) && familyIds.includes(r.person2Id)
        );
      });
      //make the minimalPersons array parallel to the minimalRels
      this.minimalPersons = [];
      this.minimalRels.forEach(r => {
        let newPerson = this.persons.find(p => {
          return (
            p.id != this.personInPerspective.id &&
            (p.id == r.person1Id || p.id == r.person2Id)
          );
        });
        this.minimalPersons.push(newPerson);
      });
      //make the relationships array parallel to the persons array
      this.relationships = [];
      for (let i = 0; i < this.persons.length; i++) {
        this.relationships.push(null);
      }
      for (let i = 0; i < this.persons.length; i++) {
        if (this.personInPerspective.id == this.persons[i].id) {
          this.relationships[i] = null;
        } else {
          let rel = this.minimalRels.find(r => {
            return (
              this.persons[i].id == r.person1Id ||
              this.persons[i].id == r.person2Id
            );
          });
          if (rel) {
            this.relationships[i] = rel;
          }
        }
      }
    },
    async deleteFamily() {
      let message = `Are your sure you want to delete the ${this.family.name} Family?\nThis will delete the family but not the members or relationships of the family`;

      if (
        await this.$refs.confirm.open("Confirm Delete", message, {
          color: "error",
          confirmText: "Delete",
          confirmColor: "error",
          cancelColor: "success",
        })
      ) {
        await rest
          .delete("/family/", this.id)
          .then(response => {
            console.log("FAMILY DELETED: ", response);
            this.$router.back();
          })
          .catch(error => {
            console.log("DELETE FAMILY ERROR: ", error);
          });
      }
    },
  },
  async mounted() {
    // get family by id prop
    await rest.get("/family/", this.id).then(response => {
      this.family = new Family(response.data.data);
    });
    this.family.person.forEach(element => {
      this.persons.push(new Person(element));
    });

    //assign the person in perspective to be someone in the family
    if (this.persons && this.persons.length > 0)
      this.personInPerspective = this.persons[0];

    //get the relationships for the personInPerpsective in the family
    await this.loadRelationshipPerspective();
  },
};
</script>

<style scoped lang="scss"></style>
