class Person {
    id = null
    f_name = ""
    l_name = ""
    phone_number = ""
    image = ""
    sex = ""
    marital_status = ""
    status = ""
    title = ""
    skill = []

    constructor(person) {
        this.id = person.id
        this.f_name = person.f_name
        this.l_name = person.l_name
        this.phone_number = person.phone_number
        this.image = person.image
        this.sex = person.sex
        this.marital_status = person.marital_status
        this.status = person.status
        this.title = person.title
        this.skill = person.skill
    }

    fullName() {
        return this.f_name + " " + this.l_name
    }

    updateDate() {
        this.updatedAt = Date.now();
    }

    sexOptions() {
        return ["m", "f", "other"]
    }

    maritalStatusOptions() {
        return ["married", "divorced", "seperated", "unmarried", "widowed"]
    }

    statusOptions() {
        return ['active', 'inactive', 'disabled']
    }
}

export default Person;