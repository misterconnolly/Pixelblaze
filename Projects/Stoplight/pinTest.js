// Export button values so they can be watched on the Edit page
export var buttonZero
export var buttonOne
export var buttonTwo
export var buttonThree
export var buttonFour
export var buttonFive
export var buttonSix
export var buttonSeven

// Assign the pin address for each button
var BUTTON_ZERO_PIN = 14
var BUTTON_ONE_PIN = 21
var BUTTON_TWO_PIN = 22
var BUTTON_THREE_PIN = 25
var BUTTON_FOUR_PIN = 26
var BUTTON_FIVE_PIN = 27
var BUTTON_SIX_PIN = 33
var BUTTON_SEVEN_PIN = 36

// Initialize button pins
pinMode(BUTTON_ZERO_PIN, INPUT_PULLDOWN)
pinMode(BUTTON_ONE_PIN, INPUT_PULLDOWN)
pinMode(BUTTON_TWO_PIN, INPUT_PULLDOWN)
pinMode(BUTTON_THREE_PIN, INPUT_PULLDOWN)
pinMode(BUTTON_FOUR_PIN, INPUT_PULLDOWN)
pinMode(BUTTON_FIVE_PIN, INPUT_PULLDOWN)
pinMode(BUTTON_SIX_PIN, INPUT_PULLDOWN)
pinMode(BUTTON_SEVEN_PIN, INPUT_PULLDOWN)

export function beforeRender(delta) {
  // Read values from each button pin
  buttonZero = digitalRead(BUTTON_ZERO_PIN)
  buttonOne = digitalRead(BUTTON_ONE_PIN)
  buttonTwo = digitalRead(BUTTON_TWO_PIN)
  buttonThree = digitalRead(BUTTON_THREE_PIN)
  buttonFour = digitalRead(BUTTON_FOUR_PIN)
  buttonFive = digitalRead(BUTTON_FIVE_PIN)
  buttonSix = digitalRead(BUTTON_SIX_PIN)
  buttonSeven = digitalRead(BUTTON_SEVEN_PIN)
}

export function render(index) {

  hsv(.0, 0, 0)
  
  if (index == 0) {
    if (buttonZero > 0) {
      hsv(.2, .1, 1) // LED on for index 0
    }
    
  } else if (index == 1) {
    if (buttonOne > 0) {
      hsv(.4, .1, 1) // LED on for index 1
    }
    
  } else if (index == 2) {
    if (buttonTwo > 0) {
      hsv(.7, 1, 1) // LED on for index 2  
    }
    
  } else if (index == 3) {
    if (buttonThree > 0) {
      hsv(.55, 1, 1) // LED on for index 3  
    }
    
  } else if (index == 4) {
    if (buttonFour > 0) {
      hsv(.25, 1, 1) // LED on for index 4  
    }
    
  } else if (index == 5) {
    if (buttonFive > 0) {
      hsv(.15, 1, 1) // LED on for index 5  
    }
    
  } else if (index == 6) {
    if (buttonSix > 0) {
      hsv(.85, 1, 1) // LED on for index 6  
    }
    
  } else if (index == 7) {
    if (buttonSeven > 0) {
      hsv(.95, 1, 1) // LED on for index 7  
    }
    
  } 

}