/* eslint-disable */

class Person {
  id = 0;
  firstName = "";
  lastName = "";
  phone_number = "";
  picture = "";
  sex = "";
  marital_status = "";
  status = "";
  title = "";
  skill = [];

  constructor(person) {
    if (person) {
      this.id = person.id;
      this.firstName = person.firstName;
      this.lastName = person.lastName;
      this.phone_number = person.phone_number;
      this.picture = person.picture;
      this.sex = person.sex;
      this.marital_status = person.marital_status;
      this.status = person.status;
      this.title = person.title;
      this.skill = person.skill;
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
