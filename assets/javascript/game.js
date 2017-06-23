//set up variables
var playerList = [
{
	name:"Ryan Anderson",
	picture:"http://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/201583.png"
},
{name:"Ryan Anderson",picture:"http://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/201583.png"},{name:"Trevor Ariza",picture:"http://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/2772.png"},{name:"Patrick Beverley",picture:"http://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/201976.png"},{name:"Bobby Brown",picture:"http://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/201628.png"},{name:"Clint Capela",picture:"http://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/203991.png"},{name:"Sam Dekker",picture:"http://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/1626155.png"},{name:"Eric Gordon",picture:"http://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/201569.png"},{name:"James Harden",picture:"http://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/201935.png"},{name:"Montrezl Harrell",picture:"http://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/1626149.png"},{name:"Isaiah Hartenstein",picture:"http://stats.nba.com/media/img/no-headshot_small.png"},{name:"Nene ",picture:"http://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/2403.png"},{name:"Chinanu Onuaku",picture:"http://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/1627778.png"},{name:"Isaiah Taylor",picture:"http://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/1627819.png"},{name:"Lou Williams",picture:"http://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/101150.png"},{name:"Troy Williams",picture:"http://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/1627786.png"},{name:"Kyle Wiltjer",picture:"http://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/1627787.png"}];

// var playerList =[
// 	"James Harden",
// 	"Yao Ming",
// 	"Hakeem Olajuwon",
// 	"Scottie Pippen",
// 	"Moses Malone",
// 	"Clyde Drexler",
// 	"Moochie Norris",
// 	"Charles Barkley",
// 	"Tracy McGrady",
// 	"Calvin Murphy",
// ];
var currentWord = ""
var currentGuess = "";
var numOfGuessLeft = 12;
var lettersGuessed = [];
var gameOver = true;
var wins = 0;
var guessAllLettersInWord = false;
var endGameMessage = "";
var player;

//DOM variables
document.onkeyup = checkKeyPress;
var main = document.getElementById("main");
var docLetter = document.getElementById("letters");
var docWins = document.getElementById("wins");
var docGuesses = document.getElementById("guesses");
var docMessage = document.getElementById("message");

// newGame();

//set up new game
function newGame (){
	gameOver = false;
	//select random player
	player = playerList[Math.floor(Math.random()*playerList.length)];
	currentWord = player.name.toLowerCase()
	numOfGuessLeft = 8;
	lettersGuessed = [];
	guessAllLettersInWord = false;
	docMessage.innerHTML = "&nbsp";
	updateCurrentGuess();
	updateScreen();
}

//when the user presses a key
function checkKeyPress(event) {
	//press space to start new game
	if(event.keyCode ===32){
		//if the game is over then start a new a game
		if(gameOver){
			console.log("new game");
			return newGame();
		}
	}
	
	if(!gameOver){
		//if keypress is alphanumeric then check letter
		if(event.keyCode >= 65 && event.keyCode <= 90){
			// console.log("check letter");
			checkLetter(event.key.toLowerCase());
		}
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
	//loop through current word and show letters for any letters guessed
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
	// console.log("Current guess is: " + currentGuess);
};

function updateScreen(){
	if(gameOver){
		docMessage.innerHTML = endGameMessage ;
	}

	//show total wins
	docWins.innerHTML =  "<strong>Wins:</strong> " + wins;

	//show numOf Guess
	docGuesses.innerHTML = "<strong>Guesses left:</strong> " + numOfGuessLeft;
	
	var html ="";
	//show word
	main.innerHTML = "<p>" + currentGuess + "</p>";

	//show guesses
	docLetter.innerHTML= "<p>" + lettersGuessed.sort() + "</p>";

}

//check if win or loss and set status accordingly
function updateGameStatus(){
	if(guessAllLettersInWord){
		wins++;
		gameOver = true;
		endGameMessage = "<h1> Winner winner chicken dinner! </h1><img src='"+ player.picture + "''><br>" + currentWord.toUpperCase();
	}
	if(numOfGuessLeft===0){
		gameOver = true;
		endGameMessage = "<h1> You lost. Try again </h1> <img src='"+ player.picture + "''><br>Correct Answer: " + currentWord.toUpperCase();
	}
}


//end game
	//show picture of player
	//show final word
	//update win if necessary
	//set gameover





