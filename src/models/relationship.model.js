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
  
  id = undefined;
  type1 = undefined;
  type2 = undefined;
  person1Id = undefined;
  person2Id = undefined;

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

  deepEqual(object2) {
    const keys1 = Object.keys(this);
    const keys2 = Object.keys(object2);
  
    if (keys1.length !== keys2.length) {
      return false;
    }
  
    for (const key of keys1) {
      const val1 = this[key];
      const val2 = object2[key];
      const areObjects = isObject(val1) && isObject(val2);
      if (
        areObjects && !deepEqual(val1, val2) ||
        !areObjects && val1 !== val2
      ) {
        return false;
      }
    }
  
    return true;
  }
  
}

function isObject(object) {
  return object != null && typeof object === 'object';
}

export default Relationship;
