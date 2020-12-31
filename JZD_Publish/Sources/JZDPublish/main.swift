import Foundation
import Publish
import Plot
import SplashPublishPlugin
import CNAMEPublishPlugin

// This type acts as the configuration for your website.
struct JZDPublish: Website {
    enum SectionID: String, WebsiteSectionID {
        // Add the sections that you want your website to contain here:
        case musings
        case technology
    }
    
    struct ItemMetadata: WebsiteItemMetadata {
        // Add any site-specific metadata that you want to use here.
    }
    
    // Update these properties to configure your website:
    var url = URL(string: "https://JacobZivanDesign.com")!
    var name = "Jacob Zivan Design"
    var description = "Some musings and learnings from a banker turned nerd."
    var language: Language { .english }
    var imagePath: Path? { "images/memoji.png" }
}

// This will generate your website using the built-in Foundation theme:
//try JZDPublish().publish(withTheme: .JZD, plugins: [.splash(withClassPrefix: "")])

try JZDPublish()
    .publish(using:
                [
                    .generateHTML(withTheme: .JZD),
                    .installPlugin(.splash(withClassPrefix: "")),
                    .installPlugin(.generateCNAME(with: "jacobzivandesign.com", "www.jacobzivandesign.com")),
                    .deploy(using:.gitHub("JZDesign/JacobZivanDesign", useSSH: false))
                ])




