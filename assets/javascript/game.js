//set up variables
var currentWord = "James Harden";
var currentGuess = "";
var numOfGuessLeft = 12;
var lettersGuessed = [];
var gameOver = true;
var wins = 0;
var guessAllLettersInWord = false;
var endGameMessage = "";

//DOM variables
document.onkeyup = checkKeyPress;
var main = document.getElementById("main");
var docWins = document.getElementById("wins");

newGame();

//set up new game
function newGame (){
	gameOver = false;
	currentWord = currentWord.toLowerCase();
	numOfGuessLeft = 12;
	lettersGuessed = [];
	guessAllLettersInWord = false;
	endGameMessage = "";
	updateScreen();
}

//when the user presses a key
function checkKeyPress(event) {
	//if the game is over then start a new a game
	if(gameOver){
		console.log("new game");
		return newGame();
	}
	//if keypress is alphanumeric then check letter
	console.log(event.keyCode)
	if(event.keyCode >= 65 && event.keyCode <= 90){
		console.log("check letter");
		checkLetter(event.key.toLowerCase());
	}
}

//check to see if letter is in word
function checkLetter(letter){
	//if letter is already guessed - do nothing and exit
	if(lettersGuessed.indexOf(letter) >= 0){
		console.log("letter already guessed");
		return;
	}
	//if letter isn't in the word then increase number of wrong guess
	if(currentWord.indexOf(letter) < 0) {
		numOfGuessLeft--;
	}
	//add letter to lettersGuessed
	lettersGuessed.push(letter);

	//check if all letters are guessed - regex to remove space - split for array - every to test if every letter in word has been guessed
	guessAllLettersInWord = currentWord.replace(/\s+/g, '').split("").every(function(letter){
	    return lettersGuessed.indexOf(letter)>=0;
	});

	updateGameStatus();

	updateCurrentGuess();
	updateScreen();
}

function updateCurrentGuess(){
	currentGuess = "";
	currentWord.split("").forEach(function(letter){
		//if space add space
		if(letter === ' '){
			currentGuess += '&nbsp &nbsp';
		}
		else if (lettersGuessed.indexOf(letter) >= 0){
			currentGuess += letter + " ";
		}
		else {
			currentGuess += '_ ';
		}
	})
	console.log("Current guess is: " + currentGuess);
};

function updateScreen(){
	var html ="";

	if(gameOver){
		html = endGameMessage + "<p>Press any key to start</p>";
	}

	//show total wins
	docWins.innerHTML =  "<strong>Wins:</strong> " + wins;

	//show numOf Guess
	html = html + "<p>Number of guesses left: " + numOfGuessLeft + "</p>";
	
	//show word
	html = html + "<p>Current Word: </p><p>" + currentGuess + "</p>";

	//show guesses
	html = html + "<p>Letters: </p><p>" + lettersGuessed + "</p>";

	//update screen
	main.innerHTML = html;
}

//check if win or loss and set status accordingly
function updateGameStatus(){
	if(guessAllLettersInWord){
		wins++;
		gameOver = true;
		endGameMessage = "<h1> Winner winner chicken dinner! </h1>"
	}
	if(numOfGuessLeft===0){
		gameOver = true;
		endGameMessage = "<h1> You lost. Try again </h1>";
	}
}


//end game
	//show picture of player
	//show final word
	//update win if necessary
	//set gameover





