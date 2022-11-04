// Example of a momentary button connected to a digital input (DI) pin
//
// Each time the button is pressed, the value of 'buttonValue' 
// should be 1

export var buttonValue // Use export to watch values in the PixelBlaze editor

var BUTTON_PIN = 1

pinMode(BUTTON_PIN, INPUT_PULLDOWN)

export function beforeRender(delta) {
    buttonValue = digitalRead(BUTTON_PIN)
}

export function render(index) {
    hsv(.0, 0, 0)

    if (buttonValue == 1) {
        hsv(.2, .1, 1) // Set color if button is pressed
    }
}
