import kotlin.dom.addClass

fun _Input_.configureInput(vararg classes: String, placeholder: String?) {
    this.addClass(*classes)
    placeholder?.let { this.placeholder = it }
}
