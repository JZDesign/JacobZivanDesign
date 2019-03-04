import org.w3c.dom.HTMLAnchorElement
import org.w3c.dom.HTMLElement
import kotlin.browser.document

// create element helpers
fun a() = document.createElement("a") as HTMLAnchorElement
fun div() = document.createElement(DIV) as _Div_
fun img() = document.createElement(IMG) as _Image_
fun input() = document.createElement(INPUT) as _Input_
fun button() = document.createElement(BUTTON) as _Button_

fun hamburger() = getElement("hamburger")
fun navItems() = getElement("nav_items")
fun home() = getElement(HOME)
fun footerHome() = getElement(FOOTER_HOME)
fun footerArt() = getElement(FOOTER_ART)
fun art() = getElement(ART_CARD)
fun mobile() = getElement(MOBILE_CARD)

fun albumArt() = getElement("album_art")
fun cards() = getElement("cards_landscape")
fun cardsPortrait() = getElement("cards_portrait")
fun logos() = getElement("logos")

fun portfolio() = getElement(PORTFOLIO)
fun mobilePortfolio() = getElement(MOBILE_PORTFOLIO)
fun mobilePortfolioTarget() = getElement(MOBILE_PORTFOLIO_TARGET)
fun index() = getElement(INDEX)

fun getElement(string: String) = document.getElementById(string) as? HTMLElement
