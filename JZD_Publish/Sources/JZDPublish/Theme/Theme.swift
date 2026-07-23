import Foundation
import Publish
import Plot

extension Node where Context == HTML.BodyContext {
    static func whoYaIcon(sizes: String, eager: Bool) -> Node {
        .picture(
            .class("responsive-picture"),
            .source(
                .attribute(named: "type", value: "image/webp"),
                .srcset(
                    "/images/apps/whoya-icon-320.webp 320w, " +
                    "/images/apps/whoya-icon-640.webp 640w, " +
                    "/images/apps/whoya-icon-1024.webp 1024w"
                ),
                .attribute(named: "sizes", value: sizes)
            ),
            .img(
                .src("/images/apps/whoya-icon.jpg"),
                .width(1024),
                .height(1024),
                .alt("WhoYa app icon"),
                .attribute(named: "loading", value: eager ? "eager" : "lazy"),
                .attribute(named: "decoding", value: "async"),
                .attribute(named: "fetchpriority", value: eager ? "high" : nil)
            )
        )
    }

    static func noahWeatherIcon() -> Node {
        .picture(
            .class("responsive-picture"),
            .source(
                .attribute(named: "type", value: "image/webp"),
                .srcset(
                    "/images/apps/noah-weather-icon-240.webp 240w, " +
                    "/images/apps/noah-weather-icon-480.webp 480w, " +
                    "/images/apps/noah-weather-icon-720.webp 720w"
                ),
                .attribute(
                    named: "sizes",
                    value: "(max-width: 228px) calc(100vw - 48px), (max-width: 980px) 180px, 240px"
                )
            ),
            .img(
                .src("/images/apps/noah-weather-icon.png"),
                .width(1024),
                .height(1024),
                .alt("Noah Weather app icon"),
                .attribute(named: "loading", value: "lazy"),
                .attribute(named: "decoding", value: "async")
            )
        )
    }
}

extension Theme where Site == JZDPublish {
    static var JZD: Self {
        Theme(
            htmlFactory: JZD_Factory(),
            resourcePaths: ["Resources/stylesheets/styles.css"]
        )
    }

    struct JZD_Factory: HTMLFactory {
        func makeIndexHTML(
            for index: Index,
            context: PublishingContext<JZDPublish>
        ) throws -> HTML {
            let latestItems = Array(context.allItems(
                sortedBy: \.date,
                order: .descending
            ).prefix(3))

            return .page(for: context, location: index, body:
                .body(
                    .comment("INDEX HTML"),
                    .header(for: context, selectedSection: nil),
                    .main(
                        .class("home"),
                        .section(
                            .class("home-hero"),
                            .div(
                                .class("home-hero-copy"),
                                .h1("Apps made with care."),
                                .p("Independent software for families, everyday life, and a calmer relationship with technology."),
                                .a(
                                    .class("button button-dark"),
                                    .href("#apps"),
                                    .text("Explore the apps")
                                )
                            ),
                            .div(
                                .class("home-hero-art"),
                                .whoYaIcon(
                                    sizes: "(max-width: 385px) 70vw, (max-width: 720px) 270px, (max-width: 1235px) 34vw, 420px",
                                    eager: true
                                )
                            )
                        ),
                        .section(
                            .id("apps"),
                            .class("apps"),
                            .div(.class("section-heading"), .h2("The apps")),
                            .article(
                                .class("app-feature app-feature-whoya"),
                                .div(
                                    .class("app-art"),
                                    .whoYaIcon(
                                        sizes: "(max-width: 318px) calc(100vw - 48px), (max-width: 720px) 270px, (max-width: 1146px) calc(41vw - 30px), 440px",
                                        eager: false
                                    )
                                ),
                                .div(
                                    .class("app-copy"),
                                    .h3("WhoYa"),
                                    .p("Help kids memorize the phone numbers that matter—through games they’ll actually want to play."),
                                    .div(
                                        .class("app-actions"),
                                        .a(
                                            .class("button button-store"),
                                            .href("https://apps.apple.com/us/app/whoya/id6757703773"),
                                            .target(.blank),
                                            .span(
                                                .class("apple-mark"),
                                                .attribute(named: "aria-hidden", value: "true"),
                                                .text("")
                                            ),
                                            .span(.text("Download on the App Store"))
                                        ),
                                        .a(
                                            .class("text-link text-link-light"),
                                            .href("https://jzdesign.github.io/whoya-site/index.html"),
                                            .target(.blank),
                                            .text("Visit WhoYa ↗")
                                        )
                                    )
                                )
                            ),
                            .article(
                                .class("app-feature app-feature-noah"),
                                .div(
                                    .class("app-art app-art-small"),
                                    .noahWeatherIcon()
                                ),
                                .div(
                                    .class("app-copy"),
                                    .h3("Noah Weather"),
                                    .p("Weather without the noise. A peaceful, private forecast that keeps your attention on what matters."),
                                    .p(.class("coming-soon"), .text("Coming soon"))
                                ),
                                .div(
                                    .class("noah-screens"),
                                    .img(
                                        .src("/images/apps/noah-forecast.jpg"),
                                        .width(368),
                                        .height(800),
                                        .alt("Noah Weather forecast screen"),
                                        .attribute(named: "loading", value: "lazy"),
                                        .attribute(named: "decoding", value: "async")
                                    ),
                                    .img(
                                        .src("/images/apps/noah-radar.jpg"),
                                        .width(368),
                                        .height(800),
                                        .alt("Noah Weather radar screen"),
                                        .attribute(named: "loading", value: "lazy"),
                                        .attribute(named: "decoding", value: "async")
                                    )
                                )
                            )
                        ),
                        .section(
                            .id("writing"),
                            .class("home-writing"),
                            .div(
                                .class("home-writing-heading"),
                                .h2("Writing"),
                                .p("Notes on Swift, Kotlin, software design, and the work behind the apps.")
                            ),
                            .compactItemList(for: latestItems),
                            .a(
                                .class("text-link"),
                                .href("/technology/"),
                                .text("Read all writing →")
                            )
                        )
                    ),
                    .footer(for: context.site)
                )
            )
        }

        func makeSectionHTML(
            for section: Section<JZDPublish>,
            context: PublishingContext<JZDPublish>
        ) throws -> HTML {
            .page(for: context, location: section, body:
                .body(
                    .comment("SECTION HTML"),
                    .comment(section.id.rawValue),
                    .header(for: context, selectedSection: section.id),
                    .wrapper(
                        .h1(.text(section.title)),
                        .itemList(for: section.items, on: context.site)
                    ),
                    .footer(for: context.site)
                )
            )
        }

        func makePageHTML(
            for page: Page,
            context: PublishingContext<JZDPublish>
        ) throws -> HTML {
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
