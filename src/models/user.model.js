import Person from "@/models/person.model";

class User {
  id = null;
  username = null;
  password = null;
  email = null;
  role = null;
  personId = null;
  person = new Person({});

  constructor(user, person) {
    if (user) {
      this.username = user.username;
      this.password = user.password;
      this.email = user.email;
      this.personId = user.personId;
      this.role = user.role;
    }

    if (person) {
      this.person = person;
    }
  }

  fullName() {
    return this.person.firstName + " " + this.person.lastName;
  }

  updateDate() {
    this.person.updatedAt = Date.now();
  }

  getRoles() {
    return ["None", "Admin", "User"];
  }
}

export default User;
