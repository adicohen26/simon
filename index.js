var buttonColors=["red","blue","green","yellow"];
var countLeveles=0;
var gamePattern=[];
var userChoosenPattern=[];
var started=false;
function nextSequence(){
    //set new level
    userChoosenPattern=[];
    countLeveles++;
    $("#level-title").text("level "+countLeveles);

    var randomNum=Math.floor(Math.random()*4);
    var nextBtn=buttonColors[randomNum];
    gamePattern.push(nextBtn);
    
    $("#"+nextBtn).fadeOut(100).fadeIn(100);
    playSound(nextBtn);
}

$(".btn").click(function(){
    var choosenBtn=this.id;
    userChoosenPattern.push(choosenBtn);

    playSound(choosenBtn);
    pressedEffect(choosenBtn);

    checkAns(userChoosenPattern.length-1);   
});

$(document).on("keypress",function(){
    if(!started)
    {
        started=true;
    $("#level-title").text("level 1");
    nextSequence();
    }
})

function failed(){
    //adjust heading
    $("#level-title").text("Game Over, Press Any Key to Restart");

    gameOverEffect();
    playSound("wrong");

    //rest to start over
    countLeveles=0;
    gamePattern=[];
    userChoosenPattern=[];
    started=false;

}

function checkAns(ansIndex){
    if(gamePattern[ansIndex]!==userChoosenPattern[ansIndex])
        failed();
    else if(gamePattern.length === (ansIndex+1))
    {
       
        setTimeout(nextSequence, 1000);
    }
}

function gameOverEffect(){
    $("body").addClass("game-over");
    setTimeout(function (){
        $("body").removeClass("game-over");
    }, 100);
}

function pressedEffect(choosenBtn){
    $("#"+choosenBtn).addClass("pressed");
    setTimeout(function (){
        $("#"+choosenBtn).removeClass("pressed");
    }, 100);
    
}

function playSound(name){
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}