import org.w3c.dom.HTMLElement
import kotlin.dom.addClass
import kotlin.dom.removeClass

fun _Input_.configureInput(vararg classes: String, placeholder: String?) {
    this.addClass(*classes )
    placeholder?.let { this.placeholder = it }
}


fun HTMLElement.show() = apply {
    removeClass(HIDE, MINIMIZE)
    addClass(SHOW)
}

fun HTMLElement.hide() = apply {
    removeClass(SHOW)
    addClass(HIDE, MINIMIZE)
}

fun HTMLElement.defenestrate() = apply {
    while (firstChild != null) {
        removeChild(firstChild!!)
    }
}


fun Card.buildCard(vararg containerClasses: String, withBackground: Boolean, imageURL: String) = apply {
    container.addClass(*containerClasses)
    card.addClass("Card-body", "shaded")
    if (withBackground) card.addClass(background())
    image.src = imageURL
    card.append(image)
    container.append(card)
}

fun background() = arrayOf(*red, *blue, *blue, *blue, *blue, *blue, *yellow).random()
