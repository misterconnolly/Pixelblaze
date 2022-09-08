// 1086 pixels

var BUTTON_ZERO_PIN = 22
var BUTTON_ONE_PIN = 21
var BUTTON_TWO_PIN = 14
var BUTTON_THREE_PIN = 36
var BUTTON_FOUR_PIN = 25
var BUTTON_FIVE_PIN = 26
var BUTTON_SIX_PIN = 27
var BUTTON_SEVEN_PIN = 33

// Assign the pin address for each button
pinMode(BUTTON_ZERO_PIN, INPUT_PULLDOWN)
pinMode(BUTTON_ONE_PIN, INPUT_PULLDOWN)
pinMode(BUTTON_TWO_PIN, INPUT_PULLDOWN)
pinMode(BUTTON_THREE_PIN, INPUT_PULLDOWN)
pinMode(BUTTON_FOUR_PIN, INPUT_PULLDOWN)
pinMode(BUTTON_FIVE_PIN, INPUT_PULLDOWN)
pinMode(BUTTON_SIX_PIN, INPUT_PULLDOWN)
pinMode(BUTTON_SEVEN_PIN, INPUT_PULLDOWN)

// Export button values so they can be watched on the Edit page
export var buttonZero
export var buttonOne
export var buttonTwo
export var buttonThree
export var buttonFour
export var buttonFive
export var buttonSix, buttonSixToggle
export var buttonSeven, buttonSevenToggle

var buttonZeroPressed, buttonOnePressed, buttonTwoPressed, buttonThreePressed, buttonFourPressed, buttonFivePressed, buttonSixPressed, buttonSevenPressed

var t1, t2

var PATTERN_COUNT = 3
var patternRender = array(PATTERN_COUNT)
var patternPreRender = array(PATTERN_COUNT)
var PATTERN_DEFAULT = 0

var buttonSixPreviousToggleState
var buttonSevenPreviousToggleState
var patternCurrent = 1
var patternOn = 0


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
 


function getCurrentBackgroundPattern() {
  
  if (buttonSevenToggle != buttonSevenPreviousToggleState) {
    buttonSevenPreviousToggleState = buttonSevenToggle
    patternOn = buttonSevenToggle
  }
  
  if (buttonSixToggle != buttonSixPreviousToggleState) {
    buttonSixPreviousToggleState = buttonSixToggle 
    patternCurrent++
    if (patternCurrent >= PATTERN_COUNT) {
      patternCurrent = 1
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
    patternPreRender[PATTERN_DEFAULT](delta)
  }
}

function renderBackgroundPattern(index){
  if (patternOn == 1) {
    patternRender[patternCurrent](index)
  } else {
    patternRender[PATTERN_DEFAULT](index)
  }
}





function colorTwinkleBouncePreRender(delta){
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



function noPatternRender(index) {
    hsv(0, 0, 0)
}
patternRender[0] = noPatternRender

function noPatternPreRender(delta) {
  
}
patternPreRender[0] = noPatternPreRender





export function beforeRender(delta) {
  readButtons()

  getCurrentBackgroundPattern()

  initializeBackgroundPattern(delta)
}




function renderSingleRed(index) {
    if ((index < 181) || (index >= 543 && index < 724)) {
        hsv(.67,1,1)
    }
}

function renderSingleYellow(index) {
    if ((index >= 181 && index < 362) || (index >= 724 && index < 905)) {
        hsv(.5,1,1)
    }
}

function renderSingleGreen(index) {
    if ((index >= 362 && index < 543) || (index >= 905)) {
        hsv(.3,1,1)
      }
}

function renderAllRed(index) { 
    hsv(.67,1,1)
}

function renderAllYellow(index) {
    hsv(.5,1,1)
}

function renderAllGreen(index) {
    hsv(.3,1,1)
}



export function render(index) {

  renderBackgroundPattern(index)

  if (buttonZeroPressed > 0) {
    renderSingleRed(index)
  }
  
  if (buttonOnePressed > 0) {
    renderSingleYellow(index)
  }
  
  if (buttonTwoPressed > 0) {
    renderSingleGreen(index)
  }
  
  if (buttonThreePressed > 0) {
   renderAllRed(index) 
  }

  if (buttonFourPressed > 0) {
    renderAllYellow(index)
  }

  if (buttonFivePressed > 0) {
    renderAllGreen(index)
  }    

}