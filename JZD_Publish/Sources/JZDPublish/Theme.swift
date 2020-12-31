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
    
    private struct JZD_Factory: HTMLFactory {
        func makeIndexHTML(for index: Index,
                           context: PublishingContext<JZDPublish>) throws -> HTML {
            HTML(
                .lang(context.site.language),
                .head(for: index, on: context.site),
                .body(
                    .comment("INDEX HTML"),
                    .header(for: context, selectedSection: nil),
                    .wrapper(
                        .h1(.text(index.title)),
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
            HTML(
                .lang(context.site.language),
                .head(for: section, on: context.site),
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
        
        func makeItemHTML(for item: Item<JZDPublish>,
                          context: PublishingContext<JZDPublish>) throws -> HTML {
            HTML(
                .lang(context.site.language),
                .head(for: item, on: context.site),
                .body(
                    .comment("ITEM HTML"),
                    .class("item-page"),
                    .header(for: context, selectedSection: item.sectionID),
                    .wrapper(
                        .article(
                            .div(
                                .class("content"),
                                .contentBody(item.body)
                            ),
                            .span("Tags: "),
                            .tagList(for: item, on: context.site)
                        )
                    ),
                    .footer(for: context.site)
                )
            )
        }
        
        func makePageHTML(for page: Page,
                          context: PublishingContext<JZDPublish>) throws -> HTML {
            HTML(
                .lang(context.site.language),
                .head(for: page, on: context.site),
                .body(
                    .comment("PAGE HTML"),
                    .header(for: context, selectedSection: nil),
                    .wrapper(.contentBody(page.body)),
                    .footer(for: context.site)
                )
            )
        }
        
        func makeTagListHTML(for page: TagListPage,
                             context: PublishingContext<JZDPublish>) throws -> HTML? {
            HTML(
                .lang(context.site.language),
                .head(for: page, on: context.site),
                .body(
                    .comment("TAG LIST ITEM HTML"),
                    .header(for: context, selectedSection: nil),
                    .wrapper(
                        .h1("Browse all tags"),
                        .ul(
                            .class("all-tags"),
                            .forEach(page.tags.sorted()) { tag in
                                .li(
                                    .class("tag"),
                                    .a(
                                        .href(context.site.path(for: tag)),
                                        .text(tag.string)
                                    )
                                )
                            }
                        )
                    ),
                    .footer(for: context.site)
                )
            )
        }
        
        func makeTagDetailsHTML(for page: TagDetailsPage,
                                context: PublishingContext<JZDPublish>) throws -> HTML? {
            HTML(
                .lang(context.site.language),
                .head(for: page, on: context.site),
                .body(
                    .header(for: context, selectedSection: nil),
                    .wrapper(
                        .h1(
                            .comment("TAG DETAILS HTML"),
                            "Tagged with ",
                            .span(.class("tag"), .text(page.tag.string))
                        ),
                        .a(
                            .class("browse-all"),
                            .text("Browse all tags"),
                            .href(context.site.tagListPath)
                        ),
                        .itemList(
                            for: context.items(
                                taggedWith: page.tag,
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
    }
}

private extension Node where Context == HTML.BodyContext {
    static func wrapper(_ nodes: Node...) -> Node {
        .div(.class("wrapper"), .group(nodes))
    }
    
    static func header<T: Website>(
        for context: PublishingContext<T>,
        selectedSection: T.SectionID?
    ) -> Node {
        let sectionIDs = T.SectionID.allCases
        
        return .header(
            .wrapper(
                .a(.class("site-icon"), .href("/"), .img(.src("/images/memoji.png"), .alt("Memoji of Jacob giving a thumbs up"))),
//                .p("A site about learning to think and living by principle."),
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
    
    static func itemList<T: Website>(for items: [Item<T>], on site: T) -> Node {
        return .ul(
            .class("item-list"),
            .forEach(items) { item in
                .li(.article(
                    .h1(.a(
                        .href(item.path),
                        .text(item.title)
                    )),
                    .tagList(for: item, on: site),
                    .p(.text(item.description)),
                    .p(.text(item.date.formatted()), .class("date"))
                ))
            }
        )
    }
    
    static func tagList<T: Website>(for item: Item<T>, on site: T) -> Node {
        return .ul(.class("tag-list"), .forEach(item.tags) { tag in
            .li(.a(
                .href(site.path(for: tag)),
                .text(tag.string)
            ))
        })
    }
    
    static func footer<T: Website>(for site: T) -> Node {
        return .footer(
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
                .a(.img(.src("/images/linkedin.svg")), .target(.blank), .class("find-me"), .href("https://www.linkedin.com/in/jacob-rakidzich-b8722436/")),
                .class("social")
            )
        )
    }
}

extension Date {
    func formatted() -> String {
        let formatter = DateFormatter()
        formatter.dateFormat = "MMMM dd yyyy"
        formatter.timeZone = TimeZone(abbreviation: "UTC")
        return formatter.string(from: self)
    }
}
