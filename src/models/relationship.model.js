/* eslint-disable */

class Relationship {
  static relationshipOptions = {
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
  }
  
  id = 0;

  constructor(relationship) {
    if (relationship) {
      this.id = relationship.id;
      this.type1 = relationship.type1;
      this.type2 = relationship.type2;
      this.person1Id = relationship.person1Id;
      this.person2Id = relationship.person2Id;
    }
  }

  sexOptions() {
    return ["Male", "Female"];
  }
}

export default Relationship;
