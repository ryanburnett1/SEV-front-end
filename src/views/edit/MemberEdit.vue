<template>
	<v-container>
		<v-card>
			<v-toolbar color="primary" dark>
				<v-toolbar-title>Change Info:</v-toolbar-title>
			</v-toolbar>
			<v-form class="ma-2 pa-2" @submit.prevent="">
				<v-img
					class="mb-2"
					:src="person.picture"
					:lazy-src="require('@/assets/images/scared-batman.jpg')"
					contain
				></v-img>
				<upload-pic @onImageUpload="person.picture = $event" />
				<v-text-field
					v-model="person.title"
					label="title | Ex: Mr., Dr."
					type="text"
				></v-text-field>
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
				<v-btn @click="save()" color="success">Save</v-btn>
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
import memberServices from "@/services/memberServices";
import UploadPic from "@/components/UploadPic.vue";

export default {
	props: ["id"],
	components: {
		AdminFab,
		UploadPic,
	},
	data() {
		return {
			person: new Person({ f_name: "Default", l_name: "Name" }),
		};
	},
	methods: {
		cancel() {
			this.$router.back();
		},
		save() {
			memberServices.update(this.id, this.person).then((response) => {
				console.log(response);
				this.$router.back();
			});
		},
	},
	mounted() {
		memberServices.get(this.id).then((response) => {
			this.person = new Person(response.data.data);
		});
	},
};
</script>

<style>
</style>