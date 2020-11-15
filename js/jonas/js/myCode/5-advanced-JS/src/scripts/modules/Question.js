export class Question {
    constructor(question, answers, key) {
        this.question = question;
        this.answers = answers;
        this.key = key;
        this.isAnswered = false;
    }

    displayQuestion() {
        console.log(this.question);
        for (let i = 0; i < this.answers.length; i++) {
            console.log(`${String.fromCharCode(97 + i)}. ${this.answers[i]}`);
        }
    }
}