<template>
	<v-file-input
		label="Profile Picture"
		:rules="rules"
		placeholder="Pick a new profile image"
		accept="image/png, image/jpeg, image/bmp, image/gif"
		prepend-inner-icon="mdi-camera"
		prepend-icon=""
		show-size
		outlined
		dense
		counter
		v-model="selectedFile"
		@change="onUploadFile"
	/>
</template>

<script>
//import axios from "axios";
import MemberService from "@/services/memberServices";

export default {
	props: {
		userId: {
			type: Number,
			default: 0,
		},
	},
	data() {
		return {
			selectedFile: "",
			rules: [
				(value) =>
					!value ||
					value.size < 2000000 ||
					"Avatar size should be less than 2 MB!",
			],
			filePath: "",
			fileName: "",
		};
	},
	methods: {
		//What happens when they chooose the file
		onFileChange(e) {
			const selectedFile = e.target.files[0]; // Get file that use put into component
			this.selectedFile = selectedFile; //set it to the selected file in data so that onUploadFile can use it
		},
		//sets what data you are sending to backend
		onUploadFile() {
			const formData = new FormData();
			formData.append("file", this.selectedFile); // appending file
			// sending file to the backend
			//axios
			MemberService.uploadImage(this.userId, formData)
				.then((res) => {
					console.log(res);
					// this.filePath = res.data.path;
					this.fileName = res.data.name;

					this.filePath = process.env.VUE_APP_IMAGE_PATH + this.fileName;
					this.$emit("onImageUpload", this.filePath);
				})
				.catch((err) => {
					console.log(err);
				});
		},
	},
};
</script>

<style scoped>
/* .file-upload {
	box-shadow: 2px 2px 9px 2px #ccc;
	border-radius: 1rem;
	padding: 2rem;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	font-size: 1rem;
	width: 60%;
	margin: 0 auto;
}

input {
	font-size: 0.9rem;
}

input,
div,
button {
	margin-top: 2rem;
}

.upload-button {
	width: 7rem;
	padding: 0.5rem;
	background-color: #278be9;
	color: #fff;
	font-size: 1rem;
	font-weight: 500;
	cursor: pointer;
	border-radius: 1rem;
}

.upload-button:disabled {
	background-color: #b3bcc4;
	cursor: no-drop;
} */
</style>