// import Group from "@/models/group.model";

class Group {
  id = null;
  name = null;
  people = [];

  constructor(group) {
    if (group) {
      this.id = group.id;
      this.name = group.name;
      this.people = group.person;
    }
  }

  // constructor(group, cur_group) {
  //     if(group) {
  //         this.group_name = group.group_name;
  //     }

  //     if(cur_group) {
  //         this.group = cur_group;
  //     }
  // }

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
