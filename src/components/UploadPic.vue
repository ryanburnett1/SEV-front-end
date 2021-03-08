<template>
	<v-file-input
		label="Profile Picture"
		color="secondary"
		:rules="rules"
		accept="image/png, image/jpeg, image/bmp, image/gif"
		prepend-inner-icon="mdi-camera"
		prepend-icon=""
		show-size
		outlined
		dense
		counter
		:value="[]"
		:clearable="false"
		v-model="selectedFile"
		@change="onFileSelected"
	></v-file-input>
</template>

<script>

export default {
	data() {
		return {
			selectedFile: null,
			rules: [
				value =>
					!value ||
					value.size < 2000000 ||
					"Avatar size should be less than 2 MB!",
			],
		};
	},
	methods: {
		//What happens when they chooose the file
		onFileSelected() {
			let reader = new FileReader();
			reader.onload = e => this.$emit("onFileSelected", e.target.result);
			reader.readAsDataURL(this.selectedFile);
		},
	},
};
</script>