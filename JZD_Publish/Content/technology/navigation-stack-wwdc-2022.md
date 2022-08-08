---
date: 2022-08-07 13:13
description: At WWDC 2022, Apple announced a new navigation paradigm that simplifies managing a user's navigation stack immensely! Take a look at the new Navigation Stack, available on iOS 16 and macOS 13
tags: macOS, iOS, SwiftUI, Swift, Technology, Tutorial, Beta
---


# Intelligent Navigation with SwiftUI

With the release of macOS 13 and iOS 16, SwiftUI will support a content-aware routing navigation API called [NavigationStack](https://developer.apple.com/documentation/swiftui/navigationstack/). Previously, the "Nav Stack" was a simple stack of views that got piled on top of each other inside of a [NavigationView](https://developer.apple.com/documentation/swiftui/navigationview). The developer needed to manage all of the state and details regarding what view presented the other and make sure the new view had the data it needed to display. 

With the new `NavigationStack`, Apple chose to couple the presentation and state logic into one incredibly useful view. And it's so simple to use, I didn't get it at first, I thought it _had to be_ more complicated than it was. 

## Navigating to your first new view

In this example, we're going to perform _**very**_ simple navigation, just to show how it works.

For starters, we need to wrap the first view in a `NavigationStack` To do so, let's do that in our `App.swift` file.

```swift
struct MyApp: App {
    var body: some Scene {
        WindowGroup {
            NavigationStack {
                ContentView()
            }
        }
    }
}
```
<br/>

Great, Now that we've done that, let's set a very simple destination in our view. For now, it will just present text. To do so, we're going to add a [NavigationLink](https://developer.apple.com/documentation/swiftui/navigationlink/) to our `ContentView`


```swift
struct ContentView: View {
    var body: some View {
        VStack {
            NavigationLink(
                value: "I've Navigated",
                label: { Text("Test Navigating") }
            )
        }
    }
}
```

<br/>

This is important. The `NavigationLink` has 2 arguments:

1. The value sent during the navigation
2. The "link" that is displayed before the navigation event. This could be a simple button, or a custom view.

In that example above, the user would see a link in the `ContentView` that says `"Test Navigating"` though, when it's tapped it does nothing. 

But why?

Well, like the old `NavigationLink`, we still need to provide a destination. This time it's done differently. Check it out.

```swift
struct ContentView: View {
    var body: some View {
        VStack {
            NavigationLink(
                value: "I've Navigated",
                label: { Text("Test Navigating") }
            )
        }
        // Add the destnation here
        .navigationDestination(for: String.self) {
            Text($0)
        }
    }
}
```

<br/>

This may be a little confusing at first, but it's quite simple. When the user taps on `"Test Navigating"` SwiftUI registers the value `"I've Navigated"` to the `NavigationStack`. Since we've set up a destination listening for the `String` type, it will present a new screen with that data. 

<br/>

## But wait, there's more!

We passed along a static string, but we could send anything `Hashable`.

To demonstrate, let's imagine we're creating an app with some complicated user settings. On app launch, the application fetches those settings and stores them in memory. We would represent those settings in unique structures. And if you're into enums like I am, you'd then enumerate all of the possible settings categories like so:

```swift
enum UserSettings: Hashable {
    case notification(NotificationSettings)
    case privacy(PrivacySettings)
    case appTheme(ThemeSettings)
    case paymentMethods(PaymentSettings)
}
```

<br/>

So from our Settings screen, we could use the `NavigationStack` like so:

```swift
struct SettingsScreen: View {
    @ObservableObject var settingsStore: SettingsStore
    
    var body: some View {
        NavigationStack {
            List(settingsStore.userSettings) { setting in
                NavigationLink(value: setting) {
                    Text(setting.title)
                }
            }.navigationDestination(for UserSettings.self) { settings in
                switch settings {
                case notification(let settings):
                    NotificationScreen(settings, save: settingStore.save)
                case privacy(let settings):
                    PrivacyScreen(settings, save: settingStore.save)
                case appTheme(let settings):
                    ThemeScreen(settings, save: settingStore.save)
                case paymentMethods(let settings):
                    PaymentScreen(settings, save: settingStore.save)
                }
            }
        }
    }
}
```
<br/>

That is _awesome!_ before, with the old NavigationView, we'd need to coordinate the state management ourselves. Additionally, the nav stack with an enumeration like the one we made above could handle nested or cyclical navigation flows with ease! 

This new API really cleans things up!