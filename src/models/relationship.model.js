/* eslint-disable */

class Relationship {
  id = 0;
  RELS = {
    Female: [
      "Sister",
      "Daughter",
      "Mother",
      "Wife",
      "Grandmother",
      "Granddaughter",
    ],
    Male: [
      "Brother",
      "Son",
      "Father",
      "Husband",
      "Grandfather",
      "Grandson",
    ]
  };

  constructor(relationship) {
    if (relationship) {
      // just take all variables from person json
      // change later -- just got tired of all fields not showing
      for (let v in relationship) {
        if (relationship[v]) {
          this[v] = relationship[v]; 
        }
      }
    }
  }

  updateDate() {
    this.updatedAt = Date.now();
  }

  sexOptions() {
    return ["Male", "Female"];
  }
}

export default Relationship;
