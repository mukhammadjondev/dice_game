const dice = document.querySelector('.dice') 
const btnNew = document.querySelector('.btn__new')
const btnRoll = document.querySelector('.btn__roll')
const btnHold = document.querySelector('.btn__hold')

dice.classList.add('hidden')

let currentScore = 0
let activePlayer = 0
let totalScore = [0, 0]
let gameOver = false

btnRoll.addEventListener('click', btnRollFunc)
btnHold.addEventListener('click', btnHoldFunc)
btnNew.addEventListener('click', btnNewFunc)

document.addEventListener('keydown', (e)=> {
    if(e.code == 'Space') {
        btnRollFunc()
    }
})

document.addEventListener('keydown', (e)=> {
    if(e.key == 'Enter') {
        btnHoldFunc()
    }
})

document.addEventListener('keydown', (e)=> {
    if(e.key == 'Backspace') {
        btnNewFunc()
    }
})

function btnRollFunc() {
    dice.classList.remove('hidden')

    const randomDice = Math.floor(Math.random() * 6) + 1
    if(!gameOver) {
        dice.src = `./image/dice-${randomDice}.png`
        currentScore += randomDice
        document.querySelector(`#current-${activePlayer}`).textContent = currentScore
        if (randomDice == 1) {
            switchPlayer()
        }
    }
}

function btnHoldFunc() {
    if(!gameOver) {
        totalScore[activePlayer] += currentScore
        document.querySelector(`#score-${activePlayer}`).textContent = totalScore[activePlayer]
        if(totalScore[activePlayer] >= 100) {
            gameOver = true
            document.querySelector('.player-0').classList.remove('player-active')
            document.querySelector('.player-1').classList.remove('player-active')
            document.querySelector(`.player-${activePlayer}`).classList.add('player-winner')
        } else {
            switchPlayer()
        }
    }
}

function switchPlayer() {
    document.querySelector(`#current-${activePlayer}`).textContent = 0
    activePlayer = activePlayer == 0 ? 1 : 0
    currentScore = 0
    document.querySelector('.player-0').classList.toggle('player-active')
    document.querySelector('.player-1').classList.toggle('player-active')
}

function btnNewFunc() {
    dice.classList.add('hidden')
    document.querySelector(`.player-0`).classList.remove('player-winner')
    document.querySelector('.player-0').classList.add('player-active')
    document.querySelector(`.player-1`).classList.remove('player-winner', 'player-active')
    document.querySelector(`#score-0`).textContent = 0
    document.querySelector(`#score-1`).textContent = 0
    document.querySelector(`#current-0`).textContent = 0
    document.querySelector(`#current-1`).textContent = 0
    currentScore = 0
    activePlayer = 0
    totalScore = [0, 0]
    gameOver = false
}