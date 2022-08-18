var BUTTON_ZERO_PIN = 26
var BUTTON_ONE_PIN = 25
var BUTTON_TWO_PIN = 14
var BUTTON_THREE_PIN = 27
var BUTTON_FOUR_PIN = 33

pinMode(BUTTON_ZERO_PIN, INPUT_PULLDOWN)

export var buttonZero, buttonZeroToggle
export var buttonOne, buttonOneToggle
export var buttonTwo, buttonTwoToggle
export var buttonThree, buttonThreeToggle
export var buttonFour, buttonFourToggle

var buttonZeroPressed, buttonOnePressed, buttonTwoPressed, buttonThreePressed, buttonFourPressed


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
}




export function beforeRender(delta) {
  ReadButtons()


  t1 = time(.50) * PI2 
  t2 = time(.15) * PI2 // 3.33 times faster than t1

}

export function render(index) {

    // Do Pattern
    h = sin(index / 3 + PI2 * sin(index / 2 + t1))
    v = wave(index / 3 / PI2 + sin(index / 2 + t2))
    v = v * v * v * v // Gamma correction
    v = v > .1 ? v : 0
    hsv(h, 1, v)


    // Override
    if (buttonZeroToggle > 0) {
        if (index == 0) {
            hsv(.5,1,1)
        }
    }
 
   if (buttonOneToggle > 0) {
        if (index == 1) {
            hsv(.5,1,1)
        }
    }

    if (buttonTwoToggle > 0) {
        if (index == 2) {
            hsv(.5,1,1)
        }
    }
 
    if (buttonThreeToggle > 0) {
        if (index == 3) {
            hsv(.7,1,1)
        }
    }
 
    if (buttonFourToggle > 0) {
        if (index == 4) {
            hsv(.3,1,1)
        }
    }
 
 
 
    

}