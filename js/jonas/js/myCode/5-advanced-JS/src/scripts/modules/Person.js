export class Person {
    constructor(name, weight, height) {
        this.name = name;
        this.weight = weight;
        this.height = height;
        this.isTall = this.height > 1.8 ? true : false;
        this.element = $(`.${name}`).css(`background`, `black`);
    }

    getBMI() {
        return this.BMI = this.weight / this.height ** 2;
    }

    logMessage() {
        console.log(this.name);
    }
}
