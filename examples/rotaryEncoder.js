var CLK_PIN = 26
var DT_PIN = 25

export var currentA
export var currentB
export var lastA
export var counter

pinMode(CLK_PIN, INPUT) // Input A (CLK)
pinMode(DT_PIN, INPUT) // Input B (DT)

export function beforeRender(delta) {

    currentA = digitalRead(CLK_PIN)
    currentB = digitalRead(DT_PIN)

    if (currentA != lastA) {
        // Moved
        if (currentA != currentB) {
            // Clockwise
            counter++
        } else {
            // CounterClockwise
            counter--
        }

        lastA = currentA
    }
}

export function render(index) {
    hsv(.0, 0, 0)

    if (index < counter) {
        hsv(.7, 1, 1)

    }
}
