<template>
	<v-container>
		<v-card>
			<v-toolbar color="primary" dark>
				<v-toolbar-title>Change Info:</v-toolbar-title>
			</v-toolbar>
			<v-form
				class="ma-2 pa-2"
				@submit.prevent=""
				v-model="valid"
				ref="form"
				lazy-validation
			>
				<v-img
					class="mb-2"
					:src="person.picture"
					:lazy-src="require('@/assets/images/scared-batman.jpg')"
					contain
				></v-img>
				<upload-pic @onImageUpload="person.picture = $event" />
				<v-row>
					<v-col>
						<v-text-field
							v-model="user.email"
							label="User Email"
							type="email"
							:rules="emailRules"
						></v-text-field>
					</v-col>
				</v-row>
				<v-row>
					<v-col>
						<v-text-field
							v-model="emailTemp"
							label="Re-enter Email"
							type="email"
							:rules="emailRules"
						></v-text-field>
					</v-col>
				</v-row>
				<v-row v-if="isAdd">
					<v-col>
						<v-text-field
							v-model="user.password"
							label="User Password"
							type="text"
						></v-text-field>
					</v-col>
				</v-row>
				<v-row>
					<v-col>
						<v-text-field
							v-model="person.title"
							label="title | Ex: Mr., Dr."
							type="text"
						></v-text-field>
					</v-col>
				</v-row>
				<v-row>
					<v-col>
						<v-text-field
							v-model="person.f_name"
							label="First Name"
							type="text"
						></v-text-field>
					</v-col>
					<v-col>
						<v-text-field
							v-model="person.l_name"
							label="Last Name"
							type="text"
						></v-text-field>
					</v-col>
				</v-row>
				<v-text-field-simplemask
					v-model="person.phone_number"
					label="Phone Number"
					:options="{
						inputMask: '(###) ###-####',
						outputMask: '##########',
						empty: null,
						applyAfter: false,
						alphanumeric: true,
						lowerCase: false,
					}"
				></v-text-field-simplemask>
				<v-select
					v-model="person.marital_status"
					label="Marital Status"
					:items="person.maritalStatusOptions()"
				></v-select>
				<v-select
					v-model="person.sex"
					label="Sex"
					:items="person.sexOptions()"
				></v-select>
				<v-select
					v-if="$store.getters.isAdmin"
					v-model="person.status"
					label="Church Status"
					:items="person.statusOptions()"
				></v-select>
			</v-form>
			<v-divider></v-divider>
			<v-card-actions>
				<v-btn @click="save()" color="success" v-if="!isAdd">Save</v-btn>
				<v-btn @click="save()" color="success" v-else>Create</v-btn>
				<v-spacer></v-spacer>
				<v-btn @click="cancel()" color="error">Cancel</v-btn>
			</v-card-actions>
		</v-card>
		<admin-fab :cancelFunction="cancel" :saveFunction="save"></admin-fab>
	</v-container>
</template>

<script>
import AdminFab from "@/components/AdminFab.vue";
import Person from "@/models/person.model";
import User from "@/models/user.model";
import MemberServices from "@/services/memberServices";
import UserServices from "@/services/userServices";
import UploadPic from "@/components/UploadPic.vue";

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
	},
	components: {
		AdminFab,
		UploadPic,
	},
	data() {
		return {
			person: new Person(),
			user: new User(null, this.person),
			emailTemp: "",
			valid: true,
			emailRules: [
				(v) => !!v || "E-mail is required",
				(v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
			],
		};
	},
	methods: {
		cancel() {
			this.$router.back();
		},
		save() {
			if (this.isAdd) {
				MemberServices.create(this.person)
					.then((response) => {
						this.user.person = response.data.data;
						this.user.personId = response.data.data.id;

						UserServices.create(this.user)
							.then(() => {
								this.$router.back();
							})
							.catch((err) => {
								console.log(
									`Failed to create new User for Person: ${this.person.id}`,
									err
								);
							});
					})
					.catch((err) => {
						console.log("Failed to create new Person: ", err);
					});
			} else {
				MemberServices.update(this.id, this.person)
					.then(() => {
						UserServices.update(this.user.id, this.user)
							.then(() => {
								this.$router.back();
							})
							.catch((err) => {
								console.log("Update User Failed: ", err);
							});
					})
					.catch((err) => {
						console.log("Update Person Failed: ", err);
					});
			}
		},
		validate() {
			return this.$refs.form.validate() && this.user.email === this.emailTemp;
		},
	},
	mounted() {
		if (!this.isAdd) {
			UserServices.getByPerson(this.id).then((response) => {
				this.user = new User(response.data.data[0]);
				this.emailTemp = this.user.email;
			});
			MemberServices.get(this.id).then((response) => {
				this.person = new Person(response.data.data);
			});
		}
	},
};
</script>

<style></style>
