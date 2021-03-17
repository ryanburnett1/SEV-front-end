/* eslint-disable */

class Family {
  id = 0
  address = ""
  email = ""
  members = [] // person IDs
  name = ""
  phone = ""
  picture = ""
  status = this.statusOptions()[0];

  constructor(family, members) {
    if (family) { 
      for (let v in family) {
        if (family[v]) {
          this[v] = family[v];
        }
      }
    }

    if (members && members.length > 0) { 
      this.members = members;
    }

  }

  statusOptions() {
    return ["Active", "Inactive", "Disabled", "Relocated"];
  }

}

export default Family;