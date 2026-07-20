import Foundation
import Publish
import Plot
import SplashPublishPlugin
import CNAMEPublishPlugin

struct JZDPublish: Website {
    enum SectionID: String, WebsiteSectionID {
//        case musings
        case technology
        case foresight
//        case about
    }
    
    struct ItemMetadata: WebsiteItemMetadata {
        static let xHandle: Node<HTML.HeadContext> = .meta(
            .attribute(named: "name", value: "twitter:site"),
            .attribute(named: "content", value: "@JZivanDesign")
        )
    }
    
    var url = URL(string: "https://JacobZivanDesign.com")!
    var name = "Jacob Zivan Design"
    var description = "Independent apps for families and everyday life, plus notes on Swift, Kotlin, and software design."
    var language: Language { .english }
    var imagePath: Path? { "images/social.jpg" }
}

try JZDPublish()
    .publish(withTheme: .JZD,
             additionalSteps: [
                .deploy(using:.gitHub("JZDesign/JacobZivanDesign", useSSH: false))
             ],
             plugins: [.splash(withClassPrefix: ""), .addCNAME()]
    )
