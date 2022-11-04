export var buttonValue, buttonPressed, buttonToggle

var BUTTON_PIN = 1
pinMode(BUTTON_PIN, INPUT_PULLDOWN)

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

    if (buttonToggle == 1) {
        hsv(.2, .1, 1)
    }
}