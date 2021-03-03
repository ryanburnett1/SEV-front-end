/* eslint-disable */

class Person {
  id = 0;
  f_name = "";
  l_name = "";
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
      this.f_name = person.f_name;
      this.l_name = person.l_name;
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
    return this.f_name + " " + this.l_name;
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
    return ["m", "f", "other"];
  }

  maritalStatusOptions() {
    return ["married", "divorced", "seperated", "unmarried", "widowed"];
  }

  statusOptions() {
    return ["active", "inactive", "disabled"];
  }
}

export default Person;
