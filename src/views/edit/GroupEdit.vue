<template>
    <v-container>
        <v-card>
            <v-row>
                <v-text-field
                    v-model="group.name"
                    color="secondary"
                    label="Group Leader"
                    type="text"
                ></v-text-field>
            </v-row>
            <v-row>
                <v-col v-for="(person, i) in people" :key="i">
                    <v-image
                        max-height="100"
                        class="mb-2"
                        :src="picture"
                        :lazy-src="require('@/assets/images/placeholder_gray.png')"
                        contain
                        ></v-image>
                        <upload-pic @onFileSelected="picture = $event" ref="picker" />
                </v-col>
            </v-row>
        </v-card>
    </v-container>
</template>

<script>
import Group from "@/models/group.model";
import Person from "@/models/person.model";
import GroupService from "@/services/groupServices";
import PersonService from "@/services/memberServices";

import {ValidationObserver, ValidationProvider} from "vee-validate";

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
        isAddMember: {
          type: Boolean,
          default: true,  
        },
        components: {
            ValidationObserver,
            ValidationProvider,
        },
        data() {
            return {
                picture: "", 
                loading: true,
                group: new Group,
                
            };
        },
        methods: {
            cancel() {
                this.$router.back();
            },
            async save() {
                let picker = this.$refs.picker;
                if(picker.selectedFile) {
                    const formData = new FormData();
                    forData.append("file", picker.selectedFile);

                    await GroupService.add(formData)
                    .then(res => {
                        //what to put here? How to add a new person/group to the right spot?
                    })
                }
                //this needs to be different for adding a person, and adding a group

                if (this.isAdd) {//adding a person
                    GroupService.create(this.person)
                        .then(response => {
                            this.group = response.data.data;

                            GroupServices.update(this.group.id, this.formData)
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
                            this.group = respnse.data.data;
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
            }
        }
    }
}
</script>