package image_path

import ART
import IMAGES
import LOGOS_AND_CARDS
import PNG

enum class Logos(val value: String) {
    LOGO_BANIGHT("$IMAGES$ART$LOGOS_AND_CARDS" + "BADay$PNG"),
    LOGO_BADAY("$IMAGES$ART$LOGOS_AND_CARDS" + "BANight$PNG"),
    LOGO_MKS("$IMAGES$ART$LOGOS_AND_CARDS" + "shortMK$PNG"),
    LOGO_KNGN("$IMAGES$ART$LOGOS_AND_CARDS" + "ShortKangen-1$PNG"),
    LOGO_CMS("$IMAGES$ART$LOGOS_AND_CARDS" + "shortCoulee$PNG");
}