---
date: 2021-10-28 6:13
description: SwiftUI comes with its own Dependency Injection framework. Learn what dependency injection is, and how to utilize the Setter Injection provided by swift.
tags: iOS, MacOS, SwiftUI, Technology, Tutorial, Dependency-Injection
---

# Dependency Injection

For a long time, I had no idea what dependency injection was or why it mattered. When I realized I already knew one flavor of it, [Constructor Injection](https://en.wikipedia.org/wiki/Dependency_injection#Constructor_injection), it suddenly became obvious to me. In this article, I hope to provide a clear explanation of Dependency Injection and how you can use it in Swift.

## So what is Dependency Injection?

Dependency injection is the concept of providing things to an object that it relies on, instead of letting the object create the things it needs, itself. Often this is done in a constructor. 

### No Injection

<br/>

To illustrate, here's a quick example of an object **_not_** using dependency injection:

```swift
struct SomeClient {
    private let someService = SomeService()

    func doSomeWork() {
        someService.doSomething()
    }
}
```

<br/>

Notice how `SomeClient` needs _(or is "dependent" on)_ `SomeService` to do its job? `SomeService` is a dependency of `SomeClient`. Dependency injection takes the responsibility of creating a `SomeService` out of `SomeClient`. Instead, a dependency is first created and then given to the client. 

### Constructor Injection

<br/>

It's super simple, you probably already know how to do it, even if you're not familiar with the terms.

This is what Constructor Injection looks like:


```swift
struct SomeClient {
    private let someService: SomeService

    // notice how the dependency is required in the constructor below?
    init(_ service: SomeService) {
        self.someService = service
    }

    func doSomeWork() {
        someService.doSomething()
    }
}
```

<br/>


It's a subtle difference, but it's profound. By removing the creation of the service from the client we achieve a couple of important things. First, it becomes easier to make the client more reusable. We could pass it different versions of `SomeService`, and the client could do different kinds of work! And because we can pass in different versions of the dependency, **testing that structure becomes far easier**.

> It's a subtle difference, but it's profound.

### Setter Injection

<br/>

If you know even a little about Object Oriented programming, you already know how to construct an object and pass in the dependencies. That is super intuitive and commonplace. Then there is [Setter Injection](https://en.wikipedia.org/wiki/Dependency_injection#Setter_injection) which you've probably done before too. Here's a quick example from my UIKit days:

```swift
// This example also demonstrates Interface Injection 
class SomeViewController: UIViewController, UITableViewDelegate {
    let tableView = UITableView()

    override func viewDidLoad() {
        super.viewDidLoad()
        self.tableView.delegate = self // Setting the dependency
    }
}
```

<br/>

The `UITableView` relies on a delegate to handle specific tasks and it exposes a setter for us to inject that dependency after the table view was initialized. Again, this was another common sense one for me. It was what dependency injection evolved into that was confusing to me at first. Let's cover that next.

## Auto-Wired Dependency Injection

Eventually, the people using Dependency Injection created a new pattern to inject dependencies. One that is similar to the injection patterns we've just discussed, only it happens automagically. The concept is that an application creates a manifest of dependencies inside of a dependency injection framework. Then an object in that applications says it needs one such dependency and the framework provides it. 

It would look something like this:

```swift
// pseudo code

let provider = DependencyProvider([
    SomeClient(),
    SomeService()
])

let controller = Controller(client: provider.resolveDependency())

// or

struct MyView {
    let service: SomeService = provider.resolveDependency()
}
```

<br/>


This auto wiring confused me at first. It's really not much different than what we talked about before, the only true difference is that the dependency provider knows which dependency to provide based on the interface required at the usage site. There are [third party frameworks](https://github.com/Liftric/DIKit) that do this generically for many languages. However, Apple recently released a fully native way to do it.

## Swift's Environment Variables

If you've done much with SwiftUI, you've probably seen an environment variable before. The one I use the most is probably the `colorScheme`:

```swift
struct SomeView: View {

    @Environment(\.colorScheme) var colorScheme : ColorScheme

    var body: some view {
        Text("")
            .foregroundColor(colorScheme == .dark ? .white : .black)
    }
}
```

<br/>

The line `@Environment(\.colorScheme) var colorScheme: ColorScheme` is one way to do the autowired dependency injection. Let's break it down.

On the left we use an annotation _(or [property wrapper](https://www.swiftbysundell.com/articles/property-wrappers-in-swift/))_ `@Environment` This particular property wrapper takes a [key path](https://www.swiftbysundell.com/articles/the-power-of-key-paths-in-swift/). This particular key path was `\.colorScheme`. That tells Swift's Environment framework that we're looking for an object with that name, please provide it. The next section `var colorScheme` is the name assignment, which could be any name at all. The last section `: ColorScheme` is the type assignment, which is actually erroneous. We could simply write: `@Environment(\.colorScheme) var colorScheme`.

Now to override the default and inject our own value, we can do that like so:

```swift
struct ContentView: View {
    
    var body: some View {
        SomeView()
            .environment(\.colorScheme, .dark) // injecting Dark to Some View
    }

}
```

<br/>


### Creating our own Environment Variable

We can create our own environment variables that we can place into Swift's Environment. To start, let's create a class to hold an access token.

```swift
class TokenStore: ObservableObject {
    var accessToken: String? = nil
}
```

<br/>


Then, to access it from the `@Environment` property wrapper, it needs to have an [Environment Key](https://developer.apple.com/documentation/swiftui/environmentkey) associated with it. 


```swift
struct TokenStoreKey: EnvironmentKey {
    static let defaultValue = TokenStore()
}
```

<br/>

This key is used to make the `key path` on the environment.  We can do that by extending Swift's `EnvironmentValues`:

```swift
extension EnvironmentValues {
    var tokenStore: TokenStore {
        get { self[TokenStoreKey.self] }
        set { self[TokenStoreKey.self] = newValue }
    }
}
```

<br/>

Now that we've done all that, we can use the token store like:

```swift
class SomeHttpClient {
    @Environment(\.tokenStore) var store

    func setToken(_ token: String) {
        store.accessToken = token
    }

    func getToken() -> String? {
        store.accessToken
    }
}
```


<br/>

# 🔥☝️

That's one way to use Swift's native Dependency Injection tooling. There are [other options](https://developer.apple.com/documentation/swiftui/environmentobject) as well. I hope this has been helpful!