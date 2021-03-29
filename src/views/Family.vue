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
          <v-select :items="persons">
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
						<v-col cols="6" v-for="person in persons" :key="person.id">
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
                              Brother of [Person in Perspective]
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
	},
	async mounted() {
		// get family by id prop
    await rest.get("/family/", this.id).then(response =>{
      this.family = new Family(response.data.data);
    })
    this.family.person.forEach(element => {
      this.persons.push(new Person(element));
    });
	},
};
</script>

<style scoped lang="scss"></style>
