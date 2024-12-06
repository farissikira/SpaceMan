var programing_languages = [
    "dancing",
    "computer",
    "architecture",
    "elephant",
    "plate",
    "nose",
    "experience",
    "manifacture",
    "pillow",
    "javascript",
    "laptop",
    "processor",
    "array",
    "orange",
    "inteligence",
    "paper",
    "notebook",
    "chair",
    "pasta",
    "backpack",
    "moon",
    "planet",
    "exploring",
    "raining",
    "jacket",
    "hangman"
];


let answer = "";
let maxWrong = 6;
let mistakes = 0;
let guessed = [];
let wordStatus = null;




function randomWord() {
    answer = programing_languages[Math.floor(Math.random() * programing_languages.length)].trim();
}


function generateButtons() {
    let buttonsHTML = 'abcdefghijklmnoprstuvzyx'.split('').map(letter =>
        `

        <button
            class="btn btn-lg btn-primary m-2"
            id='` + letter + `'
            onClick="handleGuess('`+ letter + `')"
             >
             `+ letter + `
        </button >


        `).join('');
    document.getElementById('keyboard').innerHTML = buttonsHTML;


}

function handleGuess(chosenLetter) {
    guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
    document.getElementById(chosenLetter).setAttribute('disabled', true);


    if (answer.indexOf(chosenLetter) != -1) {
        guessedWord();
        checkIfGameWon();

    }
    else if (answer.indexOf(chosenLetter) === -1) {
        mistakes++;
        updateMistakes();
        checkIfGameLost();
        updateHangmanPicture();
    }
}

function updateHangmanPicture() {
    document.getElementById('hangmanPic').src = './images/' + mistakes + '.jpg'
}





function guessedWord() {

    wordStatus = answer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : "__")).join(' ');
    document.getElementById('wordSpotlight').innerHTML = wordStatus;


    if (wordStatus === answer) {
        document.getElementById('wordSpotlight').style.fontSize = "48px";
    }
}


function updateMistakes() {
    document.getElementById('mistakes').innerHTML = mistakes;
}

function checkIfGameWon() {

    if (!wordStatus.includes('_')) {


        document.getElementById('keyboard').innerHTML = '<span style="font-size: 48px; font-weight: bold;">You Won</span>';
        document.querySelector('.guess-word').style.display = 'none';

    }

}


function checkIfGameLost() {
    if (mistakes === maxWrong) {
        document.getElementById('wordSpotlight').innerHTML = '<span style="font-size: 48px; font-weight: bold;">The answer was ' + answer + '</span>';
        document.getElementById('keyboard').innerHTML = '<span style="font-size: 48px; font-weight: bold;">You Lost</span>';
        document.querySelector('.guess-word').style.display = 'none';


    }
}



function reset() {
    mistakes = 0;
    guessed = [];
    document.getElementById('hangmanPic').src = './images/0.JPG';

    document.querySelector('.guess-word').style.display = 'block';

    randomWord();
    guessedWord();
    updateMistakes();
    generateButtons();
}



randomWord();
generateButtons();
guessedWord();