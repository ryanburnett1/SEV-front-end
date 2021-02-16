class Person {
    id = null
    f_name = ""
    l_name = ""
    phone = ""
    spouse = ""
    createdAt = ""
    updatedAt = ""

    constructor(f_name, l_name, phone, spouse, createdAt, updatedAt) {
        this.f_name = f_name
        this.l_name = l_name
        this.phone = phone
        this.spouse = spouse
        this.createdAt = createdAt
        this.updatedAt = updatedAt
    }

    // toJSON() {
    //     return JSON.stringify(this);
    // }
}

export default Person;