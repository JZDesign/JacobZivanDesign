import Foundation
import Publish
import Plot


extension Node where Context == HTML.BodyContext {
    static func header<T: Website>(
        for context: PublishingContext<T>,
        selectedSection: T.SectionID?
    ) -> Node {
        return .header(
            .wrapper(
                .a(
                    .class("site-brand"),
                    .href("/"),
                    .text("Jacob Zivan Design")
                ),
                .nav(
                    .attribute(named: "aria-label", value: "Primary navigation"),
                    .ul(
                        .li(.a(.href("/#apps"), .text("Apps"))),
                        .li(.a(
                            .class(selectedSection == nil ? "" : "selected"),
                            .href("/technology/"),
                            .text("Writing")
                        )),
                        .li(.a(.href("/about/"), .text("About")))
                    )
                )
            )
        )
    }
    
}
