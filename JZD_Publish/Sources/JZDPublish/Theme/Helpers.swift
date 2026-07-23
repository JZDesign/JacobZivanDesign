import Foundation
import Publish
import Plot

extension HTML {
    static func page<T: Website>(
        for context: PublishingContext<T>,
        location: Location,
        additionalMetaData: [Node<HTML.HeadContext>] = [],
        body: Node<HTML.DocumentContext>
    ) -> HTML {
        HTML(
            .lang(context.site.language),
            .headWithAddedMetaData(
                for: location,
                on: context.site,
                metaData: [JZDPublish.ItemMetadata.xHandle] + additionalMetaData
            ),
            body
        )
    }
}

extension Path {
    var pageURLString: String {
        let path = absoluteString
        return path.hasSuffix("/") ? path : path + "/"
    }
}

extension String {
    var escapedForHTMLAttribute: String {
        replacingOccurrences(of: "&", with: "&amp;")
            .replacingOccurrences(of: "\"", with: "&quot;")
            .replacingOccurrences(of: "<", with: "&lt;")
            .replacingOccurrences(of: ">", with: "&gt;")
    }
}

extension Website {
    func canonicalURL(for path: Path) -> URL {
        guard !path.string.isEmpty else {
            return url
        }

        return url.appendingPathComponent(
            path.string,
            isDirectory: true
        )
    }

    func canonicalURL(for location: Location) -> URL {
        canonicalURL(for: location.path)
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
            .safeSiteName(site.name),
            .url(site.canonicalURL(for: location)),
            .safeTitle(title),
            .safeDescription(description),
            metaData.node,
            .twitterCardType(location.imagePath == nil ? .summary : .summaryLargeImage),
            .forEach(stylesheetPaths, { .stylesheet($0) }),
            .viewport(.accordingToDevice),
            .unwrap(site.favicon, { .favicon($0) }),
            .unwrap(rssFeedPath, { path in
                let title = rssFeedTitle ?? "Subscribe to \(site.name)"
                return .rssFeedLink(
                    path.absoluteString,
                    title: title.escapedForHTMLAttribute
                )
            }),
            .unwrap(location.imagePath ?? site.imagePath, { path in
                let url = site.url(for: path)
                return .socialImageLink(url)
            })
        )
    }
}

extension Node where Context == HTML.HeadContext {
    static func safeSiteName(_ name: String) -> Node {
        .meta(
            .name("og:site_name"),
            .content(name.escapedForHTMLAttribute)
        )
    }

    static func safeTitle(_ title: String) -> Node {
        let escapedTitle = title.escapedForHTMLAttribute

        return .group([
            .element(named: "title", text: title),
            .meta(.name("twitter:title"), .content(escapedTitle)),
            .meta(.name("og:title"), .content(escapedTitle))
        ])
    }

    static func safeDescription(_ description: String) -> Node {
        let escapedDescription = description.escapedForHTMLAttribute

        return .group([
            .meta(.name("description"), .content(escapedDescription)),
            .meta(.name("twitter:description"), .content(escapedDescription)),
            .meta(.name("og:description"), .content(escapedDescription))
        ])
    }
}
