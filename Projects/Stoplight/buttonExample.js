export var buttonValue // Use export display value in the PixelBlaze editor

var BUTTON_PIN = 1

pinMode(BUTTON_PIN, INPUT_PULLDOWN)

export function beforeRender(delta) {
    buttonValue = digitalRead(BUTTON_PIN)
}

export function render(index) {
    hsv(.0, 0, 0)

    if (buttonValue > 0) {
        hsv(.2, .1, 1) // Set color if button is pressed
    }
}
