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


var BUTTON_ZERO_PIN = 26
var BUTTON_ONE_PIN = 25
var BUTTON_TWO_PIN = 36
var BUTTON_THREE_PIN = 14
var BUTTON_FOUR_PIN = 21
var BUTTON_FIVE_PIN = 22
var BUTTON_SIX_PIN = 27
var BUTTON_SEVEN_PIN = 33

pinMode(BUTTON_ZERO_PIN, INPUT_PULLDOWN)
pinMode(BUTTON_ONE_PIN, INPUT_PULLDOWN)
pinMode(BUTTON_TWO_PIN, INPUT_PULLDOWN)
pinMode(BUTTON_THREE_PIN, INPUT_PULLDOWN)
pinMode(BUTTON_FOUR_PIN, INPUT_PULLDOWN)
pinMode(BUTTON_FIVE_PIN, INPUT_PULLDOWN)
pinMode(BUTTON_SIX_PIN, INPUT_PULLDOWN)
pinMode(BUTTON_SEVEN_PIN, INPUT_PULLDOWN)

var buttonZeroPressed, buttonOnePressed, buttonTwoPressed, buttonThreePressed, buttonFourPressed, buttonFivePressed, buttonSixPressed, buttonSevenPressed
var buttonSixToggle, buttonSevenToggle
var buttonSixPreviousToggleState, buttonSevenPreviousToggleState


var PATTERN_INDEX_NONE = 0
var PATTERN_INDEX_DEFAULT = 1

var PATTERN_PRERENDERER_INDEX = 0
var PATTERN_RENDERER_INDEX = 1

var patternCurrent = PATTERN_INDEX_DEFAULT
var patternOn = false

var patternTimer1, patternTimer2

var pattern = new Array()


// Pattern - No Pattern
pattern[0] = [
  function(delta) { hsv(0, 0, 0) },
  function(index) {}  
]

// Pattern - ColorShiftRender
pattern[1] = [
  function(delta) {
    patternTimer1 = time(.50) * PI2
    patternTimer2 = time(.15) * PI2 // 3.33 times faster than patternTimer1
  },
  function(index) {
    h = sin(index / 3 + PI2 * sin(index / 2 + patternTimer1))
    v = wave(index / 3 / PI2 + sin(index / 2 + patternTimer2))
    v = v * v * v * v // Gamma correction
    v = v > .1 ? v : 0
    hsv(h, 1, v)
  }  
]

// Pattern - ColorTwinkleBounce
pattern[2] = [
  function(delta) {
    patternTimer1 = time(.05) * PI2
  },
  function(index) {
    h = 1 + sin(index / 2 + 5 * sin(patternTimer1))
    h += time(.1)
    v = (1 + sin(index / 2 + 5 * sin(patternTimer1))) / 2
    v = v * v * v * v // Gamma correction
    hsv(h, 1, v)
  }  
]





export function beforeRender(delta) {

  readButtons()

  readToggleButtons()

  getCurrentBackgroundPattern()

  getCurrentBackgroundState()

  initializeBackgroundPattern(delta)
}

function readButtons() {
  buttonZeroPressed = false
  buttonOnePressed = false
  buttonTwoPressed = false
  buttonThreePressed = false
  buttonFourPressed = false
  buttonFivePressed = false

  if (digitalRead(BUTTON_ZERO_PIN)) {
    if (!buttonZeroPressed) {
      buttonZeroPressed = true
    }
  }

  if (digitalRead(BUTTON_ONE_PIN)) {
    if (!buttonOnePressed) {
      buttonOnePressed = true
    }
  }

  if (digitalRead(BUTTON_TWO_PIN)) {
    if (!buttonTwoPressed) {
      buttonTwoPressed = true
    }
  }

  if (digitalRead(BUTTON_THREE_PIN)) {
    if (!buttonThreePressed) {
      buttonThreePressed = true
    }
  }

  if (digitalRead(BUTTON_FOUR_PIN)) {
    if (!buttonFourPressed) {
      buttonFourPressed = true
    }
  }

  if (digitalRead(BUTTON_FIVE_PIN)) {
    if (!buttonFivePressed) {
      buttonFivePressed = true
    }
  }
}

function readToggleButtons() {
  if (digitalRead(BUTTON_SIX_PIN)) {
    if (!buttonSixPressed) {
      buttonSixPressed = true
      buttonSixToggle = (!buttonSixToggle) ? true : false
    }
  } else {
    buttonSixPressed = false
  }

  if (digitalRead(BUTTON_SEVEN_PIN)) {
    if (!buttonSevenPressed) {
      buttonSevenPressed = true
      buttonSevenToggle = (!buttonSevenToggle) ? true : false
    }
  } else {
    buttonSevenPressed = false
  }
}

function getCurrentBackgroundPattern() {
  if (buttonSixToggle != buttonSixPreviousToggleState) {
    buttonSixPreviousToggleState = buttonSixToggle
    patternCurrent++
    if (patternCurrent >= arrayLength(patternRender)) {
      patternCurrent = PATTERN_INDEX_DEFAULT
    }
  }
}

function getCurrentBackgroundState() {
  if (buttonSevenToggle != buttonSevenPreviousToggleState) {
    buttonSevenPreviousToggleState = buttonSevenToggle
    if (buttonSevenToggle) {
      patternOn = true
    }
  }  
}

function initializeBackgroundPattern(delta) {
  if (patternOn) {
    pattern[patternCurrent][PATTERN_PRERENDERER_INDEX](delta)
  } else {
    pattern[PATTERN_INDEX_NONE][PATTERN_PRERENDERER_INDEX](delta)
  }
}





export function render(index) {
    
  renderBackgroundPattern(index)

  renderRedYellowGreenCircles(index);
}

function renderBackgroundPattern(index) {
  if (patternOn) {
    pattern[patternCurrent][PATTERN_RENDERER_INDEX](index)
  } else {
    pattern[PATTERN_INDEX_NONE][PATTERN_RENDERER_INDEX](index)
  }
}

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

function setPixelRed() {
  hsv(.97, 1, 1)
}

function setPixelYellow() {
  hsv(.15, 1, 1)
}

function setPixelGreen() {
  hsv(.3, 1, 1)
}