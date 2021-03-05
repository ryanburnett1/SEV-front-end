<template>
	<validation-observer ref="observer" v-slot="{ invalid, validated }">
		<v-container>
			<v-card>
				<v-toolbar dark color="primary" dense flat>
					<v-toolbar-title class="text-body-2 font-weight-bold white--text">
						Password Reset
					</v-toolbar-title>
				</v-toolbar>
				<v-form class="ma-2 pa-2">
					<validation-provider
						name="password"
						rules="required"
						v-slot="{ errors, valid }"
						vid="con"
					>
						<v-text-field
							v-model="password"
							color="secondary"
							:error-messages="errors"
							:success="valid"
							label="Password"
							:type="show ? 'text' : 'password'"
							prepend-icon="mdi-lock"
							tabindex="1"
							autofocus
							@keydown.enter="$refs.confirmField.focus"
						>
							<template v-slot:append>
								<v-btn icon @click="show = !show" tabindex="3">
									<v-icon v-if="show">mdi-eye</v-icon>
									<v-icon v-else>mdi-eye-off</v-icon>
								</v-btn>
							</template>
						</v-text-field>
					</validation-provider>
					<validation-provider
						name="passwordConfirm"
						rules="required|confirmed:con"
						v-slot="{ errors, valid }"
					>
						<v-text-field
							ref="confirmField"
							v-model="passwordConfirm"
							color="secondary"
							:error-messages="errors"
							:success="valid"
							label="Renter Password"
							:type="show ? 'text' : 'password'"
							prepend-icon="mdi-lock"
							@keydown.enter="$refs.resetButton.$el.click"
							tabindex="2"
						>
							<template v-slot:append>
								<v-btn icon @click="show = !show" tabindex="4">
									<v-icon v-if="show">mdi-eye</v-icon>
									<v-icon v-else>mdi-eye-off</v-icon>
								</v-btn>
							</template>
						</v-text-field>
					</validation-provider>
					<v-divider class="mb-2"></v-divider>
					<v-btn
						ref="resetButton"
						:disabled="invalid || !validated"
						color="success"
						@click="reset()"
						tabindex="5"
						>Reset</v-btn
					>
				</v-form>
			</v-card>
		</v-container>
	</validation-observer>
</template>

<script>
import rest from "@/services/restServices";

import { ValidationObserver, ValidationProvider } from "vee-validate";

export default {
	props: {
		id: {
			type: Number,
			default: -1,
		},
		token: {
			type: String,
			default: "",
		},
	},
	components: {
		ValidationObserver,
		ValidationProvider,
	},
	data() {
		return {
			show: false,
			password: "",
			passwordConfirm: "",
		};
	},
	methods: {
		reset() {
			rest
				.create("/user/" + this.id + "/password-reset", {
					token: this.token,
					password: this.password,
				})
				.then(res => {
					console.log(res);
					console.log("add automatic login in PasswordReset.vue");

					this.$router.replace("/");
				});
		},
	},
};
</script>

<style></style>
