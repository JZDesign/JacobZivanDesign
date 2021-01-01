import Foundation
import Publish
import Plot

extension HTML {
    static func page<T: Website>(for context: PublishingContext<T>, location: Location, body: Node<HTML.DocumentContext>) -> HTML {
        HTML(
            .lang(context.site.language),
            .head(for: location, on: context.site),
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
