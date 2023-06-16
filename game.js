var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;

$(".btn").on("click", function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    var answer = checkAnswer();

    if (answer) {
        console.log("success");
        setTimeout(nextSequence(), 2000);
    }
    else {
        console.log("user-pattern: " + userClickedPattern);
        console.log("game-pattern: " + gamePattern);
        console.log("wrong");
    }
    // console.log(userClickedPattern);
});

function checkAnswer() {
    return userClickedPattern.toString() === gamePattern.toString();
}

function gameOver() {

}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
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

    $(document).ready(function () {
        $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    });

    playSound(randomChosenColour);
}

$(document).keypress(function (e) {
    $("#level-title").text("Level " + level);

    if (e.key == 'a') {
        nextSequence();
    }
});