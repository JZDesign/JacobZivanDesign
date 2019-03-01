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
                container.addClass("Card", "Card-albumArt")
                card.addClass("Card-body", "shaded")
                image.src = it.value
                card.append(image)
                container.append(card)
            }
            album_art.container
        })
    }

    val cards = document.getElementById("cards_landscape")

    BusinessCardsLandscape.values().forEach {
        cards?.appendChild(Card().let { bizCard ->
            bizCard.apply {
                container.addClass("Card", "Card-businessCards" ,"Card-businessCards--landscape")
                card.addClass("Card-body", "shaded")
                image.src = it.value
                card.append(image)
                container.append(card)
            }
            bizCard.container
        })
    }

    val cardsPortrait = document.getElementById("cards_portrait")


    BusinessCardsPortrait.values().forEach {
        cardsPortrait?.appendChild(Card().let { bizCard ->
            bizCard.apply {
                container.addClass("Card", "Card-businessCards" ,"Card-businessCards--portrait")
                card.addClass("Card-body", "shaded")
                image.src = it.value
                card.append(image)
                container.append(card)
            }
            bizCard.container
        })
    }
}


