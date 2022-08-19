var BUTTON_ZERO_PIN = 14
var BUTTON_ONE_PIN = 21
var BUTTON_TWO_PIN = 22
var BUTTON_THREE_PIN = 25
var BUTTON_FOUR_PIN = 26
var BUTTON_FIVE_PIN = 27
var BUTTON_SIX_PIN = 33

pinMode(BUTTON_ZERO_PIN, INPUT_PULLDOWN)

export var buttonZero, buttonZeroToggle
export var buttonOne, buttonOneToggle
export var buttonTwo, buttonTwoToggle
export var buttonThree, buttonThreeToggle
export var buttonFour, buttonFourToggle
export var buttonFive, buttonFiveToggle
export var buttonSix, buttonSixToggle

var buttonZeroPressed, buttonOnePressed, buttonTwoPressed, buttonThreePressed, buttonFourPressed, buttonFivePressed, buttonSixPressed


function ReadButtons() {
  buttonZero = digitalRead(BUTTON_ZERO_PIN)
  if (buttonZero == 1) {
    if (buttonZeroPressed == 0) {
      buttonZeroPressed = 1
      buttonZeroToggle = (buttonZeroToggle == 0) ? 1 : 0
    }
  } else {
    buttonZeroPressed = 0
  }  
  
  buttonOne = digitalRead(BUTTON_ONE_PIN)
  if (buttonOne == 1) {
    if (buttonOnePressed == 0) {
      buttonOnePressed = 1
      buttonOneToggle = (buttonOneToggle == 0) ? 1 : 0
    }
  } else {
    buttonOnePressed = 0
  }    
  
  buttonTwo = digitalRead(BUTTON_TWO_PIN)
  if (buttonTwo == 1) {
    if (buttonTwoPressed == 0) {
      buttonTwoPressed = 1
      buttonTwoToggle = (buttonTwoToggle == 0) ? 1 : 0
    }
  } else {
    buttonTwoPressed = 0
  }  
  
  buttonThree = digitalRead(BUTTON_THREE_PIN)
  if (buttonThree == 1) {
    if (buttonThreePressed == 0) {
      buttonThreePressed = 1
      buttonThreeToggle = (buttonThreeToggle == 0) ? 1 : 0
    }
  } else {
    buttonThreePressed = 0
  }
  
  buttonFour = digitalRead(BUTTON_FOUR_PIN)
  if (buttonFour == 1) {
    if (buttonFourPressed == 0) {
      buttonFourPressed = 1
      buttonFourToggle = (buttonFourToggle == 0) ? 1 : 0
    }
  } else {
    buttonFourPressed = 0
  }  
    
  buttonFive = digitalRead(BUTTON_FIVE_PIN)
  if (buttonFive == 1) {
    if (buttonFivePressed == 0) {
      buttonFivePressed = 1
      buttonFiveToggle = (buttonFiveToggle == 0) ? 1 : 0
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
}


var t1
var t2

var patternRender = array(2)
var patternPreRender = array(2)




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
  ReadButtons()

  if (buttonSixToggle) {
    patternPreRender[1](delta)
  } else {
    patternPreRender[0](delta)
  }
}

export function render(index) {

  if (buttonSixToggle) {
    patternRender[1](index)
  } else {
    patternRender[0](index)
  }


  if (buttonZeroPressed > 0) {
      if (index < 8) {
        hsv(.8,1,1)
      }
  }
  
  if (buttonOnePressed > 0) {
      if (index >= 8 && index < 16) {
        hsv(.5,1,1)
      }
  }
  
  if (buttonTwoPressed > 0) {
      if (index >= 16 && index < 24) {
        hsv(.3,1,1)
      }
  }
  
  if (buttonThreePressed > 0) {
        hsv(.8,1,1)
  }
  if (buttonFourPressed > 0) {
        hsv(.5,1,1)
  }
  if (buttonFivePressed > 0) {
        hsv(.3,1,1)
  }
  
    

}