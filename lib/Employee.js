// TODO: Write code to define and export the Employee class

class Employee {
    //constructor function
    constructor(name, id, email){
        this.name = name;
        this.id = id;
        this.email = email;
        this.role = "Employee";
    }

    // functions
    getName(){
        return this.name;
    }

    getId(){
        return this.id;
    }

    getEmail(){
        return this.email;
    }

    getRole(){
        return this.role;
    }

};

module.exports = Employee;