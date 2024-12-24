---
date: 2024-12-23 17:13
description: Did you know that SwiftUI has Markdown support and you can put links in your text… and they work? Well that's old news now, in this article I'll show you how to hijack the SwiftUI Markdown link and treat it like a button to run any code you want!
tags: MacOS, iOS, Swift, Technology, Tutorial, SwiftUI
---

# Markdown links can do what?

Apple does some neat stuff. They build things to be reusable and extensible in ways that I'm not sure they've even thought about—though I'm not sure that's the case here. One of the things that they've done well is SwiftUI's Markdown support. Sure… there are some features lacking, but the features they _do_ have are well designed.

One thing SwiftUI's Markdown does support is linking to a URL. Kind of like [this](https://developer.apple.com/documentation/swiftui/text).

You do that with code like this:

```swift
Text("Kind of like [this](https://developer.apple.com/documentation/swiftui/text).")
```

But, an interesting thing about URLs is that they don't have to be web addresses. And if they don't need to be web addresses… Apple has to have a way to support handling them… Right?

<br/>

## URLs are not just web addresses

If you read the [Apple docs for URL Components](https://developer.apple.com/documentation/foundation/urlcomponents), you'll notice a [referenced standard](https://www.ietf.org/rfc/rfc3986.txt). In there, it defines how to create a URL based on components. One such component is the `scheme`

Schemes are simple text values at the very front of the URL. You've seen them before. They are values like: `http`, `https`, `file`, `mailto`, `tel` etc., And you see them followed immediately by a colon. Like `https://jacobzivandesign.com` or `mailto:TheNerd@jacobzivandesign.com`. That colon is the delimiter between the scheme and the next component of the URL. And according to that standard, the scheme could be any number of things—even things you can define yourself.

<br/>

## Taking advantage of the URL schematic 

Since Apple supports that standard, and there are commonly supported URL types out there today, that means you can dial numbers with the `tel` scheme or send emails with the `mailto` scheme out of the box, like:

```swift
Text("[Emergency?](tel:911)")
Text("[Need Help?](mailto:TheNerd@jacobzivandesign.com)")
```

But what if you need to log that the link was tapped? Or… do something _other_ than link to some pre-existing functionality? Could we make it act like a button?

> Could we make it act like a button?

Well… Yes. We can.

<br/>

## Hijacking the link

So, how do we get a hold of the link tap and respond to it? In the world of UIKit, we usually had to subclass and write some hideous code, or swizzle… but in SwiftUI, we can simply inject a different URL handler. Like this:

```swift
Text("[log and call](tel:5558675309)")
    .environment(\.openURL, .init(handler: { url in
        logger.logDial(url.absoluteString)
        MyCustomURLHandler(for: url).invoke()
    })
```

Simple right? Well… that also means we can do other stuff too, like scroll to a different view, or start an animation… or… really anything you can think about!! But first, we should create a url to handle that. I personally use the `data` scheme to do it. Like this:

```swift
Text("[Scroll to top](data:scroll-to-top)")
```

Then, you can use the `openURL` environment variable to handle the scroll to top action, or any other action you can think about really.

<br/>

![Mind Blown… Right?](https://media.giphy.com/media/sO5derwxGq1Z6/giphy.gif?cid=ecf05e47njbxw942i3u6nbovf1qhjuy1wco0qzwd1uevwffi&ep=v1_gifs_search&rid=giphy.gif&ct=g)

<br/>

## Want to see it in action? 

See the Sample Code [here](https://github.com/JZDesign/swiftui-markdown-links-do-what)