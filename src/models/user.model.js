import Person from "@/models/person.model";

class User {
  id = null;
  username = "";
  password = "";
  email = "";
  role = "";
  personId = null;
  person = new Person({});

  constructor(user, person) {

    if (user) {
      this.username = user.username;
      this.password = user.password;
      this.email = user.email;
      this.personId = user.personId;
    }

    if (person) {
      this.person = person;
    }
  }

  fullName() {
    return this.person.f_name + " " + this.person.l_name;
  }

  updateDate() {
    this.person.updatedAt = Date.now();
  }
}

export default User;
