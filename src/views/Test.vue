<template>
	<div>
		<confirmation-dialog ref="confirm" />
		<v-btn
			@click="
				testDialog();
				messages++;
			"
			>Delete?</v-btn
		>

		<v-badge :content="messages" :value="messages" color="green" overlap>
			<v-icon large> mdi-vuetify </v-icon>
		</v-badge>

		<v-container>
			<v-row>
				<member-card
					class="ma-1"
					v-for="person in members"
					:key="person.id"
					:data="person"
					@click.native="printInfo(person)"
				></member-card>
			</v-row>
		</v-container>
	</div>
</template>

<script>
// @ is an alias to /src
import ConfirmationDialog from "@/components/ConfirmationDialog.vue";
import MemberCard from "@/components/MemberCard.vue";

export default {
	name: "Test",
	components: {
		ConfirmationDialog,
		MemberCard,
	},
	data() {
		return {
			messages: 0,
			members: [
				{
					name: "Jason",
					info: "test",
					id: "-5",
					image: "https://picsum.photos/1920/1080?random",
					disabled: false,
				},
				{
					name: "Lane",
					info: "test",
					id: "-4",
					image: "https://picsum.photos/1920/1080?random",
					disabled: true,
				},
				{
					name: "Nathan",
					info: "test",
					id: "-6",
					image: "https://picsum.photos/1920/1080?random",
					disabled: false,
				},
				{
					name: "Ryan",
					info: "test",
					id: "-69",
					image: "https://picsum.photos/1920/1080?random",
					disabled: false,
				},
			],
		};
	},
	methods: {
		async testDialog() {
			let message = "";
			for (let i = 0; i < 500; i++) {
				message +=
					"Are you sure delete record: " + Math.ceil(Math.random()) + "?\n";
			}

			// get info about operation here and craft message
			if (
				await this.$refs.confirm.open("Confirm Delete", message, {
					// persistent: true,
					// noconfirm: true,
					color: "primary",
					confirmText: "Delete",
					confirmColor: "error",
					cancelColor: "success",
					// width: this.$vuetify.breakpoint.width,
				})
			) {
				this.test(); // call function to do operation
			}
		},
		test() {
			console.log("Confirmation Confirmed From Dialog");
		},
		printInfo(person) {
			console.log(person);
		},
	},
};
</script>

<style>
</style>