let inputs = document.querySelector(".inputs")
let typeInput = document.querySelector(".type-input")
let hint = document.querySelector(".game-content p:first-child")
let wrongLetter = document.querySelector(".game-content p:last-child")
let letterGuessesInner = document.querySelector(".game-content p:nth-child(2)")
let resetBtn = document.querySelector(".box button")
let word, letterGuesses, corrects = [], incorrects = []

let randomWord = () => {
    let randomObj = wordList[Math.floor(Math.random() * wordList.length)]
    word = randomObj.word
    console.log(word);
    letterGuesses = 8, corrects = [], incorrects = []
    letterGuessesInner.innerHTML = `Qalan təxmin haqqı: ${letterGuesses}`
    wrongLetter.innerHTML = `Yanlış hərflər:${incorrects}`
    hint.innerHTML = `Ipucu: ${randomObj.hint}   `
    let wordInput = " "
    for (i = 0; i < word.length; i++) {
        wordInput += `<input type="text"   disabled>  `
    }
    inputs.innerHTML = wordInput
}
randomWord()

function game(e) {
    let key = e.target.value
    if (key.match(/^[A-Za-z]+$/) && !incorrects.includes(` ${key}`) && !corrects.includes(key)) {
        if (word.includes(key)) {
            for (i = 0; i < word.length; i++) {
                if (word[i] == key) {
                    inputs.querySelectorAll("input")[i].value = key
                    corrects.push(key)
                }
            }

        }
        else {
            letterGuesses--
            incorrects.push(` ${key}`)
        }
        letterGuessesInner.innerHTML = `Qalan təxmin haqqı: ${letterGuesses}  `
        wrongLetter.innerHTML = `Yanlış hərflər:${incorrects}`
    }
    typeInput.value = ""
    setTimeout(() => {
        if (corrects.length === word.length) {
            alert("Təbriklər! siz oyunu qazandınız.")
            randomWord()
        }
        else if (letterGuesses < 1) {
            alert("Təəssüf ki, siz oyunu uduzdunuz.")
            for (i = 0; i < word.length; i++) {
                inputs.querySelectorAll("input")[i].value = word[i]
            }
        }
    })
}

resetBtn.addEventListener("click", randomWord)
typeInput.addEventListener("input", game)
document.addEventListener("keydown", () => { typeInput.focus() })
// Telefonda inputa fokuslanmaq üçün
inputs.addEventListener("click", () => { typeInput.focus() })

