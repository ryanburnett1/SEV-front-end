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
      this.id = user.id;
      this.email = user.email;
      this.role = user.role;
      this.password = user.password;
      this.salt = user.salt;
      this.personId = user.personId;
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
