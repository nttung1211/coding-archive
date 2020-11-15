/* Challenge 1 */
class Person {
    constructor(name, weight, height) {
        this.name = name;
        this.weight = weight;
        this.height = height;
        this.isTall = this.height > 1.8 ? true : false;
    }

    getBMI() {
        return this.BMI = this.weight / this.height ** 2;
    }
}

function compareBMI(per1, per2) {
    console.log(`${per1.name} has ${per1.getBMI() > per2.getBMI() ? `a higher BMI than` 
    : per1.BMI < per2.BMI ? `a lower BMI than` 
    : `the same BMI as`} ${per2.name}.`);
}

let Mark = new Person(`Mark`, 70, 1.70);
let John = new Person(`John`, 70, 1.70);
compareBMI(Mark, John);

switch (true) {
    case Mark.isTall:
        console.log(`${Mark.name} is tall.`);
        break;
    case John.isTall:
        console.log(`${John.name} is tall.`);
}


/* Challenge 2 */

class Team {
    constructor(name, ...scores) {
        this.name = name;
        this.scores = scores;
    }

    getAverageScore() {
        let totalScore = this.scores.reduce((totalScore, score) => totalScore += score);
        return totalScore / this.scores.length;
    }
}

function highestScore(...teams) {
    let max = teams.reduce((max, team) => {
        if (team.getAverageScore() > max) {
            max = team.getAverageScore();
        }
        return max;
    }, 0);

    let highestScoreTeams = teams.filter(team => {
        if (team.getAverageScore() === max) {
            return true;
        }
    })

    return [max, highestScoreTeams]
}

let Tung = new Team(`Tung`, 60, 40, 50, 80);
let Lan = new Team(`Lan`, 80, 40, 50, 80);
let Cuong = new Team(`Cuong`, 90, 40, 50, 80);
let Xuan = new Team(`Xuan`, 90, 40, 50, 80);

let [max, highestScoreTeams] = highestScore(Tung, Lan, Cuong, Xuan);

let highestScoreTeams_Name = highestScoreTeams.map(team => team.name);

if (highestScoreTeams.length > 1) {
    console.log(`It is a draw! team of ${highestScoreTeams_Name.join(`, `)} all have ${max} points.`);
} else {
    console.log(`${highestScoreTeams_Name}'s team has the highest score of ${max} points:`);
}


////        ARRAY
// let tung = [1, 2, 3, 4]
// tung[tung.length] = 5;
// tung[8] = 9;
// console.log(tung);
// console.log(tung[6]);

// var x = 10;
// var y = 20;
// var z = "30";
// var result = x + y + z;
// console.log(result); // 30 30


/* CHALLENG 3 */
import { Bill } from './modules/Bill.js';

let JohnBills = new Bill(124, 48, 268);
console.log(JohnBills.getTipsAndTotals());
let [,[,secondTotal]] = JohnBills.getTipsAndTotals();
console.log(secondTotal);


// ////    OBJECT

// let Student = {
//     name : `tung`,
//     greeting() {
//         console.log(this.name);
//     }
// }
// Student.greeting();

/* CHALLENGE 4 */

function getAverage(items) {
    let sum = items.reduce((sum, item) => sum += item);
    return sum / items.length; 
}
console.log(getAverage(JohnBills.getTips()));