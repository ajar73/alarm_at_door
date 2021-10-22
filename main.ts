// If electrical circiut with door is broken
input.onPinReleased(TouchPin.P0, function () {
    basic.showString("Open")
    if (alarmState == ALARM_ON || alarmState == ALARM_TRIGGERED) {
        alarmState = ALARM_TRIGGERED
        radio.sendValue(ALARM_ID, ALARM_TRIGGERED)
    }
})
// Add -1 to entered code
input.onButtonPressed(Button.A, function () {
    tryCode += -1
    if (tryCode < 0) {
        tryCode = 9
    }
    basic.showNumber(tryCode)
    basic.pause(200)
})
// Toggle alarm on/off if entered code is correct
input.onButtonPressed(Button.AB, function () {
    if (tryCode == CODE) {
        if (alarmState == ALARM_OFF) {
            alarmState = ALARM_ON
        } else {
            alarmState = ALARM_OFF
        }
    } else {
        basic.showIcon(IconNames.No)
        basic.pause(2000)
    }
})
// Add +1 to entered code
input.onButtonPressed(Button.B, function () {
    tryCode += 1
    if (alarmState > 9) {
        tryCode = 0
    }
    basic.pause(200)
    basic.showNumber(tryCode)
})
radio.onReceivedValue(function (alarmID, alarmMsg) {
    basic.showString("" + (alarmID))
    basic.showNumber(alarmMsg)
})
let tryCode = 0
let ALARM_ON = 0
let alarmState = 0
let CODE = 0
let ALARM_TRIGGERED = 0
let ALARM_OFF = 0
let ALARM_ID = ""
ALARM_ID = "A1"
ALARM_OFF = 1
ALARM_TRIGGERED = 2
CODE = 1
alarmState = ALARM_ON
tryCode = 0
radio.setGroup(128)
basic.forever(function () {
    if (alarmState == ALARM_ON) {
        basic.showIcon(IconNames.Square)
    } else if (alarmState == ALARM_OFF) {
        basic.showIcon(IconNames.Yes)
    } else if (alarmState == ALARM_TRIGGERED) {
        basic.showIcon(IconNames.SmallSquare)
        basic.showIcon(IconNames.Square)
    } else {
    	
    }
})
