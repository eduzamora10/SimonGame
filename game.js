var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickPattern = [];
var level = 0;
let gameOver = false;
var temp = 0;
var bestScore = 0;

function nextSequence(){
    
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSelectSound(randomChosenColor);
    gamePattern.push(randomChosenColor);
    
    level++;
    $("h1").text("Level " + level);
}

function checkAnswer(currLevel){
    if(gamePattern[currLevel] === userClickPattern[currLevel]){
        console.log("Success");
        playCorrectSound();
        if(gamePattern.length === userClickPattern.length){
            setTimeout(function(){
                userClickPattern.length = 0;
                nextSequence();
                
            }, 1000)
        }
    }
    else{
        console.log("Wrong");
        playIncorrectSound();
        animateGameOver();
        $("h1").text("Game over, type any key or press the button to play again!");
        gameOver = true;
        if(bestScore < level){
            bestScore = level;
            $("h2").text("Best Score: " + bestScore);
        }
        
        
    }
    
}

$(".btn").click(function(){
    var userChosenColor = this.id;
    userClickPattern.push(userChosenColor);
    animatePress(userChosenColor);
    console.log(userClickPattern);
    checkAnswer(userClickPattern.length-1);
});



$(document).on("keypress", function(){
    if(level === 0){
        setTimeout(function(){
            nextSequence();
        }, 500);
        
    }

    if(gameOver){
        setTimeout(function(){
            gamePattern.length = 0;
            userClickPattern.length = 0;
            level = 0;
            gameOver = false;
            nextSequence();
        }, 500)
        
        
    }
    
});

$(".play").click(function(){
    gamePress();
    if(level === 0){
        setTimeout(function(){
            nextSequence();
        }, 500);
    }
    
    if(gameOver){
        setTimeout(function(){
            gamePattern.length = 0;
            userClickPattern.length = 0;
            level = 0;
            gameOver = false;
            nextSequence();
        }, 500)
        
        
    }
    
});

function playSelectSound(name){
    var audio = new Audio("./sounds/select.mp3");
    audio.play();
}

function playCorrectSound(name){
    var audio = new Audio("./sounds/correct.mp3");
    audio.play();
}

function playIncorrectSound(name){
    var audio = new Audio("./sounds/incorrect.mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    }, 100)

}

function gamePress(){
    $(".play").addClass("game-pressed");
    setTimeout(function(){
        $(".play").removeClass("game-pressed");
    }, 100)

}


function animateGameOver(){
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    }, 100)
}


