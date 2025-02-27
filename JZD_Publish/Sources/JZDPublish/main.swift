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
        static let mastodon: Node<HTML.HeadContext> = .meta(
            .attribute(named: "name", value: "fediverse:creator"),
            .attribute(named: "content", value: "@jacobzivandesign@mastodon.social")
        )   
        static let xHandle: Node<HTML.HeadContext> = .meta(
            .attribute(named: "twitter:site", value: "@JZivanDesign")
        )
    }
    
    var url = URL(string: "https://JacobZivanDesign.com")!
    var name = "Jacob Zivan Design"
    var description = "Musings and learnings from a banker turned nerd - Tips, tutorials, principles, and thought processes on life and software."
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
