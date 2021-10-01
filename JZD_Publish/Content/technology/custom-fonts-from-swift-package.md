---
date: 2021-09-30 6:13
description: A Tutorial for adding Custom Fonts to a Swift Package that can be consumed by another application. Allowing you to easily share fonts between your iOS, tvOS, MacOS, and WatchOS apps!
tags: iOS, MacOS, SwiftUI, Technology, Tutorial, SPM
---

# Packaging your Custom Fonts in Swift Packages

In a [previous article](../custom-dynamic-fonts-in-swift-ui) we covered how to add custom fonts that respond to the user's preferred font sizes in Swift UI. In this article, we'll take that code and package it up inside of a Swift Package so we can share it with our Widgets, or other OS applications. If you haven't done so already, go ahead and read [that article](../custom-dynamic-fonts-in-swift-ui). We're going to use that code in this tutorial.

<br/>

## Creating the Package

First things first. We need to make our [Swift Package](https://swift.org/package-manager/). Open your terminal and execute the following commands:

```bash
mkdir JBMono
cd JBMono
swift package init --name JBMono
xed .
```

Let me take you through that line by line. 

1. `mkdir` will create a file directory or "folder" on your mac. 
1. `cd` will move your terminal into the desired directory. 
1. The third line does the most work. It creates several files and folders that output a Swift Package with the desired name. 
1. The final command `xed .` tells Xcode to open the `Package.swift` created by the previous command.

<br/>

## Preparing the Package

Now that you've got a package, we need to move all of the code we wrote in the [previous article](../custom-dynamic-fonts-in-swift-ui) into this package. I put all the font files in a directory named "Fonts" inside of "Sources/JBMono".

Copying the code and font files isn't all we need to do. Since this becomes a library an application will consume, the code inside of it is unusable unless we explicitly make the structures, extensions, and functions `public`. Go ahead and do that now. 

Afterwards, we'll focus on the `Package.swift` file. You should see this _(plus some comments)_:

```swift

let package = Package(
    name: "JBMono",
    products: [
        .library(
            name: "JBMono",
            targets: ["JBMono"]),
    ],
    dependencies: [],
    targets: [
        .target(
            name: "JBMono",
            dependencies: []),
        .testTarget(
            name: "JBMonoTests",
            dependencies: ["JBMono"]),
    ]
)
```

<br/>

That's a good start. First, lets specify what platforms we're targeting. Add the following line between `name: "JBMono",` and `products`:

```swift
platforms: [.iOS(.v15), .macOS(.v12), .watchOS(.v8), .tvOS(.v15)],
```

<br/>

Then we need to include the Font files as resources for the target. Without this step, the font's wont be useable by this package or any of its consumers.

Find the `.target` and add a comma and a new line after the dependency array closes. Then add the following:

```swift
resources: [.process("Fonts")]
```

<br/>

This tells Swift to package up all the files in the Fonts directory and make them available to the library.


> You'll get build errors if your file structure isn't right!


You'll get build errors if your file structure isn't right. So make sure your file structure looks like this:

```
Package.swift
Sources/
    JBMono/
        Fonts/
            fontfile.ttf
            fontfile.ttf
            fontfile.ttf
            fontfile.ttf
```

<br/>

## Registering the Fonts

In the [previous article](../custom-dynamic-fonts-in-swift-ui), we registered the fonts by including them in the applications' property list. With a Swift Package it works a little differently. Open up the `JBMono.swift` file that was generated for you and we'll add the code we need there.

<br/>

First, replace the contents with this empty public version:

```swift
import Foundation
import SwiftUI

public struct JBMono { }
```

<br/>

Then we need to add a function that will find the font file and tell the OS to register the font for use. Add a function to the struct:

```swift
fileprivate static func registerFont(bundle: Bundle, fontName: String, fontExtension: String) { }
```

<br/>

We want this function to be private to the module, it needs the bundle, the name of the font file, and the file extension.

The first thing the function needs to do is try and locate a font file that matches the name and extension provided. To do that, we call a function off of bundle like so:

```swift
bundle.url(forResource: fontName, withExtension: fontExtension)
```

<br/>

If that succeeds, we want to convert the found font URL to a [Core Graphics Data Provider](https://developer.apple.com/documentation/coregraphics/cgdataprovider), and finally we convert the data provider into a font. Inside of your `registerFont` function add the following lines:

```swift
guard let fontURL = bundle.url(forResource: fontName, withExtension: fontExtension),
    let fontDataProvider = CGDataProvider(url: fontURL as CFURL),
    let font = CGFont(fontDataProvider) else {
        fatalError("Couldn't create font from filename: \(fontName) with extension \(fontExtension)")
}
```

<br/>

But that's not it, after we've created the font, we need to actually register it with the Core Graphics Font Manager. To do so, we actually need to pass a reference to an unmanaged error. Add the following lines to the function after the guard statement closes:

```swift
var error: Unmanaged<CFError>?

CTFontManagerRegisterGraphicsFont(font, &error)
```

<br/>

Alright! Now we have a function that will register a single font. Above this function add a new one to handle the registration of all the JetBrains Mono fonts.

```swift
public static func registerFonts() {
    JetBrainsMono.allCases.forEach {
        registerFont(bundle: .module, fontName: $0.rawValue, fontExtension: "ttf")
    }
}
```

<br/>

The bundle we pass in here is dynamically generated by Swift because of the `.process("Fonts")` build command we added to the target. If you get red errors, you may want to check your file structure like I mentioned above. If you're still struggling, check out [this answer on Stack Overflow](https://stackoverflow.com/a/66630000/9333764).

<br/>

## Using the Fonts in an Application

Now that you've done all the hard work, we just need to consume the package. After adding JBMono as a dependency to your project, you'll need to open the App.swift file _wherever `@main` is located_. For this example project it's `CustomFontSwiftUIExampleApp.swift`. Up top, you'll import JBMono. Then you'll add an initializer to the struct and call our register fonts function like so:

```swift
import SwiftUI
import JBMono

@main
struct CustomFontSwiftUIExampleApp: App {
    
    init() {
        JBMono.registerFonts()
    }
    
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}
```

# 🔥☝️

That's it! Using the custom fonts is no different than what we did in the [previous article](../custom-dynamic-fonts-in-swift-ui)! You'll just need to remember to import the package first! I've uploaded the example code to [Github](https://github.com/JZDesign/CustomFontSwiftUIExample) for reference. 
