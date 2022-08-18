export var buttonZero
export var buttonOne
export var buttonTwo
export var buttonThree
export var buttonFour


var BUTTON_ZERO_PIN = 14
var BUTTON_ONE_PIN = 21
var BUTTON_TWO_PIN = 22
var BUTTON_THREE_PIN = 25
var BUTTON_FOUR_PIN = 26

pinMode(BUTTON_ZERO_PIN, INPUT_PULLDOWN)
pinMode(BUTTON_ONE_PIN, INPUT_PULLDOWN)
pinMode(BUTTON_TWO_PIN, INPUT_PULLDOWN)
pinMode(BUTTON_THREE_PIN, INPUT_PULLDOWN)
pinMode(BUTTON_FOUR_PIN, INPUT_PULLDOWN)

export function beforeRender(delta) {
  buttonZero = digitalRead(BUTTON_ZERO_PIN)
  buttonOne = digitalRead(BUTTON_ONE_PIN)
  buttonTwo = digitalRead(BUTTON_TWO_PIN)
  buttonThree = digitalRead(BUTTON_THREE_PIN)
  buttonFour = digitalRead(BUTTON_FOUR_PIN)
}

export function render(index) {

  hsv(.0, 0, 0)
  
  if (index == 0) {
    
    if (buttonZero > 0) {
      hsv(.2, .1, 1)  
    }
    
  } else if (index == 1) {
  
    if (buttonOne > 0) {
      hsv(.4, .1, 1)  
    }
    
  } else if (index == 2) {
    
    if (buttonTwo > 0) {
      hsv(.7, 1, 1)  
    }
    
  } else if (index == 3) {
    
    if (buttonThree > 0) {
      hsv(.55, 1, 1)  
    }
    
  } else if (index == 4) {
    
    if (buttonFour > 0) {
      hsv(.35, 1, 1)  
    }
    
  }
  

}