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

  getPicturePath() {
    if (this.picture == "") return "no-image";
    if (this.picture == "RANDOM") return "https://picsum.photos/300?random";
    return process.env.VUE_APP_IMAGE_PATH + this.picture;
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

  statusOptions() {
    return ["Active", "Inactive", "Disabled", "Relocated"];
  }

  getPicturePath() {
    if (this.picture == "") return "no-image";
    if (this.picture == "RANDOM") return "https://picsum.photos/300?random";
    return process.env.VUE_APP_IMAGE_PATH + this.picture;
  }
}

export default Family;