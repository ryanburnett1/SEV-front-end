/* eslint-disable */

class Person {
  id = 0;
  firstName = "None";
  lastName = "None";
  middleName = "None";
  preferredName = "None";
  phone_number = "";
  picture = "";
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

  getSkillIds() {
    return this.skill.map(skill => skill.id)
  }

  fullName() {
    return this.firstName + " " + this.lastName;
  }

  updateDate() {
    this.updatedAt = Date.now();
  }

  maskPhoneNumber() {
    let phone = String(this.phone_number);
    if (!phone) return "No Phone Number Available";

    let masked = "";
    masked += "(" + phone.substring(0, 3) + ") ";
    masked += phone.substring(3, 6) + "-";
    masked += phone.substring(6, 10);

    return masked;
  }

  sexOptions() {
    return ["Male", "Female", "other"];
  }

  maritalStatusOptions() {
    return ["Married", "Divorced", "Seperated", "Unmarried", "Widowed"];
  }

  statusOptions() {
    return ["Active", "Inactive", "Disabled"];
  }
}

export default Person;
