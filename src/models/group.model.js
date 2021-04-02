import Person from "@/models/person.model";

class Group {
  id = null;
  name = null;
  person = [];
  picture = "";

  constructor(group) {
    if (group) {
      this.id = group.id;
      this.name = group.name;
      this.picture = group.picture;
      group.person.forEach(person => {
        this.person.push(new Person(person));
      });
    }
  }

  group_leader() {
    return this.person.map(x => x.id);
    //what will our role index be for group leader?
    //return person_arr[leader_index];
  }

  getPicturePath() {
    if (this.picture == "") return "no-image";
    if (this.picture == "RANDOM") return "https://picsum.photos/300?random";
    return process.env.VUE_APP_IMAGE_PATH + this.picture;
  }
}

export default Group;
