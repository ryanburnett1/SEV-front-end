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
        isAdd: {
            type: Boolean,
            default: false,
        },
        components: {
            ValidationObserver,
            ValidationProvider,
        },
        data() {
            return {
                picture: "", 
                loading: true,
                
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
                }
                //this needs to be different for adding a person, and adding a group

                // if (this.isAdd) {//adding a person
                //     GroupService.create(this.person)
                //         .then(response => {
                //             //what to do here?
                //             //so far based on MemberEdit.vuey
                //         })
                // }

                // else if(this.isAddGroup) {
                //     GroupService.create(this.group)
                //         .then(response => )
                // }
            }
        }
    }
}
</script>