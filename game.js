var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;
var started = false;

$(document).keypress(function (e) { 
    if(!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

$(".btn").on("click", function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
    // console.log(userClickedPattern);
});

function checkAnswer(currentLevel) {

    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if(userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            },1000);
        }
    }
    else {
        gameOver();
        startOver();
    }
}

function gameOver() {
    $("body").addClass("game-over");
    setTimeout(function () {
        $("body").removeClass("game-over");
    },200);

    playSound("wrong");

    $("#level-title").text("Game over press any key to restart game!");
}

function animatePress(currentColor) {
    $("." + currentColor).addClass("pressed");

    setTimeout(function () {
        $("." + currentColor).removeClass("pressed");
    }, 100);
}

function nextSequence() {
    level++;
    userClickedPattern = [];

    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(200).fadeIn(200);

    playSound(randomChosenColour);
}

function startOver() {
    gamePattern = [];
    level = 0;
    started = false;
}
