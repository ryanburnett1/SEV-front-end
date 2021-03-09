// import Group from "@/models/group.model";

class Group {
  id = null;
  group_name = null;
  group = new Group({});
  person_arr = [];

  constructor(group, cur_group) {
    if (group) {
      this.group_name = group.group_name;
    }

    if (cur_group) {
      this.group = cur_group;
    }
  }

  group_name() {
    return this.group.group_name;
  }

  group_people() {
    //how to return all people in the group?
    return this.person_arr.map(x => x.id);
  }

  group_leader() {
    this.person_arr.map(x => x.id);
    //what will our role index be for group leader?
    //return person_arr[leader_index];
  }
}

export default Group;
