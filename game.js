buttonColours =["red","green","yellow","blue"];
gamePattern=[];
userPattern=[];
var currentLevel=0;
var gameStarted=false;

$(".btn").click((event)=>
{
  console.log($(event.currentTarget).attr("id"));
  var id= $(event.currentTarget).attr("id")
  playSound(id);
  animatePress(id);
  userPattern.push(id);
  console.log(userPattern);
  if(userPattern.length===gamePattern.length)
  {
      if(checkAnswer())
      {
        userPattern=[];
        nextSequence();
      }
      else{
        playSound("wrong");
        animateGameOver()
        console.log("Game Over!");
        userPattern=[];
        gamePattern=[];
        gameStarted=false;
        changeHeader("Game Over!!! Press any key to continue");
        currentLevel=0;

      }
  }
  else
  {
    console.log("Continue to read user input")
  }

});

function nextSequence()
{
  var randomNumber = (Math.floor(Math.random()*4));
  console.log("randomNumber "+ randomNumber);
  var randomChosenColour =buttonColours[randomNumber];
  console.log("randomChosenColour "+randomChosenColour);
  gamePattern.push(randomChosenColour);
  console.log(gamePattern);
  highlightSelected(randomChosenColour);
  currentLevel+=1;
  changeHeader("Level: "+currentLevel);
  userPattern=[];
}

function changeHeader(text)
{
  $("#level-title").text(text);
}

function highlightSelected(colour)
{
    console.log("Highlight Colour is : "+ colour);
    console.log("Pressed "+colour);
    $("#"+colour).fadeOut().fadeIn();
    playSound(colour);

};

function playSound(selectedColour)
{
  var audio= new Audio("sounds/"+selectedColour+".mp3");
  console.log("Playing sounds/"+selectedColour+".mp3");
  audio.play();
}

function animatePress(selectedColour)
{
  console.log("Animating the button "+ '#'+selectedColour)
  $('#'+selectedColour).addClass("pressed").delay(100).queue(()=>
  {
    console.log("Removing Class");
    $('#'+selectedColour).removeClass("pressed")
    $('#'+selectedColour).dequeue();

  }
);
}

function animateGameOver()
{
  $("body").addClass("game-over").delay(1000).queue(()=>
  {
    console.log("Removing Class");
    $("body").removeClass("game-over")
    $("body").dequeue();

  }
);
}

$("body").keypress(
  (event)=> {
    // if(currentLevel!==0)
    //   {
    //     var reset = prompt("Reset Game?");
    //     if(reset==="Yes")
    //       {
    //         currentLevel=0;
    //         gamePattern=[];
    //         userPattern=[];
    //         nextSequence();
    //       }
    //     else
    //       alert("wating for mouse presse");
    //   }
    // else

    if(!gameStarted)
    {
      console.log("<--------Started Game --------->");
      console.log(currentLevel);
      userPattern=[];
      nextSequence();
      console.log("Game Pattern: "+ gamePattern);
      console.log("User Pattern: "+ userPattern);
      gameStarted=true;
    }
    else
    {
        console.log("Game is already started!!!");
    }
}
);

function checkAnswer(currentLevel)
{
  console.log("Game Pattern "+gamePattern);
  console.log("User Pattern "+userPattern);
  if(JSON.stringify(gamePattern)===JSON.stringify(userPattern))
    {
      console.log("Equal");
      return true;
    }
  else
    {
      console.log("Game Over");
      return false;
    }


};
