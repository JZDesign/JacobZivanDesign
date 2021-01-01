import Foundation
import Publish
import Plot


extension Node where Context == HTML.BodyContext {
    static func header<T: Website>(
        for context: PublishingContext<T>,
        selectedSection: T.SectionID?
    ) -> Node {
        let sectionIDs = T.SectionID.allCases
        
        return .header(
            .wrapper(
                .a(.class("site-icon"), .href("/"), .img(.src("/images/memoji.png"), .alt("Memoji of Jacob giving a thumbs up"))),
                .if(sectionIDs.count > 1,
                    .nav(
                        .ul(.forEach(sectionIDs) { section in
                            .li(.a(
                                .class(section == selectedSection ? "selected" : ""),
                                .href(context.sections[section].path),
                                .text(context.sections[section].title)
                            ))
                            
                        })
                    )
                )
            )
        )
    }
    
}
