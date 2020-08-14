/*************************************************************************
  mianwei's drizzle sketch

  only works in Safari :)
*************************************************************************/



/*************************************************************************
  PARAMETERS

  N - number of characters on the screen
  westCharacters - the characters when wind is blowing west
  eastCharacters - the characters when wind is blowing east
    (!) there should be equal number of westCharacters and eastCharacters
    (!) order of characters should correspond between westCharacters and eastCharacters
    (!) if you have two of the same character in the list, then it is twice as likely.
  direction - the current direction of the wind
  intensity - the current intensity of the rain
  probability_of_X - probability of change in X every moment
*************************************************************************/

var N = 10000;

var westCharacters = ["&nbsp;", "&nbsp;", ".", "°", "/" ];
var eastCharacters = ["&nbsp;", "&nbsp;", ".", "°" , "\\"]; // 2 backslashes => 1 backslash ... because of JS escaping. See https://stackoverflow.com/questions/3903488/javascript-backslash-in-variables-is-causing-an-error

var direction = "east"; // start with wind facing east
var intensity = 2;       // start with intensity = 2, so adding eastCharacters[2]

var probability_of_changing_direction = 0.0001; // 0.2%
var probability_of_changing_intensity = 0.002; // 0.5%



/*************************************************************************
  SETUP

  1. Make N <span> elements containing a &nbsp; inside the <p>
  2. Store each <span> element in spans
  3. Call draw() for the first time
*************************************************************************/

// 1.
var textContainer = document.querySelector("p");
textContainer.innerHTML = "<span>&nbsp;</span>".repeat(N);

// 2.
var spans = document.querySelectorAll("span");

// 3.
var request; // stores animation frame requests
draw(); // start



/*************************************************************************
  FUNCTIONS
*************************************************************************/



/*************************************************************************
  DRAW

  1. Randomly pick one of the <span> elements
  2. Change the content of that <span> element with the character
     corresponding to the current intensity
  3. There is a tiny chance we should change direction.
     Get a random number. If the random number is less than
     probability_of_changing_direction, change direction!
  4. There is a tiny chance we should change intensity.
     Get a random number. If the random number is less than
     probability_of_changing_intensity, change intensity!
  5. Call draw again for the next frame!
     requestAnimationFrame() is similar to using setTimeout(draw, 100)
     except that this is synced to your computer's frame rate!
*************************************************************************/
function draw() {

  // 1.
  var randomIndex = Math.floor( Math.random() * N );
  var span = spans[randomIndex];

  // 2.
  if (direction == "west") {
    span.innerHTML = westCharacters[ intensity ];
  } else {
    span.innerHTML = eastCharacters[ intensity ];
  }

  // 3.
  if (Math.random() < probability_of_changing_direction) {
    changeDirection();
  }

  // 4.
  if (Math.random() < probability_of_changing_intensity) {
    changeIntensity();
  }

  // 5.
  request = requestAnimationFrame(draw);

}



/*************************************************************************
  CHANGE DIRECTION

  Called from inside draw()
  You can also call it from the console!

  1. If direction was "east", switch to "west"
     Replace every east-facing character with its west-facing equivalent
  2. If direction was "west", switch to "east"
     Replace every west-facing character with its east-facing equivalent
*************************************************************************/
function changeDirection() {

  // 1.
  if (direction == "east") {
    direction = "west";
    for (var i = 0; i < N; i++) {
      var currentCharacter = spans[i].innerHTML;
      var intensityOfCharacter = eastCharacters.indexOf( currentCharacter );
      spans[i].innerHTML = westCharacters[ intensityOfCharacter ];
    }
  }

  // 2.
  else {
    direction = "east";
    for (var i = 0; i < N; i++) {
      var currentCharacter = spans[i].innerHTML;
      var intensityOfCharacter = westCharacters.indexOf( currentCharacter );
      spans[i].innerHTML = eastCharacters[ intensityOfCharacter ];
    }
  }

  console.log("change direction: " + direction);

}



/*************************************************************************
  CHANGE INTENSITY

  Called from inside draw()
  You can also call it from the console!
*************************************************************************/
function changeIntensity() {
  intensity = Math.floor( Math.random() * westCharacters.length );
  console.log("change intensity: " + intensity);
}



/*************************************************************************
  CLEAR

  Not called anywhere yet.
*************************************************************************/
function clear() {
  console.log("clear");
  for (var i = 0; i < N; i++) {
    spans[i].innerHTML = westCharacters[ intensity ];
  }
}


function swbn() {
  var element = document.body;
  element.classList.toggle ("dark-mode");
}
