<template>
	<v-container>
		<v-form ref="form" v-model="valid" lazy-validation>
			<v-text-field
				v-model="user.email"
				:rules="emailRules"
				label="E-mail"
				type="email"
				required
			></v-text-field>
			<v-text-field
				v-model="user.password"
				label="Password"
				required
				type="password"
			></v-text-field>

			<v-btn
				:disabled="!valid"
				color="success"
				@click="
					$store.dispatch('login', {
						email: user.email,
						password: user.password,
					})
				"
				>Login</v-btn
			>
		</v-form>
	</v-container>
</template>

<script>
import { mapActions } from "vuex";

export default {
	data() {
		return {
			user: {
				email: "",
				password: "",
			},
			emailRules: [
				(v) => !!v || "Email is required",
				(v) =>
					/.+@.+\..+/.test(v) || "Email invalid, Try: emailName@provider.com",
			],
			valid: false,
		};
	},
	methods: {
		...mapActions("account", {
			login: "login",
		}),
	},
};
</script>

<style>
</style>