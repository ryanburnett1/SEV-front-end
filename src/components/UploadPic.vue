<template>
  <div class="file-upload">
    <input type="file" @change="onFileChange" />
    <button @click="onUploadFile" class="upload-button"
    :disabled="!this.selectedFile">Upload file</button>
  </div>
</template>

<style scoped>
.file-upload {
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
}
</style>

<script>
//import axios from "axios";
import MemberService from "@/services/memberServices";

export default {
  data() {
    return {
      selectedFile: "",
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
      console.log("Selected file: " + this.selectedFile);
      const formData = new FormData();
      formData.append("file", this.selectedFile);  // appending file
      console.log("Trying to upload picture");
     // sending file to the backend
      //axios
        MemberService.uploadImage(1, formData)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>