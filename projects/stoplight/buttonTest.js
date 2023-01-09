// Use with a strip of at least eight pixels

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

export var buttonZero
export var buttonOne
export var buttonTwo
export var buttonThree
export var buttonFour
export var buttonFive
export var buttonSix
export var buttonSeven

export function beforeRender(delta) {
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
    if (buttonZero) {
      setPixelGreen()
    }

  } else if (index == 1) {
    if (buttonOne) {
      setPixelGreen()
    }

  } else if (index == 2) {
    if (buttonTwo) {
      setPixelGreen()
    }

  } else if (index == 3) {
    if (buttonThree) {
      setPixelGreen() 
    }

  } else if (index == 4) {
    if (buttonFour) {
      setPixelGreen()  
    }

  } else if (index == 5) {
    if (buttonFive) {
      setPixelGreen()  
    }

  } else if (index == 6) {
    if (buttonSix) {
      setPixelGreen()  
    }

  } else if (index == 7) {
    if (buttonSeven) {
      setPixelGreen()  
    }
  }
}

function setPixelGreen() {
  hsv(.3, 1, 1)
}