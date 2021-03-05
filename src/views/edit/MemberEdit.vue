<template>
	<validation-observer ref="observer" v-slot="{ invalid, validated }">
		<v-container>
			<v-card>
				<v-toolbar color="primary" dark>
					<v-toolbar-title>Change Info:</v-toolbar-title>
				</v-toolbar>
				<v-form class="ma-2 pa-2" @submit.prevent="" ref="form" lazy-validation>
					<v-img
						class="mb-2"
						:src="picture"
						:lazy-src="require('@/assets/images/scared-batman.jpg')"
						contain
					></v-img>
					<upload-pic @onFileSelected="picture = $event" ref="picker" />
					<v-row>
						<v-col>
							<ValidationProvider
								name="email"
								rules="required|email"
								v-slot="{ errors, valid }"
								vid="con"
							>
								<v-text-field
									v-model="user.email"
									color="secondary"
									:error-messages="errors"
									:success="valid"
									label="User Email"
									type="email"
								></v-text-field>
							</ValidationProvider>
						</v-col>
						<v-col>
							<ValidationProvider
								name="emailConfirm"
								rules="required|confirmed:con"
								v-slot="{ errors, valid }"
							>
								<v-text-field
									v-model="emailTemp"
									color="secondary"
									:error-messages="errors"
									:success="valid"
									label="Renter Email"
									type="email"
								></v-text-field>
							</ValidationProvider>
						</v-col>
					</v-row>
					<v-row v-if="isAdd">
						<v-col>
							<v-text-field
								v-model="user.password"
								color="secondary"
								label="User Password"
								type="text"
							></v-text-field>
						</v-col>
					</v-row>
					<v-row>
						<v-col>
							<ValidationProvider
								name="firstName"
								rules="required"
								v-slot="{ errors, valid }"
							>
								<v-text-field
									v-model="person.firstName"
									color="secondary"
									:error-messages="errors"
									:success="valid"
									label="First Name"
									type="text"
								></v-text-field>
							</ValidationProvider>
						</v-col>
						<v-col>
							<ValidationProvider
								name="firstName"
								rules="required"
								v-slot="{ errors, valid }"
							>
								<v-text-field
									v-model="person.lastName"
									color="secondary"
									:error-messages="errors"
									:success="valid"
									label="Last Name"
									type="text"
								></v-text-field>
							</ValidationProvider>
						</v-col>
					</v-row>
					<v-text-field-simplemask
						v-model="person.phone_number"
						color="secondary"
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
					<v-row>
						<v-col>
							<v-text-field
								v-model="person.title"
								color="secondary"
								label="title | Ex: Mr., Dr."
								type="text"
							></v-text-field>
						</v-col>
						<v-col>
							<v-select
								v-model="person.marital_status"
								color="secondary"
								item-color="secondary"
								label="Marital Status"
								:items="person.maritalStatusOptions()"
							></v-select>
						</v-col>
					</v-row>
					<ValidationProvider
						name="sex"
						rules="required"
						v-slot="{ errors, valid }"
					>
						<v-select
							v-model="person.sex"
							color="secondary"
							item-color="secondary"
							:error-messages="errors"
							:success="valid"
							label="Sex"
							:items="person.sexOptions()"
						></v-select>
					</ValidationProvider>
					<div v-if="$store.getters.isAdmin">
						<v-select
							v-model="user.role"
							color="secondary"
							item-color="secondary"
							label="Role"
							:items="user.getRoles()"
						></v-select>
						<v-select
							v-model="person.status"
							color="secondary"
							item-color="secondary"
							label="Church Status"
							:items="person.statusOptions()"
						></v-select>
					</div>
					<skill-select
						v-if="!loading"
						color="secondary"
						:id="person.id"
						:pollDatabase="false"
						:personSkillList="person.getSkillIds()"
						ref="skillSelect"
					/>
				</v-form>
				<v-divider></v-divider>
				<v-card-actions>
					<v-btn
						@click="save()"
						color="success"
						v-if="!isAdd"
						:disabled="invalid || !validated"
						>Save</v-btn
					>
					<v-btn
						@click="save()"
						color="success"
						v-else
						:disabled="invalid || !validated"
						>Create</v-btn
					>
					<v-spacer></v-spacer>
					<v-btn @click="cancel()" color="error">Cancel</v-btn>
				</v-card-actions>
			</v-card>
			<admin-fab :cancelFunction="cancel" :saveFunction="save"></admin-fab>
		</v-container>
	</validation-observer>
</template>

<script>
import Person from "@/models/person.model";
import User from "@/models/user.model";
import MemberService from "@/services/memberServices";
import UserServices from "@/services/userServices";
import AdminFab from "@/components/AdminFab.vue";
import UploadPic from "@/components/UploadPic.vue";
import SkillSelect from "@/components/SkillSelect.vue";

import { ValidationObserver, ValidationProvider } from "vee-validate";

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
		SkillSelect,
		ValidationObserver,
		ValidationProvider,
	},
	data() {
		return {
			picture: "",
			loading: true, // hack for v-select due to async props
			person: new Person(),
			user: new User(null, this.person),
			emailTemp: "",
		};
	},
	methods: {
		cancel() {
			this.$router.back();
		},
		async save() {
			let picker = this.$refs.picker;
			if (picker.selectedFile) {
				const formData = new FormData();
				formData.append("file", picker.selectedFile); // appending file

				await MemberService.uploadImage(formData)
					.then(res => {
						this.person.picture =
							process.env.VUE_APP_IMAGE_PATH + res.data.data.name;
					})
					.catch(err => {
						console.log(err);
					});
			}

			console.log(this.person.picture);

			if (this.isAdd) {
				MemberService.create(this.person)
					.then(response => {
						this.$refs.skillSelect.updatePersonSkill(response.data.data.id);
						this.user.person = response.data.data;
						this.user.personId = response.data.data.id;

						UserServices.create(this.user)
							.then(() => {
								this.$router.back();
							})
							.catch(err => {
								console.log(
									`Failed to create new User for Person: ${this.person.id}`,
									err
								);
							});
					})
					.catch(err => {
						console.log("Failed to create new Person: ", err);
					});
			} else {
				console.log(this.person);
				MemberService.update(this.id, this.person)
					.then(() => {
						this.$refs.skillSelect.updatePersonSkill(this.id);
						UserServices.update(this.user.id, this.user)
							.then(() => {
								this.$router.back();
							})
							.catch(err => {
								console.log("Update User Failed: ", err);
							});
					})
					.catch(err => {
						console.log("Update Person Failed: ", err);
					});
			}
		},
	},
	mounted() {
		if (!this.isAdd) {
			UserServices.getByPerson(this.id).then(response => {
				this.user = new User(response.data.data[0]);
				this.emailTemp = this.user.email;
			});
			MemberService.get(this.id).then(response => {
				this.person = new Person(response.data.data);
				this.picture = this.person.picture;
				this.loading = false; // hack for v-select
			});
			this.$nextTick(() => {
				this.$refs.observer.validate();
			});
		} else {
			this.loading = false;
		}
	},
};
</script>

<style></style>
