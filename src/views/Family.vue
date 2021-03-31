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
            return-object>
            <template v-slot:selection="{ item }">
              <MemberSelectItem :person="item"></MemberSelectItem>
            </template>
            <template v-slot:item ="{ item }">
              <MemberSelectItem :person="item"></MemberSelectItem>
            </template>
          </v-select>
          <v-btn fab>
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
				</v-card-actions>
				<v-container fluid>
					<v-row no-gutters>
						<v-col cols="6" v-for="person, index in persons" :key="person.id">
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
											<v-col cols="2">
												<v-avatar color="primary">
													<v-img
														:src="person.getPicturePath()"
														:lazy-src="
															require('@/assets/images/placeholder_gray.png')
														"
													></v-img>
												</v-avatar>
											</v-col>
											<v-col class="ma-0 pa-0 pt-2 pl-4">
                        <v-row>
                          <v-card-title>
                            <v-row>
                              {{ person.preferredFullName() }}
                            </v-row>
                          </v-card-title>
                        </v-row>
                        <v-row class="mt-0">
                          <v-card-subtitle class="ma-0 pa-1 pl-1">
                              {{ relationships[index] }}
                          </v-card-subtitle>
                        </v-row>
                        <v-row class="text-body-2 pl-4 pt-2">
                            <v-row v-if="person.address">
                              Address: {{person.address}}
                            </v-row>
                            <v-row v-else>
                              No address is stored
                            </v-row>
                        </v-row>
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
import Family from "@/models/family.model";
import Relationship from "@/models/relationship.model";
import rest from "@/services/restServices";
import AdminFab from "@/components/AdminFab.vue";
import MemberSelectItem from "@/components/MemberSelectItem.vue";

export default {
	props: ["id"],
	components: {
		AdminFab,
    MemberSelectItem,
	},
	data() {
		return {
			family: new Family(),
      personInPerspective: new Person( {firstName: "Bob", lastName: "Guy"} ),
      persons: [],
      relationships: [],
		};
	},
	computed: {},
	methods: {
		edit() {
			this.$router.push({
				name: "FamilyEdit",
				params: { id: this.id, isAdd: false },
			});
		},
    async loadRelationshipPerspective() {
      //reset relationships
      let tempRels = [];
      //get all relationships for the person
      await rest.get(`person/${this.personInPerspective.id}/relationships`).then( response => {
        let data = response.data.data;
        if (data) {
          for (let i = 0; i < data.length; i++) {
            tempRels.push(new Relationship(data[i]));
          }
        }
      });
      //get family ids
      let familyIds = this.persons.map(p => {
        p.id;
      });
      //filter relationships that aren't in the family
      tempRels.filter(r => {
        familyIds.includes(r.person1Id) && familyIds.includes(r.person2Id);
      });
      //make the relationships array parallel to the persons array
      this.relationships = [];
      for (let i = 0; i < this.persons.length; i++) {
        this.relationships.push("No relationship to " + this.personInPerspective.getPreferredName());
      }
      for (let i = 0; i < this.persons.length; i++) {
        if (this.personInPerspective.id == this.persons[i].id) {
          this.relationships[i] = "Selected Person";
        } else {
          let rel = tempRels.find(r => {
            return this.persons[i].id == r.person1Id || this.persons[i].id == r.person2Id;
          });
          if (rel) {
            if (rel.person1Id == this.persons[i].id) {
              this.relationships[i] = rel.type1 + " of " + this.personInPerspective.getPreferredName();
            }
            else if (rel.person2Id == this.persons[i].id) {
              this.relationships[i] = rel.type2 + " of " + this.personInPerspective.getPreferredName();
            }
          }
        }
      }
    }
	},
	async mounted() {
		// get family by id prop
    await rest.get("/family/", this.id).then(response =>{
      this.family = new Family(response.data.data);
    })
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
