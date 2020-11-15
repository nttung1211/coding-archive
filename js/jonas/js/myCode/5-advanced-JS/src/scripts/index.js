import '../css/main.scss';
import { Person } from './modules/Person.js';
import { Question } from './modules/Question.js';

let query = document.querySelector(`.query`),
    btn = document.querySelector(`.btn`),
    answer = document.querySelector(`#answer`),
    gotName = false;

function getQuestion(response) {
    if (response.indexOf(`teacher`) !== -1) {
        return () => {
            query.innerHTML = `What subject do you teach?`;
        }
    } else if (response.indexOf(`doctor`) !== -1) {
        return () => {
            query.innerHTML = `How have you been a doctor`;
        }
    } else {
        return () => {
            query.innerHTML = `Quit that job, please!`
        }
    }
}

function interview() {
    let response = answer.value;
    answer.value = '';
    if (response && !gotName) {
        gotName = true;
        query.innerHTML = `What do you do, ${response}?`;
    } else if (response && gotName) {
        getQuestion(response)();
    }
}

btn.addEventListener(`click`, interview);


// ////    BIND, CALL AND APPLY

// const John = {
//     name: `John`,
//     age: 27,
//     greeting(style, time) {
//         if (style === `formal`) {
//             console.log(`Good ${time}, ladies and gentlements! I am ${this.name}`);
//         } else {
//             console.log(`Good ${time}, what's up every body? I'm ${this.name}`);
//         }
//     }
// }


// const Jane = {
//     name: `Jane`
// }

// John.greeting.call(Jane, `formal`, `morning`);
// John.greeting.apply(Jane, [`formal`, `morning`]);
// let JaneCasual = John.greeting.bind(Jane, `casual`);    // turn a function into a new function with some preset arguments
// JaneCasual(`afternoon`);


////    CHALLENGE QUIZ

(function () {
    const queBank = [
        new Question(
            `What is the name of the main actor in Deadpool?`,
            [`Ryan Raynolds`, `Hugh Jackman`, `Wade Wilson`],
            `a`
        ),
        new Question(
            `Who is the most attractive guy in the wolrd alltime?`,
            [`Adam Levine`, `Tung`, `Clark Kent`],
            `b`
        ),
        new Question(
            `Which is the most popular programing language up until now?`,
            [`Javascript`, `Python`, `Java`],
            `b`
        )
    ];

    // function updateScore () {
    //     let score = 0;
    //     return (correct) => correct ? ++score : score;
    // }

    // function getQuestion() {
    //     let ranQue = queBank[Math.floor(Math.random() * queBank.length)];
    //     if (ranQue.isAnswered) {
    //         getQuestion();
    //     } else {
    //         return ranQue;
    //     }
    // }    // This fuction does not work because it will not return anything if the if statement is activated then ranQue in the main() will undefined

    /* ====================================== */
    /* if a function has multiple cases(if, else) and some of them call the function it self, and they have return statement, the return value will end up being the return value from the case of the first call of the function */
    /* ====================================== */

    let score = 0;

    function getQuestion() {
        let ranQue = queBank[Math.floor(Math.random() * queBank.length)];
        if (ranQue.isAnswered) {
            ranQue = getQuestion();
        }
        return ranQue;
    }

    function main(ranQue) {
        console.clear();
        if (score < queBank.length) {
            if (!ranQue) {
                ranQue = getQuestion();
            }
            ranQue.displayQuestion();
            console.log(`Your score: ${score}`);
            let inp = prompt(`Enter your answer here (just specify the number):`);
            if (inp === ranQue.key) {
                ranQue.isAnswered = true;
                score++;
                alert(`correct`);
                main();
            } else if (inp !== `exit`) {
                alert(`incorrect`);
                main(ranQue);
            } else {
                console.clear();
            }
        } else {
            alert(`Congratulation! You have just answered all the questions!`);
        }
    }

    main();
})();
/* BY DOING THIS WE HAVE PRIVATE CODE WHICH WILL NOT CONFLICT TO OTHER CODE WHATSOEVER */

// let queBank = 2;
// console.log(queBank);