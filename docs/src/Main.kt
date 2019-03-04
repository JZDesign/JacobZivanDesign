import image_path.AlbumArt
import image_path.MobileApp
import kotlin.dom.addClass

fun main(args: Array<String>) {
    Navigation().setUpHamburger()
    //    View().create()

    val work = getElement("portfolio_work_space")
    val art = a().apply {
        href = "#"
        innerHTML = "Design and Art"
        addClass("hover")
        this.appendChild(Card().let {
            it.apply {
                val image = AlbumArt.SB_THE_FUSE_INSIDE
                buildCard("Card", "Card-art", withBackground = true, imageURL = image.value)
                container.addEventListener("click", { viewArt() })
            }
            it.container
        })
    }

    val mobile = a().apply {
        href = "#"
        innerHTML = "Mobile Applications"
        addClass("hover")
        this.appendChild(Card().let {
            it.apply {
                val image = MobileApp.WY_ART
                buildCard("Card", "Card-art", withBackground = true, imageURL = image)
                container.addEventListener("click", { viewMobile() })
            }
            it.container
        })
    }

    work?.append(art, mobile)
}
