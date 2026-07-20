import Foundation
import Publish
import Plot

extension Node where Context == HTML.BodyContext {
    static func footer<T: Website>(for site: T) -> Node {
        .footer(
            .wrapper(
                .a(
                    .class("footer-brand"),
                    .href("/"),
                    .text("Jacob Zivan Design")
                ),
                .nav(
                    .attribute(named: "aria-label", value: "Footer links"),
                    .ul(
                        .li(.a(.href("https://github.com/JZDesign/"), .target(.blank), .text("GitHub"))),
                        .li(.a(.href("https://x.com/JZivanDesign"), .target(.blank), .text("X"))),
                        .li(.a(.href("https://www.linkedin.com/in/jacob-rakidzich-b8722436/"), .target(.blank), .text("LinkedIn"))),
                        .li(.a(.href("/feed.rss"), .text("RSS")))
                    )
                )
            )
        )
    }
}
