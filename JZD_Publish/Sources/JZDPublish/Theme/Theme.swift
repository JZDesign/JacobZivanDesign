import Foundation
import Publish
import Plot

extension Theme where Site == JZDPublish {
    static var JZD: Self {
        Theme(
            htmlFactory: JZD_Factory(),
            resourcePaths: ["Resources/stylesheets/styles.css"]
        )
        
    }
    
    struct JZD_Factory: HTMLFactory {
        func makeIndexHTML(for index: Index,
                           context: PublishingContext<JZDPublish>) throws -> HTML {
            .page(for: context, location: index, body:
                .body(
                    .comment("INDEX HTML"),
                    .header(for: context, selectedSection: nil),
                    .wrapper(
                        .h1("Fired up! 🔥☝️"),
                        .p(
                            .class("description"),
                            .text(context.site.description)
                        ),
                        .h2("Latest content"),
                        .itemList(
                            for: context.allItems(
                                sortedBy: \.date,
                                order: .descending
                            ),
                            on: context.site
                        )
                    ),
                    .footer(for: context.site)
                )
            )
        }
        
        func makeSectionHTML(for section: Section<JZDPublish>,
                             context: PublishingContext<JZDPublish>) throws -> HTML {
            .page(for: context, location: section, body:
                .body(
                    .comment("SECTION HTML"),
                    .header(for: context, selectedSection: section.id),
                    .wrapper(
                        .h1(.text(section.title)),
                        .itemList(for: section.items, on: context.site)
                    ),
                    .footer(for: context.site)
                )
            )
        }
 
        
        func makePageHTML(for page: Page,
                          context: PublishingContext<JZDPublish>) throws -> HTML {
            .page(for: context, location: page, body:
                .body(
                    .comment("PAGE HTML"),
                    .header(for: context, selectedSection: nil),
                    .wrapper(.contentBody(page.body)),
                    .footer(for: context.site)
                )
            )
        }
    }
        
}

