import kotlin.browser.document
import kotlin.dom.addClass

fun main(args: Array<String>) {
    console.log("It Works")
    Navigation().setUpHamburger()
//    View().create()


    val albumArt = document.getElementById("album_art")

    AlbumArt.values().forEach {
        albumArt?.appendChild(Card().let { album_art ->
            album_art.apply {
                container.addClass("Card")
                card.addClass("Card-body", "Card-body--art", "shaded")
                image.src = it.value
                card.append(image)
                container.append(card)
            }
            album_art.container
        })
    }
}


