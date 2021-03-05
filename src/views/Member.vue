<template>
	<v-container>
		<v-row class="ma-2 pa-2" justify="center">
			<v-card flat>
				<h4>
					<b>
						<i> Family Photo here: </i>
					</b>
				</h4>
				<v-img
					:src="require('@/assets/images/placeholder_1920x1080.png')"
					class="align-end"
				>
					<v-container fluid>
						<v-row>
							<v-col cols="0" xl="2" lg="2" md="3" sm="3" xs="3">
								<v-avatar size="150">
									<v-img :src="person.picture"></v-img>
								</v-avatar>
							</v-col>
							<v-col align-self="center">
								<h1>
									{{ person.fullName() }}
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
						<v-col cols="6">Email: {{ user.email }}</v-col>
						<v-col cols="6">Preferred Name: {{ person.preferredName }}</v-col>
						<v-col cols="6">Phone: {{ person.maskPhoneNumber() }}</v-col>
						<v-col cols="6">birthday: {{ person.birthday }}</v-col>
					</v-row>
				</v-container>
			</v-card>
		</v-row>
		<v-row class="ma-2 pa-2" justify="center">
			<v-card width="100%">
				<v-card-title>Family:</v-card-title>
				<v-divider></v-divider>
				<v-container fluid>
					<v-row>
						<v-col cols="6" v-for="i in 10" :key="i"> test </v-col>
					</v-row>
				</v-container>
			</v-card>
		</v-row>
	</v-container>
</template>

<script>
import Person from "@/models/person.model";
import User from "@/models/user.model";
import MemberService from "@/services/memberServices";
import UserService from "@/services/userServices";

export default {
	props: ["id"],
	data() {
		return {
			user: new User(),
			person: new Person(),
			family: [],
		};
	},
	computed: {},
	mounted() {
		MemberService.get(this.id).then(response => {
			this.person = new Person(response.data.data);
		});
		UserService.getByPerson(this.id).then(res => {
			console.log(res);
			this.user = new User(res.data.data[0]);
		});
	},
};
</script>

<style></style>
