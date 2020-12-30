import Foundation
import Publish
import Plot

// This type acts as the configuration for your website.
struct JZDPublish: Website {
    enum SectionID: String, WebsiteSectionID {
        // Add the sections that you want your website to contain here:
        case posts
    }

    struct ItemMetadata: WebsiteItemMetadata {
        // Add any site-specific metadata that you want to use here.
    }

    // Update these properties to configure your website:
    var url = URL(string: "https://JacobZivanDesign.com")!
    var name = "Jacob Zivan Design"
    var description = "Some musings and learnings from a banker turned nerd."
    var language: Language { .english }
    var imagePath: Path? { "images/me.jpg" }
}

// This will generate your website using the built-in Foundation theme:
try JZDPublish().publish(withTheme: .JZD)
