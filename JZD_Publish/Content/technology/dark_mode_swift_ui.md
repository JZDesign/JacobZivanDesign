---
date: 2021-03-07 08:13
description: Sharing dark mode capable colors in SwiftUI using @Environment(\.colorScheme), protocols, and extensions. Forget `\UITraitCollection.userInterfaceStyle. Learn how to create shareable, responsive colors using computed properties in SwiftUI.
tags: iOS, MacOS, SwiftUI, Technology, Tutorial, UI/UX, Dark Mode
---

# Handling Dark Mode Elegantly in SwiftUI

In SwiftUI, handling dark mode was made to be easy. The guys over at Apple thought things through and included the user's preferred color scheme as an [environment value](https://developer.apple.com/documentation/swiftui/environmentvalues), `@Environment(\.colorScheme)`. It's used like so:

<br/>

```swift
struct DarkModeView: View {
    @Environment(\.colorScheme) var colorScheme: ColorScheme

    var body: some View {
        Text("Hi")
        .foregroundColor(colorScheme == .dark ? .white : .black)
    }
}
```
<br/>

In the example above, we simply apply the [ternary operator](https://www.hackingwithswift.com/sixty/3/7/the-ternary-operator) where we assign the color value. If it's `.dark` we return `.white`, if not we return `.black`. Usually, we need to handle more than one color in a view, so let's do it a few more times.

<br/>

```swift
struct DarkModeView: View {
    @Environment(\.colorScheme) var colorScheme: ColorScheme

    var body: some View {
        VStack {
            Text("Hi dude")
                .foregroundColor(colorScheme == .dark ? .white : .black)

            Button("Dude, this is neat") { print("neat") }
                .foregroundColor(colorScheme == .dark ? .white : .black)

            Text("Totally neat.")
                .foregroundColor(colorScheme == .dark ? .white : .black)

        }.background(colorScheme == .dark ? Color.black : Color.white)
    }
}
```
<br/>

That can get old pretty fast. Not only is it a lot to write, but the duplication leaves room for human error. If we chose to change the colors we'd need to change code in many locations. If done properly, we could change just one line of code. Instead of duplicating the color computation all over the place, let's use a computed property to handle that logic in one spot.

<br/>

```swift
struct DarkModeView: View {
    @Environment(\.colorScheme) var colorScheme: ColorScheme
    var fontColor: Color {
        colorScheme == .dark ? .white : .black
    }

    var body: some View {
        VStack {
            Text("Hi")
                .foregroundColor(fontColor)

            Button("Dude, this is neat") { print("neat") }
                .foregroundColor(fontColor)

            Text("Totally neat.")
                .foregroundColor(fontColor)
        }
    }
}
```
<br/>

Nice! That works pretty well. Unfortunately, that font color declaration is only included in this view. To solve that and share dark mode friendly colors, we'll make a protocol that handles that.

<br/>

```swift
protocol Themeable {
    var colorScheme: ColorScheme { get }
}
```
<br/>

This defines an interface of a `Themeable` object, but it does nothing to share the colors. In Swift, we are unable to define anything but the interface in a protocol's declaration, but we can extend protocols. 

<br/>

```swift 
extension Themeable {
    var fontColor: Color {
        colorScheme == .dark ? .white : .black
    }
}
```
<br/>

With that in place, we can modify the `DarkModeView` that we created earlier. It won't change much. We can also _share_ `fontColor` in other views! Check it out:

<br/>

```swift
struct DarkModeView: View, Themeable {
    @Environment(\.colorScheme) var colorScheme: ColorScheme
    
    var body: some View {
        VStack {
            Text("Hi")
                .foregroundColor(fontColor)
            
            Button("Dude, this is neat") { print("neat") }
                .foregroundColor(fontColor)
            
            Text("Totally neat.")
                .foregroundColor(fontColor)
        }
    }
}

struct AnotherDarkModeView: View, Themeable {
    @Environment(\.colorScheme) var colorScheme: ColorScheme
    
    var body: some View {
        Text("Pretty Cool!! Right?!")
            .foregroundColor(fontColor)
    }
}

```

<br/>

With protocols, extensions, and computed properties, we created a dark mode friendly way to share colors. This method isn't limited to colors and the user's selected color scheme. What other user preferences could you account for in this way? Think about it and try it out on your own!

<br/>