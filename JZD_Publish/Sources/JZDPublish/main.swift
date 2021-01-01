import Foundation
import Publish
import Plot
import SplashPublishPlugin
import CNAMEPublishPlugin

struct JZDPublish: Website {
    enum SectionID: String, WebsiteSectionID {
        case musings
        case technology
//        case about
    }
    
    struct ItemMetadata: WebsiteItemMetadata {
        // Add any site-specific metadata that you want to use here.
    }
    
    var url = URL(string: "https://JacobZivanDesign.com")!
    var name = "Jacob Zivan Design"
    var description = "Musings and learnings from a banker turned nerd - Tips, tutorials, principles, and thought processes on life and software."
    var language: Language { .english }
    var imagePath: Path? { "images/memoji.png" }
}

try JZDPublish()
    .publish(withTheme: .JZD,
             additionalSteps: [
                .deploy(using:.gitHub("JZDesign/JacobZivanDesign", useSSH: false))
             ],
             plugins: [.splash(withClassPrefix: ""), .addCNAME()]
    )
