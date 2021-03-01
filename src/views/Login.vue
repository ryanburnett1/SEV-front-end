<template>
	<validation-observer ref="observer" v-slot="{ invalid, validated }">
		<v-container>
			<v-card>
				<v-toolbar dark color="primary" dense flat>
					<v-toolbar-title class="text-body-2 font-weight-bold white--text">
						Login Form:
					</v-toolbar-title>
				</v-toolbar>
				<v-form class="ma-2 pa-2">
					<validation-provider
						name="email"
						rules="required|email"
						v-slot="{ errors, valid }"
					>
						<v-text-field
							v-model="user.email"
							:error-messages="errors"
							:success="valid"
							label="E-mail"
							type="email"
							prepend-icon="mdi-email"
						></v-text-field>
					</validation-provider>
					<validation-provider
						name="password"
						rules="required"
						v-slot="{ errors, valid }"
					>
						<v-text-field
							v-model="user.password"
							:error-messages="errors"
							:success="valid"
							label="Password"
							:type="show ? 'text' : 'password'"
							:append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
							prepend-icon="mdi-lock"
							@click:append="show = !show"
						></v-text-field>
					</validation-provider>
					<v-divider class="mb-2"></v-divider>
					<v-row class="ma-1 pa-1">
						<v-btn
							:disabled="invalid || !validated"
							color="success"
							@click="
								$store.dispatch('login', {
									email: user.email,
									password: user.password,
								})
							"
						>
							Login
						</v-btn>
						<v-spacer></v-spacer>
						<v-dialog v-model="dialog" persistent max-width="600px" eager>
							<template v-slot:activator="{ on, attrs }">
								<v-btn
									color="primary"
									dark
									v-bind="attrs"
									v-on="on"
									@click.stop="validateReset()"
								>
									Forgot Password
								</v-btn>
							</template>
							<validation-observer
								ref="resetobserver"
								v-slot="{ invalid, validated }"
							>
								<v-card>
									<v-card-title>
										<span class="headline">Reset Password</span>
									</v-card-title>
									<v-card-text>
										<v-container>
											<v-row>
												<v-col cols="12">
													<validation-provider
														name="email"
														rules="required|email"
														v-slot="{ errors, valid }"
													>
														<v-text-field
															v-model="resetEmail"
															:error-messages="errors"
															:success="valid"
															label="E-mail"
															type="email"
															prepend-icon="mdi-email"
														></v-text-field>
													</validation-provider>
												</v-col>
											</v-row>
										</v-container>
									</v-card-text>
									<v-card-actions>
										<v-spacer></v-spacer>
										<v-btn color="blue darken-1" text @click="dialog = false">
											Cancel
										</v-btn>
										<v-btn
											color="blue darken-1"
											text
											@click="
												dialog = false;
												sendResetRequest();
											"
											:disabled="invalid || !validated"
										>
											Send
										</v-btn>
									</v-card-actions>
								</v-card>
							</validation-observer>
						</v-dialog>
					</v-row>
				</v-form>
			</v-card>
		</v-container>
	</validation-observer>
</template>

<script>
import { mapActions } from "vuex";

import rest from "@/services/restServices";
import { ValidationObserver, ValidationProvider } from "vee-validate";

export default {
	components: {
		ValidationObserver,
		ValidationProvider,
	},
	data() {
		return {
			user: {
				email: "",
				password: "",
			},
			resetEmail: "",
			show: false,
			dialog: false,
		};
	},
	methods: {
		...mapActions("account", {
			login: "login",
		}),
		validateReset() {
			if (this.user.email) {
				this.resetEmail = Object.assign({}, this.user).email;
				this.$nextTick(() => {
					this.$refs.resetobserver.validate();
				});
			}
		},
		sendResetRequest() {
			console.log(this.user.email);
			rest
				.create(`/user/reset-password-request`, { email: this.resetEmail })
				.then((res) => {
					console.log(res);
					alert("thing sent");
				});
		},
	},
};
</script>

<style></style>
