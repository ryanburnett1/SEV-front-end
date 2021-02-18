class Person {
    id = null
    f_name = ""
    l_name = ""
    phone = ""
    spouse = ""
    createdAt = ""
    updatedAt = ""
    skill = []

    constructor(person) {
        console.log("COnst: ", person)
        this.id = person.id
        this.f_name = person.f_name
        this.l_name = person.l_name
        this.phone = person.phone
        this.spouse = person.spouse
        this.createdAt = person.createdAt
        this.updatedAt = person.updatedAt
        this.skill = person.skill
    }

    fullName() {
        return this.f_name + " " + this.l_name
    }

    updateDate() {
        this.updatedAt = Date.now();
    }
}

export default Person;