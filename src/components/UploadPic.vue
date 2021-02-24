<template>
  <v-file-input
    label="Profile Picture"
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
    @change="onUploadFile"
  ></v-file-input>
</template>

<script>
import MemberService from "@/services/memberServices";

export default {
  data() {
    return {
      selectedFile: [],
      rules: [
        value =>
          !value ||
          value.size < 2000000 ||
          "Avatar size should be less than 2 MB!"
      ],
      filePath: "",
      fileName: ""
    };
  },
  methods: {
    //What happens when they chooose the file
    onFileChange(e) {
      const selectedFile = e.target.files[0]; // Get file that use put into component
      this.selectedFile = selectedFile; //set it to the selected file in data so that onUploadFile can use it
    },
    //sets what data you are sending to backend
    async onUploadFile() {
      const formData = new FormData();
      formData.append("file", this.selectedFile); // appending file
      console.log("PrevFileName: " + this.prevFileName);
      if(this.prevFileName){
        console.log("there was a previous file");
        let prevFileNameJSON = this.prevFileName
        MemberService.deleteImage({prevFileNameJSON})
        .then(res => {
          console.log(res);
        })
        .catch(err =>{
          console.log(err);
        });
      }
      // sending file to the backend
      MemberService.uploadImage(formData)
        .then(res => {
          console.log(res);
          // this.filePath = res.data.path;
          this.fileName = res.data.name;
          this.filePath = process.env.VUE_APP_IMAGE_PATH + this.fileName;
          this.$emit("onImageUpload", this.filePath);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  props:['prevFileName']
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
