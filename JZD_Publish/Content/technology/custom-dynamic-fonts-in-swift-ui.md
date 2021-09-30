---
date: 2021-01-03 10:13
description: A Tutorial for adding Custom Fonts in SwiftUI with Dynamic Sizes. Learn how to add fonts to an iOS application and set them up to scale with the user's preferred font size through SwiftUI Font extensions.
tags: Accessibility, iOS, SwiftUI, Technology, Tutorial, UI/UX
---

# Scalable Custom Fonts in SwiftUI

![Custom Font Example](../../images/custom-font-example.png)

Early on in my journey as an iOS engineer, requests from creatives were always points of tension for me. I thought I only had two options: 

Please the designer, or, make a user experience that was resilient to screen size and personal settings (like accessible font sizes). 

Turns out, like most times I think something is either Black or White, I was wrong.

Custom fonts were one of those taboo topics for me. I didn't know how to utilize them properly. I would add custom fonts to a project, and set very specific font sizes and weights to make the view pixel perfect... _on one device._ Later I learned about preferred font sizes and how they worked. It kinda rocked my world. Afterwards, I was able to please both our users and creatives with UIFont extensions in UIKit. 

In this tutorial, we will recreate that functionality in SwiftUI.

<br/>

## Road Map

We're going to cover more than adding fonts to a SwiftUI application. The font's will be scalable with a user's preferred font size, _and_ it will be a developer friendly implementation. To get there, we'll do things in steps:

1. Add custom fonts to a project
2. Create a simple way to reference the fonts
3. Set default values for each `TextStyle`
4. Make it Swifty!

<br/>

## Adding a Font

### Importing Files into Xcode
<br/>

This is a simple step. First find a font you'd like to, _and have rights to,_ use. For this tutorial we'll be using [JetBrains Mono](https://www.jetbrains.com/lp/mono/). When you've downloaded the fonts, move them into your application's directory. Afterwards, open the project in Xcode, ensuring the Navigator Menu is open. Then add the files to your project by clicking the `+` button in the bottom left, selecting "Add Files to YOUR_PROJECT".

<img style="width:300px;" src="../../images/add-fonts.png" alt=""/>

<br/>

### Provide the Fonts to the Application
<br/>

Adding the fonts to the project is sadly not enough. To utilize the fonts, we need to tell the project what fonts to prepare for use. This is done inside of the application's `.plist` file. The key is "Fonts provided by application" and its value is the array of filenames you wish to import (excluding file type). 

If you're following along to this tutorial using **JetBrains Mono** you can `control + click` on the `.plist` file, then select `Open As -> Source Code`. 

<img style="width:360px;" src="../../images/plist-source-code.png" alt=""/>
<br/>

After the file opens, you can paste the following code after `<dict>`:

<br/>

```xml
<key>UIAppFonts</key>
	<array>
		<string>JetBrainsMono-Bold.ttf</string>
		<string>JetBrainsMono-BoldItalic.ttf</string>
		<string>JetBrainsMono-ExtraBold.ttf</string>
		<string>JetBrainsMono-ExtraBoldItalic.ttf</string>
		<string>JetBrainsMono-ExtraLight.ttf</string>
		<string>JetBrainsMono-ExtraLightItalic.ttf</string>
		<string>JetBrainsMono-Italic.ttf</string>
		<string>JetBrainsMono-Light.ttf</string>
		<string>JetBrainsMono-LightItalic.ttf</string>
		<string>JetBrainsMono-Medium.ttf</string>
		<string>JetBrainsMono-MediumItalic.ttf</string>
		<string>JetBrainsMono-Regular.ttf</string>
		<string>JetBrainsMono-Thin.ttf</string>
		<string>JetBrainsMono-ThinItalic.ttf</string>
	</array>
```
<br/>

## Enumerate Your Fonts For Easy Reference

Now that we've fully imported the fonts, we can use them like so:

```swift
Text("").font(.custom("JetBrainsMono-Regular", size: 18, relativeTo: .body))
```

Because the fonts are keyed by filename, using a font after it's imported is prone to human error. I like to enumerate sets of finite options as a type so that I can limit the scope of potential typos to one instance.

To do this, create an enum of type `String` that contains each font file name.

```swift
enum JetBrainsMono: String {
    case regular = "JetBrainsMono-Regular"
    case italic = "JetBrainsMono-Italic"
    case medium = "JetBrainsMono-Medium"
    case mediumItalic = "JetBrainsMono-MediumItalic"
    case bold = "JetBrainsMono-Bold"
    case boldItalic = "JetBrainsMono-BoldItalic"
    case extraBold = "JetBrainsMono-ExtraBold"
    case extraBoldItalic = "JetBrainsMono-ExtraBoldItalic"
    case light = "JetBrainsMono-Light"
    case lightItalic = "JetBrainsMono-LightItalic"
    case extraLight = "JetBrainsMono-ExtraLight"
    case extraLightItalic = "JetBrainsMono-ExtraLightItalic"
    case thin = "JetBrainsMono-Thin"
    case thinItalic = "JetBrainsMono-ThinItalic"
}
```
<br/>

### Ahhhh, Type Safety.
<br/>

Now we can use the custom font's with the enumeration, like so:

```swift
Text("").font(.custom(JetBrainsMono.regular.rawValue, size: 18, relativeTo: .body))
```

<br/>
## Relative Font Sizes

The human brain is a fickle thing... We're likely to forget if `.body` should be size 18 or 24. Even if we do remember, we may mistype the value and get a wonky view. Since there is a finite set of `TextStyles`, I would again recommend abstracting this bit of detail.

I did this by extending SwiftUI's `Font.TextStyle` like so:

```swift
extension Font.TextStyle {
    var size: CGFloat {
        switch self {
        case .largeTitle: return 60
        case .title: return 48
        case .title2: return 34
        case .title3: return 24
        case .headline, .body: return 18
        case .subheadline, .callout: return 16
        case .footnote: return 14
        case .caption, .caption2: return 12
        @unknown default:
            return 8
        }
    }
}
```

<br/>

Great! This helps prevent our faulty memories from ruining our UI/UX! It can be used like so:


```swift
Text("")
.font(
    .custom(
        JetBrainsMono.regular.rawValue,
        size: Font.TextStyle.body.size,
        relativeTo: .body
        )
    )
```

<br/>

### A Word on Behalf of Designers Everywhere
<br/>

Apple has put [a lot of thought](https://developer.apple.com/design/human-interface-guidelines/macos/visual-design/typography/) into their font's sizing and how they scale. But each typeface is unique, and a size 16 SF font will be different than size 16 SomeCustomFont. For those reasons, we use the `.custom()` function above to relate a base size to how the font should scale with accessibility settings.

_I would recommend you sit down with your designer and go over each of Apple's `TextStyles` with them. Hopefully they're opinionated and will help you nail down what size each of them should be for your custom font._

<br/>

## Let's Make it Swifty!


```swift
Text("")
.font(
    .custom(
        JetBrainsMono.regular.rawValue,
        size: Font.TextStyle.body.size,
        relativeTo: .body
        )
    )
```

That is a long line of code to set a font... That can be fixed. 

<br/>

First, let's create a helper function to get a custom font using our enum.

```swift
extension Font {
    static func custom(_ font: JetBrainsMono, relativeTo style: Font.TextStyle) -> Font {
        custom(font.rawValue, size: style.size, relativeTo: style)
    }
}
```
<br/>

Which we can use like this:

```swift
Text("").font(.custom(.regular, relativeTo: .body))
```

Now we're getting somewhere. However, that implementation still leaves too much room for human error. We can do better.

<br/>

Next we're going to create some static variables that will contain all of the detail that we don't care to remember. It will go something like this:

```swift
extension Font {
    static let jetBrainsMono = custom(.regular, relativeTo: .body)
    static let jetBrainsMonoLargeTitle = custom(.bold, relativeTo: .largeTitle)
}
```
<br/>

This will allow us to use our custom font like so:

```swift
Text("").font(.jetBrainsMono)
```

Now that is swifty!

<br/>

# 🎉🍾🥳

Good work! You've learned how to add fonts to an XCode project, represent the fonts and their base sizes in enumerations, and replicate SwiftUI's `preferredFont` implementation!

In a [newer article](../custom-fonts-from-swfit-package) you'll learn how to package these fonts for reuse.