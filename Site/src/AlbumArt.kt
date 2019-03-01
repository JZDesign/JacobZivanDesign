enum class AlbumArt(val value: String) {
    SB_BLIND("$IMAGES$ART" + "blind$JPG"),
    SB_EOS("$IMAGES$ART" + "eos$JPG"),
    SB_EOS_BANDPHOTO("$IMAGES$ART" + "eosbandphoto$JPG"),
    SB_THE_FUSE_INSIDE("$IMAGES$ART" + "thefuseinside$JPG"),
    SB_THE_FUSE_INSIDE_BACK("$IMAGES$ART" + "thefuseback$JPG"),
    SB_ANGLES("$IMAGES$ART" + "angles$JPG"),
    SB_DEVILS_WING("$IMAGES$ART" + "devilswing$JPG"),
    SB_I_AM_THE_HORIZON("$IMAGES$ART" + "iamthehorizon$JPG"),
    SB_LOGO("$IMAGES$ART" + "sblogo2017$JPG"),
    SB_LOGO_OLD("$IMAGES$ART" + "slowburnlogo$JPG"),
    SB_FLAME_LOGO("$IMAGES$ART" + "flameslogo$JPG"),
    SB_DRUMHEAD("$IMAGES$ART" + "drumhead$JPG"),
    SB_TIDAL_WAVE("$IMAGES$ART" + "TidalWave$JPG");

    companion object {
        fun contains(target: String) = values().any { it.value == target }
    }
}

enum class BusinessCardsLandscape(val value: String) {
    CARD_RT("$IMAGES$ART$LOGOS_AND_CARDS" + "RT$JPG"),
    CARD_RT_BACK("$IMAGES$ART$LOGOS_AND_CARDS" + "reshkusCardBack$JPG");
}

enum class BusinessCardsPortrait(val value: String) {
        CARD_TRIFORCE("$IMAGES$ART$LOGOS_AND_CARDS" + "Triforce$JPG"),
        CARD_TRIFORCE_BACK("$IMAGES$ART$LOGOS_AND_CARDS" + "TriforceBack2$JPG");
}

enum class Logos(val value: String) {
    LOGO_BANIGHT("$IMAGES$ART$LOGOS_AND_CARDS" + "BADay$PNG"),
    LOGO_BADAY("$IMAGES$ART$LOGOS_AND_CARDS" + "BANight$PNG"),
    LOGO_MKS("$IMAGES$ART$LOGOS_AND_CARDS" + "shortMK$PNG"),
    LOGO_KNGN("$IMAGES$ART$LOGOS_AND_CARDS" + "ShortKangen-1$PNG"),
    LOGO_CMS("$IMAGES$ART$LOGOS_AND_CARDS" + "shortCoulee$PNG");
}