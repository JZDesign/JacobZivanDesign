import Foundation
import Publish
import Plot

extension Node where Context == HTML.BodyContext {
    
    static func footer<T: Website>(for site: T) -> Node {
        return .footer(
            .br(),
            .raw("""
<div class="center">
    <p><sm>
    If you enjoy the content on my site and want to support my writing, you can donate <a href="https://ko-fi.com/jacobzivandesign" target="blank">here</a> or <a href="https://github.com/sponsors/JZDesign" target="blank">here.</a>
    </p></sm>
    <p><sm>
    Or if you're a <a href="https://wallet.proton.me" target="blank">Proton Wallet</a> user, you can send coin to donate@jacobzivandesign.com
    </p></sm>
</div>
"""
            ),
            .br(),
            .br(),
            .p(
                .text("Code typeface == "),
                .a(
                    .text("JetBrains Mono"),
                    .href("https://www.jetbrains.com/lp/mono/")
                ),
                .class("jbmono")
            ),
            .p(
                .text("Generated using "),
                .a(
                    .text("Publish"),
                    .href("https://github.com/johnsundell/publish")
                )
            ),
            
            .p(.a(
                .text("RSS feed"),
                .href("/feed.rss")
            )),
            
            .div(
                .a(.img(.src("/images/git.svg")), .target(.blank), .class("find-me"), .href("https://github.com/JZDesign/")),
                .a(.img(.src("/images/bsky.svg")), .target(.blank), .class("find-me"), .href("https://bsky.app/profile/jacobzivandesign.bsky.social")),
                .a(.img(.src("/images/x-logo.svg")), .target(.blank), .class("find-me"), .href("https://x.com/JZivanDesign")),
                .a(.img(.src("/images/mastodon.svg")), .target(.blank), .class("find-me"), .href("https://mastodon.social/@jacobzivandesign")),
                .a(.img(.src("/images/linkedin.svg")), .target(.blank), .class("find-me"), .href("https://www.linkedin.com/in/jacob-rakidzich-b8722436/")),
                .class("social")
            ),
            .br()
            
        )
    }
}
