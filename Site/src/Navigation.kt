import kotlin.browser.document
import kotlin.dom.addClass
import kotlin.dom.hasClass
import kotlin.dom.removeClass

class Navigation {
    fun hamburger() = document.getElementById("hamburger")

    fun setUpHamburger() = hamburger()?.apply {
            addEventListener("click", {
                if (this.hasClass(IS_ACTIVE)) this.removeClass(IS_ACTIVE) else this.addClass(IS_ACTIVE)
            })
        }

    companion object {
        const val IS_ACTIVE = "is-active"
    }
}