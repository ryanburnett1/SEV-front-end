/* eslint-disable */

class Person {
  id = 0;
  emailAddress = "";
  address = "";
  firstName = "";
  lastName = "";
  middleName = "";
  preferredName = "";
  phoneCell = "";
  picture = "";
  birthday = "";
  sex = "";
  marital_status = "";
  status = this.statusOptions()[0];
  title = "";
  receiveAnnouncements = true;
  skill = [];
  user = {};

  constructor(person) {
    if (person) {
      // just take all variables from person json
      // change later -- just got tired of all fields not showing
      for (let v in person) {
        if (person[v]) {
          this[v] = person[v];
        }
      }
    }
  }

  getPicturePath() {
    if (this.picture == "") return "no-image";
    if (this.picture == "RANDOM") return "https://picsum.photos/300?random";
    return process.env.VUE_APP_IMAGE_PATH + this.picture;
  }

  getSkillIds() {
    return this.skill.map(skill => skill.id);
  }

  fullName() {
    return this.firstName + " " + this.lastName;
  }

  email() {
    console.log(this)
    if(this.emailAddress){
      return this.emailAddress;
    }
    else {
      console.log("No email address Stored");
      return this.user.emailAddress;
    }
  }

  preferredName() {
    if (this.preferredName) {
      return this.preferredName;
    }

    return this.firstName;
  }

  preferredFullName() {
    if (this.preferredName) {
      return this.preferredName + " " + this.lastName;
    }

    return this.fullName();
  }

  updateDate() {
    this.updatedAt = Date.now();
  }

  maskPhoneNumber(phone_number) {
    let phone = String(phone_number);
    if (!phone) return "No Phone Number Available";

    let masked = "";
    masked += "(" + phone.substring(0, 3) + ") ";
    masked += phone.substring(3, 6) + "-";
    masked += phone.substring(6, 10);

    return masked;
  }

  cellPhoneNumber() {
    return this.phoneCell;
  }

  sexOptions() {
    return ["Male", "Female"];
  }

  maritalStatusOptions() {
    return ["Married", "Divorced", "Seperated", "Unmarried", "Widowed"];
  }

  statusOptions() {
    return ["Active", "Inactive", "Disabled", "Relocated", "Deceased"];
  }
}

export default Person;
