import Person from "@/models/person.model";

class Group {
  id = null;
  name = null;
  people = [];

  constructor(group) {
    if (group) {
      console.log("group constructor");
      console.log(group);
      this.id = group.id;
      this.name = group.name;
      group.person.forEach(person => {
        this.people.push(new Person(person));
      });
    }
    else{
      console.log("something???");
    }
  }

  group_name() {
    return this.group.name;
  }

  group_people() {
    //how to return all people in the group?
    return this.people;
  }

  group_leader() {
    return this.people.map(x => x.id);
    //what will our role index be for group leader?
    //return person_arr[leader_index];
  }
}

export default Group;
