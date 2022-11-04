// Example of how to create a logical toggle using a momentary 
// button connected to a digital input (DI) pin.
//
// Each time the button is pressed, the value of 'buttonToggle'
// alternates between 0 and 1.
//
// 0 == OFF
// 1 == ON

export var buttonValue, buttonPressed, buttonToggle // Use export to watch values in the PixelBlaze editor

var BUTTON_PIN = 26
pinMode(BUTTON_PIN, INPUT_PULLDOWN)

var TOGGLE_OFF = 0
var TOGGLE_ON = 1

export function beforeRender(delta) {
    buttonValue = digitalRead(BUTTON_PIN)
    if (buttonValue == 1) {
        if (buttonPressed == 0) {
            buttonPressed = 1
            buttonToggle = (buttonToggle == 0) ? 1 : 0
        }
    } else {
        buttonPressed = 0
    }
}

export function render(index) {

    hsv(.0, 0, 0)

    if (buttonToggle == TOGGLE_ON) {
        hsv(.97, 1, 1) // Set color if button toggle is on
    }
}