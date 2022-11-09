// Example of multiple momentary buttons connected to GPIO input pins
//

export var buttonOneValue, buttonTwoValue, buttonThreeValue
// Use export to watch values in the PixelBlaze editor

var BUTTON_ONE_PIN = 26
var BUTTON_TWO_PIN = 25
var BUTTON_THREE_PIN = 0

pinMode(BUTTON_ONE_PIN, INPUT_PULLDOWN)
pinMode(BUTTON_TWO_PIN, INPUT_PULLDOWN)
pinMode(BUTTON_THREE_PIN, INPUT_PULLDOWN)

export function beforeRender(delta) {
    buttonOneValue = digitalRead(BUTTON_ONE_PIN)
    buttonTwoValue = digitalRead(BUTTON_TWO_PIN)
    buttonThreeValue = digitalRead(BUTTON_THREE_PIN)
}

export function render(index) {
    hsv(.0, 0, 0)

    if (index == 0) {
        if (buttonOneValue == 1) {
            hsv(.97, 1, 1) // Red'ish
        }
    }
    if (index == 1) {
        if (buttonTwoValue == 1) {
            hsv(.15, 1, 1) // Yellow'ish
        }
    }
    if (index == 2) {
        if (buttonThreeValue == 1) {
            hsv(.3, 1, 1) // Green'ish
        }
    }
}