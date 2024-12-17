---
date: 2024-12-16 22:10
description: Managing localized strings can be difficult. But, there are some tools to make sure we don't royally mess things up. In this article, we'll cover how to automate checks for localized string regressions.
tags: Technology, Tips, Workflow, Swift, Localization
---

# Never Miss a Localized String Value Again

Have you ever had this happen to you? You're testing out a feature in your app, some other team members were recently moving things around and cleaning things up, and you notice that the text on your screen is… odd. It's not english anymore. It's a string key, something that says: `"FEED_PAGE_TITLE_SIGNED_IN"` instead of `"Your Feed"`.

Well… that wasn't like that last week… how did that happen? And as you dig, you realize the error, the team moved the strings to a different bundle and now your reference to the localized string is nil. 

If only the compiler would have caught that for you…

<br/>

## `String.LocalizedValue` to the rescue

I've got some good news for you. If you never want to run into this again, you can use an enum inside of a Swift Package to fix this for you. 

It's quite simple. In a Swift Package that has a default localization set, any `LocalizedStringKey` or `String.LocalizationValue` symbols will automatically create entries in a String Catalogue. Then, you can reference that symbol instead of a magic string, and if your team moves things around, the compiler will check your work and save your hide.

<br/>

## Setting up a Swift Package

First things first, you need a Swift Package to host your code. Make a directory called "StringExample" and start a Swift Package in that directory with the same name. Then in the `Package.swift` file, add the `defaultLocalization` property like so:

```swift
let package = Package(
    name: "StringExample",
    defaultLocalization: "en", // ADD THIS LINE
    platforms: [.iOS(.v15), .macOS(.v12)], // Ensure minimum versions are set
    products: [ /* Leave this alone */ ],
    targets: [ /* Leave this alone */ ]
)
```

Then, inside of the source directory, add a new "String Catalogue" file.

<br/>

## Creating the enum

When you have that ready, what we need to do is create the symbols that we can reference in our code to prevent that debacle I described above. Go ahead and open the `StringExample.swift` file, and add the following code:

```swift
import Foundation

public enum Strings {
    public enum Home: String.LocalizationValue {
        case title = "HOME_TITLE"
    }
}
```

After that, you can build the package by hitting CMD + B — When it's complete, open up the String Catalogue. There you will notice a string entry with the key `HOME_TITLE` and an empty value.

Now that it's there, it won't delete the key unless you delete the enum case or change the raw value. That means you can add a localized value in that String Catalogue, and you're on your way to having a stable localization setup.

Go ahead and set the value to something simple, like: "Your Feed"

<br/>

## Getting the localized strings

Now that you have an enum with the keys in there, you still aren't able to get the localized values yet. Let's make a protocol that helps us with this. In the same file, write the following code:

```swift
public protocol AutoLocalizing {
    var rawValue: String.LocalizationValue { get }
}

public extension AutoLocalizing {
    func callAsFunction() -> String {
        String(localized: rawValue, bundle: .module)
    }
}
```

After you've done that, conform your `Home` enum to `AutoLocalizing` like so:

```swift
public enum Home: String.LocalizationValue, AutoLocalizing { /* Leave alone */ }
```

Finally, when you've done that, you can reference the strings by the enum and get them localized in a flash. That will look something like this:

```swift
let x: String = Strings.Home.title()
```

<br/>

## Wrapping up

Now you won't have to worry about those human issues with strings getting relocated because the compiler will complain the moment the symbol needs to be imported. We can go even further and write automated tests to ensure that there are values set too! Conform the enum to `CaseIterable` and assert that the key `!=` the localized value for each case. All you need to do is run the assertion for each enum and localization. Short and sweet.

### 🔥☝️ Sample code up [here.](https://github.com/JZDesign/AutoLocalizingExample)


