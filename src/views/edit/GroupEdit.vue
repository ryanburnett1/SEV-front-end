<template>
    <v-container>
        <v-card>
            <v-row v-for="(person, i) in group.people" :key="i"
            :align="align"
            no-gutters
            style="height: 100px;">
                {{person.fullName()}}
            <v-btn icon @click="deleteMember(i)">
                <v-icon>mdi-trash-can</v-icon>
            </v-btn>
            </v-row>
        </v-card>
        <v-btn icon>
        Add Member<v-icon>mdi-account-plus</v-icon>
    </v-btn>
    </v-container>

</template>

<script>
//what do we need to display in the group-edit/display?

import Group from "@/models/group.model";
//import Person from "@/models/person.model";
import GroupService from "@/services/groupServices";
//import PersonService from "@/services/memberServices";

// import {ValidationObserver, ValidationProvider} from "vee-validate";

export default {
    props: {
        id: {
            type: Number,
            default: 0,
        },
        isAddGroup: {
            type: Boolean,
            default: false,
        },
        isAddPerson: {
          type: Boolean,
          default: true,  
        },
    },
    // components: {
    //     ValidationObserver,
    //     ValidationProvider,
    // },
    data() {
        return {
            //picture: "", 
            loading: true,
            group: new Group(),
            
        };
    },
    methods: {
        cancel() {
            this.$router.back();
        },
        deleteMember(personId) {
            console.log("deleting member: ", personId);
            if(this.isAddPerson) {
                console.log("please help God");
                console.log("personId: ", personId);
                GroupService.deletePeople(this.group.id, personId);
            }//to delete group, update with an blank array of id's
        },
        async save() {
            let picker = this.$refs.picker;
            if(picker.selectedFile) {
                const formData = new FormData();
                formData.append("file", picker.selectedFile);

                // await GroupService.add(formData)
                // .then(response => {
                //     GroupService.add(this.group.data.data);
                // })
            }
            //this needs to be different for adding a person, and adding a group

            if (this.isAddPerson) {//adding a person
                GroupService.create(this.person)
                    .then(response => {
                        this.group = response.data.data;

                        GroupService.update(this.group.id, this.formData)
                        .then(() => {
                            this.$router.back();
                        })
                        .catch(err => {
                            console.log("Add Group Member Failed: ", err);
                        });
                    })
                    .catch(err => {
                        console.log("Add Group Member failed: ", err);
                    });
            }
            //do i need to instantiate a new group here?
            else if(this.isAddGroup) {
                GroupService.create(this.group)
                    .then(response => {
                        this.group = response.data.data;
                        GroupService.create(this.group.id, this.formData)
                        .then(() => {
                            this.$router.back();
                        })
                        .catch(err => {
                            console.log("adding new group failed: ", err);
                        });
                    })
                    .catch( err => {
                        console.log("adding new group failed: ", err);
                    });
            }
        },
    },
    mounted() {
      console.log("into mounted");
      if(this.isAddPerson) {
          console.log("before getOne()");
          GroupService.getOne(this.id).then(response => {
                  this.group = new Group(response.data.data);
                  console.log("this is working?");
                  console.log(this.group);
          });
      }
  }
}
</script>