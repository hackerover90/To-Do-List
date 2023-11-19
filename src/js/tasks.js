class Task {
    name; priority; date; description; completed = false;
    constructor(name, priority, date, description) {
        //make sure task names are different
        this.name = name
        this.priority = priority
        this.date = date
        this.description = description
    }

    get name() {return this.name}
    get priority() {return this.priority}
    get date() {return this.date}
    get description() {return this.description}

    set name(value) {this.name = value}
    set priority(value) {this.priority = value}
    set date(value) {this.date = value}
    set description(value) {this.description = value}
}

export default Task