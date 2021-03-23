/* eslint-disable */

class Person {
  id = 0;
  firstName = "";
  lastName = "";
  middleName = "";
  preferredName = "";
  phoneCell = "";
  picture = "";
  birthday = "";
  sex = "";
  marital_status = "";
  status = "";
  title = "";
  skill = [];

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
    return this.skill.map(skill => skill.id)
  }

  fullName() {
    return this.firstName + " " + this.lastName;
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

  sexOptions() {
    return ["Male", "Female"];
  }

  maritalStatusOptions() {
    return ["Married", "Divorced", "Seperated", "Unmarried", "Widowed"];
  }

  statusOptions() {
    return ["Active", "Inactive", "Disabled"];
  }
}

export default Person;
