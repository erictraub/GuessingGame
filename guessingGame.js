/* **** Global Variables **** */
// try to elminate these global variables in your project, these are here just to start.


var playersGuess;
var winningNumber = generateWinningNumber();
var guessCount = 0;
var guessArray = [];



/* **** Guessing Game Functions **** */

// Generate the Winning Number

function generateWinningNumber(){
	// add code here
	return Math.floor(Math.random() * 100) + 1;
}

// Fetch the Players Guess

function playersGuessSubmission(){
	// add code here
	$('#hintDiv').css("display", "none");
	playersGuess = +$('#playersInput').val();
	checkGuess();
	$('#notification').css("display", "block");
	$('#playersInput').val("");
}

// Determine if the next guess should be a lower or higher number

function lowerOrHigher(){
	// add code here
	if (playersGuess > winningNumber) {
		return "Your guess is higher ";
	}
	else if (playersGuess < winningNumber) {
		return "Your guess is lower ";
	}
}


function distance() {
	var diff = Math.abs(playersGuess - winningNumber);

	if (diff > 20) {
		return "and more than 20 away from the winning number.";
	}
	else if (diff < 5) {
		return "and within 5 digits of the winning number.";
	}
	else if (diff < 10) {
		return "and within 10 digits of the winning number.";
	}
	else if (diff <= 20) {
		return "and within 20 digits of the winning number.";
	}
}


function guessMessage() {
	trysMessage();
	return lowerOrHigher() + distance();

}


//#trys message - updates with how many trys are left
//invoked in guessMessage
function trysMessage() {
	if (5 - guessCount > 1) {
		$('#trys').text("You have " + (5 - guessCount) + " trys left.");
	}
	else {
		$('#trys').text("One try left!");
	}
}

// Check if the Player's Guess is the winning number 

function checkGuess(){
	// add code here
	if(playersGuess === winningNumber) {
		$('#notification').text("You win!");
		$('#notification').css({
			"font-size": "120px", 
			"font-family": "Verdana",
			"font-weight": "bolder",
			"color": "#DFDB51"})
		$('#trys').css("display", "none");
		$('#playersInput').css("display", "none");
		$('#submitButton').css("display", "none");
		$('#resetButton').css("display", "none");
		$('#hintButton').css("display", "none");
		$('#playAgainButton').css("display", "block");
		$('#mainArea').css("background-color", "#1E4617");
		$('h1').css("color", "#8F7F55");
		$('#playAgainButton').css({
			"color": "#1E4617",
			"background-color": "#DFDB51"})
		blink();
	}
	else {
		if (guessArray.indexOf(playersGuess) === -1) {
			guessArray.push(playersGuess);
			guessCount += 1;
				if(guessCount === 5) {
					youLose();

				}
				else {
					$('#notification').text(guessMessage());
				}
		}
		else {
			$('#notification').text("Submitted a duplicate guess. Try again.");
		}
	}
}


function blink() {
	$('#notification').animate({opacity: 0}, 300, "linear", function() {
		for (var i = 0; i < 500; i++) {
			$(this).animate({opacity: 1}, 300);
			$(this).animate({opacity: 0}, 300);
		}
	});
}


function youLose() {
	$('#resetButton').css("display", "none");
	$('#hintButton').css("display", "none");
	$('#submitButton').css("display", "none");
	$('#playersInput').css("display", "none");
	$('#trys').css("display", "none");
	$('#notification').text("You lose!");
	$('#notification').css({
		"font-size": "100px", 
		"font-family": "Verdana",
		"font-weight": "bolder",
		"color": "#1E4617"});
	$('#playAgainButton').css("display", "block");
	$('#mainArea').css("background-color", "red");
	$('#question').css("display", "none");
	$('h1').css("font-size", "30px");
}


// Create a provide hint button that provides additional clues to the "Player"

function provideHint(){
	// add code here
	var hintArray = [];

	for (var i = (8 - (guessCount * 2) + 1); i > 0; i--) {
		hintArray.push(Math.floor(Math.random() * 100) + 1);
	}
	hintArray.push(winningNumber);
	hintArray.sort(function(a,b){return a-b});
	$('#hintMessage').text("One of these is the correct answer: " + "[" + hintArray + "]");
	$('#hintDiv').css("display", "block");
}

// Allow the "Player" to Play Again

function playAgain(){
	// add code here
	location.reload();
}

$(document).keypress(function(event) {
	var code = event.which || event.keyCode;
	if (code === 13) {
		playersGuessSubmission();
	}
})



/* **** Event Listeners/Handlers ****  */

// if lose -> make basically everything except play agin button go away
// do some more css stuff -> "how many banans..." to dark green
//do $(document).ready.... for whole page 
//lookup where to submit it to 