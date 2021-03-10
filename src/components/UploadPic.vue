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
import MemberService from "@/services/memberServices";

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
      filePath: null,
      fileName: "",
    };
  },
  methods: {
    //What happens when they chooose the file
    onFileSelected() {
      let reader = new FileReader();
      reader.onload = e => this.$emit("onFileSelected", e.target.result);
      reader.readAsDataURL(this.selectedFile);
    },
    //sets what data you are sending to backend
    onUploadFile() {
      const formData = new FormData();
      formData.append("file", this.selectedFile); // appending file
      // sending file to the backend
      //axios
      MemberService.uploadImage(formData)
        .then(res => {
          this.fileName = res.data.data.name;
          this.filePath = process.env.VUE_APP_IMAGE_PATH + this.fileName;
          console.log("test");
        })
        .catch(err => {
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
