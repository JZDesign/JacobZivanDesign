package image_path

import ART
import IMAGES
import JPG
import LOGOS_AND_CARDS

enum class BusinessCardsLandscape(val value: String) {
    CARD_RT("$IMAGES$ART$LOGOS_AND_CARDS" + "RT$JPG"),
    CARD_RT_BACK("$IMAGES$ART$LOGOS_AND_CARDS" + "reshkusCardBack$JPG");
}

enum class BusinessCardsPortrait(val value: String) {
    CARD_TRIFORCE("$IMAGES$ART$LOGOS_AND_CARDS" + "Triforce$JPG"),
    CARD_TRIFORCE_BACK("$IMAGES$ART$LOGOS_AND_CARDS" + "TriforceBack2$JPG");
}
