---
date: 2021-01-03 05:10
description: A Tutorial for Handling Accessibility in SwiftUI using a ViewBuilder, PreferredFont, and ContentSizeCategory.isAccessibilityCategory
tags: Accessibility, iOS, SwiftUI, Technology, Tutorial, UI/UX
---

# Responsive View Components

I used to write my iOS views to be pixel perfect, until I discovered UIKit's [Preferred Font](https://developer.apple.com/documentation/uikit/uifont/1619030-preferredfont) method and how it worked. After that, I struggled to implement views that were useful at scale, or even beautiful, on smaller screens like that of the iPhone 8. Eventually I designed a UIKit component that accounted for accessible font sizes. In this article we'll remake that component in SwiftUI. 

<br/>
## The Problem


<img class="left-item" style="max-width: 300px; margin-right: 2rem;" alt="A debit card transaction represented in an HStack" src="../../images/hstack_default_size.png"/>

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

We have a layout that works perfectly in a SwiftUI `HStack`. This view contains one `Image` and two `Text` views. Looks great right? 

Well...

Let's look at it after bumping our preferred font size.

<br/>

<img class="right-item" style="max-width: 300px; margin-left: 2rem;" alt="A debit card transaction represented in an HStack with very large font" src="../../images/hstack_large_size.png"/>

<span class="clear-left"></span>

### Nope!

<br/>

That looks like garbage. We need to respond to the font size increase, and change the layout of this component.

Good news is, the SwiftUI team has given us easy access to the user's preferred font size.


<span class="clearfix"></span>   	

<br/>

## Responsive Stack View

For this tutorial, we'll focus on a simple view that responds to accessible font sizes. To do that we'll use the [`ContentSizeCategory`](https://developer.apple.com/documentation/swiftui/contentsizecategory) Environment variable in SwiftUI. 

On it, there is a computed property, `isAccessibilityCategory`, that returns what we're looking for. If the user has selected to use large fonts **and** has scaled their font up into the larger fonts category, `isAccessibilityCategory` returns `true`.

We can add use it like this:

```swift
public struct SomeView : View {
    @Environment(\.sizeCategory) public var size: ContentSizeCategory

    public var body: some View {
        if size.isAccessibilityCategory {
            Text("isAccessibilityCategory == true")
        } else {
            Text("isAccessibilityCategory == false")
        }
    }
}
```
<br/>
<br/>
<br/>

### That's great! But how do I pass in the content I want?

<br/>
<br/>

To make our own stack view we'll need to be able to pass in a bunch of subviews. We can do this with a `ViewBuilder`. 

_A [ViewBuilder](https://developer.apple.com/documentation/swiftui/viewbuilder) is a [property wrapper](https://docs.swift.org/swift-book/LanguageGuide/Properties.html#ID617) that allows us to pass one or more views into our stack view as a function._

Alright! Let's put the Responsive Stack View together using the `ContentSizeCategory` and a `ViewBuilder`!

```swift
struct RStack<Content: View> : View {
    @Environment(\.sizeCategory) var size: ContentSizeCategory
    
    let content: () -> Content
    
    init(@ViewBuilder content: @escaping () -> Content) {
        self.content = content
    }
    
    var body: some View {
        if size.isAccessibilityCategory {
            VStack { content() }
        } else {
            HStack { content() }
        }
    }
}
```

<br/>
<br/>

### Let's see what it looks like!

<br/>

<img class="left-item" style="max-width: 300px;" alt="A debit card transaction represented in an RStack" src="../../images/rstack_default.png"/>


<br/>
<br/>
<br/>
<br/>

Notice how the `RStack` has the same syntax of the `HStack` and `VStack`? That's the `ViewBuilder` doing it's magic.

<br/>

```swift
let debitCardImageName = "creditcard.fill" // #DebtIsDumb

struct ContentView: View {
    var body: some View {
        RStack {
            Image(systemName: .debitCardImageName)
                .foregroundColor(.red)
                .padding(.trailing)
            
            Text("Joe's Coffee Shop")
            Spacer()
            Text("$2.34")
        }.padding()
    }
}
```

<br/>

<img class="right-item" style="max-width: 300px; margin-left: 2rem;" alt="A debit card transaction represented in an RStack with a spacer and very large font" src="../../images/rstack_spacer.png"/>


<br/>


<span class="clear-left"></span>

<br/>
<br/>
<br/>

### Much Better!

<br/>

We're getting closer! Although, that spacer is a bit of a problem... 

Let's make another component to handle that little detail. After all, practice makes permanent.



For this component, we want to make sure we add a spacer for a horizontal layout, but not a vertical layout. We won't need to use a `ViewBuilder` because we are only going to be working with 2 `Text` views.

Let's do it!

<span class="clearfix"></span>

### Practice makes permanent
<br/>

```swift
struct RDualText: View {
    @Environment(\.sizeCategory) var size: ContentSizeCategory

    var firstText: Text
    var secondText: Text
    var spacer = Spacer()
    
    init(firstText: Text, secondText: Text) {
        self.firstText = firstText
        self.secondText = secondText
    }
    
    var body: some View {
        RStack {
            self.firstText
            if !size.isAccessibilityCategory {
                spacer
            }
            self.secondText
        }
    }
}
```

<br/>
<br/>

### Putting it all together
<br/>

Alright, let's go back to our content view, and use our new component.


<img class="left-item" style="max-width: 300px;" alt="A debit card transaction represented in an RStack" src="../../images/rstack_large.png"/>

<br/>
<br/>
<br/>
<br/>
<br/>

```swift
struct ContentView: View {
    var body: some View {
        RStack {
            Image(systemName: .debitCardImageName)
                .foregroundColor(.red)
            RDualText(
                firstText: Text("Joe's Coffee Shop"),
                secondText: Text("$2.34")
            )
        }.padding()
    }
}
```

<span class="clearfix"></span>   	

<br/>

## Accessible apps don't have to be ugly.

Good work! You've learned how to create a `ViewBuilder`, and respond to a user's preferred font size! Making a component that accounts for a user's accessibility settings was far more difficult in the world of UIKit. But we've only scratched the surface, there is a lot more to handling accessibility well than what we covered here. There are settings for color blindness, preferring bold fonts, reducing motions and more. And that is just the visual side of accessibility!

<br/>

### Homework
<br/>

If you'd like to learn more, I have a challenge for you!

Take the `RStack` component and modify it to take a threshold. If the selected font size is greater than the threshold then the `RStack` flips from horizontal to vertical. When you instantiate your `RStack`, it should look like this:


```swift
RStack(threshold: .accessibilityMedium) {
    Text("Top")
    Spacer()
    Text("Bottom")
}
```