import Files
import Foundation
import Plot
import Publish

extension PublishingStep where Site == JZDPublish {
    static func generateCanonicalSiteMap() -> Self {
        step(named: "Generate canonical site map") { context in
            let site = context.site
            let timeZone = TimeZone(secondsFromGMT: 0)!
            let allItems = context.sections.flatMap(\.items)
            var lastModifiedDates = [URL: Date]()
            var urls = Set<URL>()

            func include(_ url: URL, lastModified: Date? = nil) {
                urls.insert(url)

                if let lastModified,
                   lastModified > (lastModifiedDates[url] ?? .distantPast) {
                    lastModifiedDates[url] = lastModified
                }
            }

            include(site.url, lastModified: allItems.map(\.date).max())

            let sections = context.sections.sorted {
                $0.id.rawValue < $1.id.rawValue
            }

            for section in sections {
                include(
                    site.canonicalURL(for: section),
                    lastModified: section.items.map(\.date).max()
                )

                for item in section.items {
                    include(
                        site.canonicalURL(for: item),
                        lastModified: item.date
                    )
                }
            }

            let pages = context.pages.values
                .filter { !$0.path.string.hasPrefix("_") }
                .sorted { $0.path < $1.path }

            for page in pages {
                include(site.canonicalURL(for: page))
            }

            if site.tagHTMLConfig != nil {
                include(
                    site.canonicalURL(for: site.tagListPath),
                    lastModified: allItems.map(\.date).max()
                )

                for tag in context.allTags {
                    include(
                        site.canonicalURL(for: site.path(for: tag)),
                        lastModified: context.items(taggedWith: tag).map(\.date).max()
                    )
                }
            }

            let nodes: [Node<SiteMap.URLSetContext>] = urls
                .sorted { $0.absoluteString < $1.absoluteString }
                .map { url in
                    guard let lastModified = lastModifiedDates[url] else {
                        return .url(.loc(url))
                    }

                    return .url(
                        .loc(url),
                        .lastmod(lastModified, timeZone: timeZone)
                    )
                }

            let siteMap = SiteMap(.group(nodes))
            let file = try context.createOutputFile(at: "sitemap.xml")
            try file.write(siteMap.render())
        }
    }
}
