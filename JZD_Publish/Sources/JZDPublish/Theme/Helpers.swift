import Foundation
import Publish
import Plot

extension HTML {
    static func page<T: Website>(for context: PublishingContext<T>, location: Location, body: Node<HTML.DocumentContext>) -> HTML {
        HTML(
            .lang(context.site.language),
            .headWithAddedMetaData(
                for: location,
                on: context.site,
                metaData: [
                    JZDPublish.ItemMetadata.mastodon,
                    JZDPublish.ItemMetadata.xHandle
                ]
            ),
            body
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

extension Node where Context == HTML.BodyContext {
    
    static func wrapper(_ nodes: Node...) -> Node {
        .div(.class("wrapper"), .group(nodes))
    }
    
}


extension Node where Context == HTML.DocumentContext {
    static func headWithAddedMetaData<T: Website>(
        for location: Location,
        on site: T,
        metaData: [Node<HTML.HeadContext>],
        titleSeparator: String = " | ",
        stylesheetPaths: [Path] = ["/styles.css"],
        rssFeedPath: Path? = .defaultForRSSFeed,
        rssFeedTitle: String? = nil
    ) -> Node {
        var title = location.title

        if title.isEmpty {
            title = site.name
        } else {
            title.append(titleSeparator + site.name)
        }

        var description = location.description

        if description.isEmpty {
            description = site.description
        }

        return .head(
            .encoding(.utf8),
            .siteName(site.name),
            .url(site.url(for: location)),
            .title(title),
            .description(description),
            metaData.node,
            .twitterCardType(location.imagePath == nil ? .summary : .summaryLargeImage),
            .forEach(stylesheetPaths, { .stylesheet($0) }),
            .viewport(.accordingToDevice),
            .unwrap(site.favicon, { .favicon($0) }),
            .unwrap(rssFeedPath, { path in
                let title = rssFeedTitle ?? "Subscribe to \(site.name)"
                return .rssFeedLink(path.absoluteString, title: title)
            }),
            .unwrap(location.imagePath ?? site.imagePath, { path in
                let url = site.url(for: path)
                return .socialImageLink(url)
            })
        )
    }
}
