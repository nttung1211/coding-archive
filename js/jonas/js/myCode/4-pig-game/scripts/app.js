let panel0 = document.querySelector(`.player-0-panel`),
    panel1 = document.querySelector(`.player-1-panel`),
    btnRoll = document.querySelector(`.btn-roll`),
    btnHold = document.querySelector(`.btn-hold`),
    btnNew = document.querySelector(`.btn-new`),
    dice1 = document.querySelector(`#dice-1`),
    dice2 = document.querySelector(`#dice-2`),
    currentScore,
    scores,
    turn = 0,
    prevResult,
    isPlaying;

init();

btnNew.addEventListener(`click`, init);

btnRoll.addEventListener(`click`, () => {
    if (isPlaying) {
        let diceResult1 = Math.floor(Math.random() * 6 + 1);
        dice1.src = `dice-${diceResult1}.png`;
        let diceResult2 = Math.floor(Math.random() * 6 + 1);
        dice2.src = `dice-${diceResult2}.png`;
        dice1.classList.remove(`hidden`);
        dice2.classList.remove(`hidden`);
        if ((diceResult1 + diceResult2) === 12 && prevResult === 12) {
            scores[turn] = 0;
            document.getElementById(`score-${turn}`).textContent = 0;
            nextPlayer();
        } else if (diceResult1 === 1 || diceResult2 === 1) {
            nextPlayer();
        } else {
            currentScore += (diceResult1 + diceResult2);
            document.getElementById(`current-${turn}`).textContent = currentScore;
            prevResult = (diceResult1 + diceResult2);
        }
    }
})

btnHold.addEventListener(`click`, () => {
    if (isPlaying) {
        document.getElementById(`score-${turn}`).textContent = scores[turn] += currentScore;
        let finalScore = document.querySelector(`.final-score`).value;
        if (scores[turn] >= (finalScore ? finalScore : 50)) {
            isPlaying = false;
            document.getElementById(`name-${turn}`).textContent = `Winner!`;
            document.querySelector(`.player-${turn}-panel`).classList.add(`winner`);
            document.querySelector(`.player-${turn}-panel`).classList.remove(`active`);
            dice1.classList.add(`hidden`);
            dice2.classList.add(`hidden`);
        } else {
            nextPlayer();
        }
    }
})

function nextPlayer() {
    prevResult = 0,
    currentScore = 0;
    document.getElementById(`current-${turn}`).textContent = currentScore;
    turn = turn === 1 ? 0 : 1;
    [panel0, panel1].forEach(panel => panel.classList.toggle(`active`));
    // dice1.classList.add(`hidden`);
    // dice2.classList.add(`hidden`);
}

function init() {
    isPlaying = true;
    document.querySelector(`.player-${turn}-panel`).classList.remove(`winner`);
    document.getElementById(`name-${turn}`).textContent = `Player ${turn + 1}`;
    document.querySelectorAll(`#current-0, #current-1, #score-0, #score-1`).forEach(item => item.textContent = 0);
    currentScore = 0;
    turn = 0;
    scores = [0, 0];
    prevResult = 0,
    panel0.classList.add(`active`);
    panel1.classList.remove(`active`);
    dice1.classList.add(`hidden`);
    dice2.classList.add(`hidden`);
}

/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/