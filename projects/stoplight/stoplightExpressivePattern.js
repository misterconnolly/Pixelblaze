//
// Expressive Stoplight with Background Patterns
//
// Configuration
//    - Set pixel count to 1086
//
// Buttons Actions
//    Zero - Single red (top)
//    One - Single yellow (middle)
//    Two - Single green (botton)
//    Three - All red
//    Four - All yellow
//    Five - All green
//    Six - Switch background pattern
//    Seven - Toggle background pattern on/off
//

var BUTTON_ZERO_PIN = 26
var BUTTON_ONE_PIN = 25
var BUTTON_TWO_PIN = 36
var BUTTON_THREE_PIN = 14
var BUTTON_FOUR_PIN = 21
var BUTTON_FIVE_PIN = 22
var BUTTON_SIX_PIN = 27
var BUTTON_SEVEN_PIN = 33

// Assign the pin address and digital inputq type for each button
pinMode(BUTTON_ZERO_PIN, INPUT_PULLDOWN)
pinMode(BUTTON_ONE_PIN, INPUT_PULLDOWN)
pinMode(BUTTON_TWO_PIN, INPUT_PULLDOWN)
pinMode(BUTTON_THREE_PIN, INPUT_PULLDOWN)
pinMode(BUTTON_FOUR_PIN, INPUT_PULLDOWN)
pinMode(BUTTON_FIVE_PIN, INPUT_PULLDOWN)
pinMode(BUTTON_SIX_PIN, INPUT_PULLDOWN)
pinMode(BUTTON_SEVEN_PIN, INPUT_PULLDOWN)

// Export button values so they can be watched on the Edit page
export var buttonZero, buttonOne, buttonTwo, buttonThree, buttonFour, buttonFive, buttonSix, buttonSeven
export var buttonSixToggle, buttonSevenToggle

var buttonZeroPressed, buttonOnePressed, buttonTwoPressed, buttonThreePressed, buttonFourPressed, buttonFivePressed, buttonSixPressed, buttonSevenPressed

var buttonSixPreviousToggleState
var buttonSevenPreviousToggleState


var PATTERN_COUNT = 3 // Total pattern count, including the blank pattern that simulates being powered off
var PATTERN_INDEX_DEFAULT = 1
var PATTERN_INDEX_NONE = 0

var patternRender = array(PATTERN_COUNT)
var patternPreRender = array(PATTERN_COUNT)

var patternCurrent = PATTERN_INDEX_DEFAULT
var patternOn = 0

var FRONT_RED_FIRST_PIXEL = 0
var FRONT_RED_LAST_PIXEL = 180
var REAR_RED_FIRST_PIXEL = 583
var REAR_RED_LAST_PIXEL = 723

var FRONT_YELLOW_FIRST_PIXEL = 181
var FRONT_YELLOW_LAST_PIXEL = 361
var REAR_YELLOW_FIRST_PIXEL = 724
var REAR_YELLOW_LAST_PIXEL = 904

var FRONT_GREEN_FIRST_PIXEL = 362
var FRONT_GREEN_LAST_PIXEL = 542
var REAR_GREEN_FIRST_PIXEL = 905
var REAR_GREEN_LAST_PIXEL = 1085

var t1, t2

function readButtons() {
  buttonZero = digitalRead(BUTTON_ZERO_PIN)
  if (buttonZero == 1) {
    if (buttonZeroPressed == 0) {
      buttonZeroPressed = 1
    }
  } else {
    buttonZeroPressed = 0
  }

  buttonOne = digitalRead(BUTTON_ONE_PIN)
  if (buttonOne == 1) {
    if (buttonOnePressed == 0) {
      buttonOnePressed = 1
    }
  } else {
    buttonOnePressed = 0
  }

  buttonTwo = digitalRead(BUTTON_TWO_PIN)
  if (buttonTwo == 1) {
    if (buttonTwoPressed == 0) {
      buttonTwoPressed = 1
    }
  } else {
    buttonTwoPressed = 0
  }

  buttonThree = digitalRead(BUTTON_THREE_PIN)
  if (buttonThree == 1) {
    if (buttonThreePressed == 0) {
      buttonThreePressed = 1
    }
  } else {
    buttonThreePressed = 0
  }

  buttonFour = digitalRead(BUTTON_FOUR_PIN)
  if (buttonFour == 1) {
    if (buttonFourPressed == 0) {
      buttonFourPressed = 1
    }
  } else {
    buttonFourPressed = 0
  }

  buttonFive = digitalRead(BUTTON_FIVE_PIN)
  if (buttonFive == 1) {
    if (buttonFivePressed == 0) {
      buttonFivePressed = 1
    }
  } else {
    buttonFivePressed = 0
  }

  buttonSix = digitalRead(BUTTON_SIX_PIN)
  if (buttonSix == 1) {
    if (buttonSixPressed == 0) {
      buttonSixPressed = 1
      buttonSixToggle = (buttonSixToggle == 0) ? 1 : 0
    }
  } else {
    buttonSixPressed = 0
  }

  buttonSeven = digitalRead(BUTTON_SEVEN_PIN)
  if (buttonSeven == 1) {
    if (buttonSevenPressed == 0) {
      buttonSevenPressed = 1
      buttonSevenToggle = (buttonSevenToggle == 0) ? 1 : 0
    }
  } else {
    buttonSevenPressed = 0
  }
}







function setCurrentBackgroundPattern() {
  if (buttonSevenToggle != buttonSevenPreviousToggleState) {
    buttonSevenPreviousToggleState = buttonSevenToggle
    patternOn = buttonSevenToggle
  }

  if (buttonSixToggle != buttonSixPreviousToggleState) {
    buttonSixPreviousToggleState = buttonSixToggle
    patternCurrent++
    if (patternCurrent >= PATTERN_COUNT) {
      patternCurrent = PATTERN_INDEX_DEFAULT
    }
    patternOn = 1
    buttonSevenToggle = 1
    buttonSevenPreviousToggleState = 1
  }
}


function initializeBackgroundPattern(delta) {
  if (patternOn == 1) {
    patternPreRender[patternCurrent](delta)
  } else {
    patternPreRender[PATTERN_INDEX_DEFAULT](delta)
  }
}

//
// Renders the default background pattern when enabled
//
function renderBackgroundPattern(index) {
  if (patternOn == 1) {
    patternRender[patternCurrent](index)
  } else {
    patternRender[PATTERN_INDEX_NONE](index)
  }
}





//
// Pattern - No Pattern
//
function noPatternRender(index) {
  hsv(0, 0, 0)
}
patternRender[0] = noPatternRender

function noPatternPreRender(delta) {

}
patternPreRender[0] = noPatternPreRender


/////////////
// Background Patterns
//  - Displays when patternOn == 1 
//  - Update PATTERN_COUNT if the pattern count changes
//  - Add patterns below
/////////////

//
// Pattern - ColorShiftRender
//
function colorShiftRender(index) {
  h = sin(index / 3 + PI2 * sin(index / 2 + t1))
  v = wave(index / 3 / PI2 + sin(index / 2 + t2))
  v = v * v * v * v // Gamma correction
  v = v > .1 ? v : 0
  hsv(h, 1, v)
}
patternRender[1] = colorShiftRender

function colorShiftPreRender(delta) {
  t1 = time(.50) * PI2
  t2 = time(.15) * PI2 // 3.33 times faster than t1
}
patternPreRender[1] = colorShiftPreRender

//
// Pattern - ColorTwinkleBounce
//
function colorTwinkleBouncePreRender(delta) {
  t1 = time(.05) * PI2
}
patternPreRender[2] = colorTwinkleBouncePreRender

function colorTwinkleBounceRender(index) {
  h = 1 + sin(index / 2 + 5 * sin(t1))
  h += time(.1)
  v = (1 + sin(index / 2 + 5 * sin(t1))) / 2
  v = v * v * v * v // Gamma correction
  hsv(h, 1, v)
}
patternRender[2] = colorTwinkleBounceRender








//
// Red/Yellow/Green areas for traffic signal
//
function renderRedYellowGreenCircles(index) {
  
  if (buttonZeroPressed > 0) {
    renderSingleGreen(index)
  }

  if (buttonOnePressed > 0) {
    renderSingleYellow(index)
  }

  if (buttonTwoPressed > 0) {
    renderSingleRed(index)
  }

  if (buttonThreePressed > 0) {
    renderAllGreen(index)
  }

  if (buttonFourPressed > 0) {
    renderAllYellow(index)
  }

  if (buttonFivePressed > 0) {
    renderAllRed(index)
  }
}

function setPixelRed() {
  hsv(.97, 1, 1)
}

function setPixelYellow() {
  hsv(.15, 1, 1)
}

function setPixelGreen() {
  hsv(.3, 1, 1)
}

function setPixelOff() {
  hsv(0, 0, 0)
}

function renderSingleRed(index) {
  if ((index >= FRONT_RED_FIRST_PIXEL && index <= FRONT_RED_LAST_PIXEL)
    || (index >= REAR_RED_FIRST_PIXEL && index <= REAR_RED_LAST_PIXEL)) {
    setPixelRed()
  }
}

function renderSingleYellow(index) {
  if ((index >= FRONT_YELLOW_FIRST_PIXEL && index <= FRONT_YELLOW_LAST_PIXEL)
    || (index >= REAR_YELLOW_FIRST_PIXEL && index <= REAR_YELLOW_LAST_PIXEL)) {
    setPixelYellow()
  }
}

function renderSingleGreen(index) {
  if ((index >= FRONT_GREEN_FIRST_PIXEL && index <= FRONT_GREEN_LAST_PIXEL)
    || (index >= REAR_GREEN_FIRST_PIXEL && index <= REAR_GREEN_LAST_PIXEL)) {
    setPixelGreen()
  }
}

function renderAllRed(index) {
  setPixelRed()
}

function renderAllYellow(index) {
  setPixelYellow()
}

function renderAllGreen(index) {
  setPixelGreen()
}






//
// This exported function is called before rendering a new frame of pixels to the strip
//
// https://github.com/simap/pixelblaze/blob/master/README.expressions.md#writing-patterns
//
export function beforeRender(delta) {
  readButtons()

  setCurrentBackgroundPattern()

  initializeBackgroundPattern(delta)
}

//
// This exported function is called for each pixel in the strip while rendering a new frame
//
// https://github.com/simap/pixelblaze/blob/master/README.expressions.md#writing-patterns
//
export function render(index) {

  // Display a background pattern if enabled
  renderBackgroundPattern(index)

  // Override traffic signal area pixels when indicated by button inputs
  renderRedYellowGreenCircles(index);
}