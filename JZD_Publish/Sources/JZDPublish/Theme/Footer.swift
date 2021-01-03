import Foundation
import Publish
import Plot

extension Node where Context == HTML.BodyContext {
    
    static func footer<T: Website>(for site: T) -> Node {
        return .footer(
            .p(
                .text("Generated using "),
                .a(
                    .text("Publish"),
                    .href("https://github.com/johnsundell/publish")
                )
            ),
            .p(
                .text("Code typeface "),
                .a(
                    .text("JetBrains Mono"),
                    .href("https://www.jetbrains.com/lp/mono/")
                )
            ),
            .p(.a(
                .text("RSS feed"),
                .href("/feed.rss")
            )),
            .div(
                .a(.img(.src("/images/git.svg")), .target(.blank), .class("find-me"), .href("https://github.com/JZDesign/")),
                .a(.img(.src("/images/linkedin.svg")), .target(.blank), .class("find-me"), .href("https://www.linkedin.com/in/jacob-rakidzich-b8722436/")),
                .class("social")
            )
        )
    }
}
