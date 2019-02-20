import kotlin.browser.document

// create element helpers
fun div() = document.createElement(DIV) as _Div_
fun img() = document.createElement(IMG) as _Image_
fun input() = document.createElement(INPUT) as _Input_
fun button() = document.createElement(BUTTON) as _Button_
