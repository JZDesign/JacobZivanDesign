enum class AlbumArt(val value: String) {
    SB_ANGLES("$IMAGES$ART" + "angles$JPG"),
    SB_BLIND("$IMAGES$ART" + "blind$JPG"),
    SB_DEVILS_WING("$IMAGES$ART" + "devilswing$JPG"),
    SB_DRUMHEAD("$IMAGES$ART" + "drumhead$JPG"),
    SB_EOS("$IMAGES$ART" + "eos$JPG"),
    SB_EOS_BANDPHOTO("$IMAGES$ART" + "eosbandphoto$JPG"),
    SB_FLAME_LOGO("$IMAGES$ART" + "flameslogo$JPG"),
    SB_LOGO("$IMAGES$ART" + "sblogo2017$JPG"),
    SB_LOGO_OLD("$IMAGES$ART" + "slowburnlogo$JPG"),
    SB_I_AM_THE_HORIZON("$IMAGES$ART" + "iamthehorizon$JPG"),
    SB_THE_FUSE_INSIDE("$IMAGES$ART" + "thefuseinside$JPG"),
    SB_THE_FUSE_INSIDE_BACK("$IMAGES$ART" + "thefuseback$JPG"),
    SB_TIDAL_WAVE("$IMAGES$ART" + "TidalWave$JPG");

    companion object {
        fun contains(target: String) = values().any { it.value == target }
    }
}
