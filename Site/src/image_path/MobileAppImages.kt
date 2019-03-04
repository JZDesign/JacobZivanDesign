package image_path

import IMAGES
import JPG
import MOBILE
import PNG

object MobileApp {
    const val WY_ART = MOBILE_PATH + "iTunesArtwork$PNG"

    enum class MobileAppImages(val value: String) {
        WY_LAUNCH(MOBILE_PATH + "wy_launch$JPG"),
        WY_HOME(MOBILE_PATH + "wy_home$JPG"),
        WY_ACTIVE(MOBILE_PATH + "wy_active$JPG"),
        WY_SELFIE(MOBILE_PATH + "wy_selfie$JPG"),
        WY_LIST(MOBILE_PATH + "wy_list$JPG"),
        WY_LOG(MOBILE_PATH + "wy_log$JPG"),

        FH_LAUNCH(MOBILE_PATH + "fh_launch$JPG"),
        FH_EVENTS(MOBILE_PATH + "fh_events$JPG"),
        FH_LOYALTY(MOBILE_PATH + "fh_loyalty$JPG"),
        FH_ONTAP(MOBILE_PATH + "fh_whatsOnTap$JPG");
    }

    enum class IpadAppImages(val value: String) {
        LF_LAUCH(MOBILE_PATH + "livefire$JPG"),
        LF_HOME(MOBILE_PATH + "livefire01$JPG"),
        LF_BUILT(MOBILE_PATH + "livefire02$JPG"),
    }

}

const val MOBILE_PATH = "$IMAGES$MOBILE"