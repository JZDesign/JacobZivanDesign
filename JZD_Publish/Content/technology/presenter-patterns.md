---
date: 2021-08-11 08:13
description: Clean up your views with the Presenter pattern in Swift UI. Some people call it "BetterProgramming" when the view contains a lot of `@State` variables and functions. It's really not. Let's take a look on how to write a presenter with Swift 5.5

tags: iOS, MacOS, Technology, Tutorial, SwiftUI, Design-Patterns
---

# The Presenter Pattern

Often, when I read articles on how to do something in SwiftUI, I see a lot of bad patterns touted as "Better Programming" which they're not. _My friends and I call them [Code smells](https://refactoring.guru/refactoring/smells) because... well, they stink._ One of the most prevalent code smells I encounter is a massive view file _(what refactoring.guru calls "bloaters")_. You know the ones I'm talking about. The views that have a lot of application logic in them, so much so, that it becomes hard to read or figure out where the view begins and the application logic ends. 

It may look something like this:

```swift
struct ContentView: View {
    @State var shouldPresentHomeScreen = false
    @State var isLoading = false
    @State var username = ""
    @State var password = ""

    var body: some View {
        VStack {
            if isLoading {
                ProgressView()
            } else {
                TextField("username", text: $username)
                TextField("password", text: $password)
                Spacer()
                Button("Login") {
                    isLoading = true
                    Task {
                        defer { DispatchQueue.main.async { self.isLoading = false } }
                        let result = try? await MyAuthenticationHandler.login(username, password)
                        if result?.isLoggedIn == true {
                            DispatchQueue.main.async {
                                self.shouldPresentHomeScreen = true
                            }
                        }
                    }
                }
            }
        }
        .padding()
        .sheet(isPresented: $presenter.shouldPresentHomeScreen) {
            Text("You're in!")
        }
    }
}
```

This is not an extreme example, but even this is a lot to look at. There are several concepts represented here. I've found that the cost of context switching between these concepts can make reading the View code challenging. We can abstract much of this into a Presenter to reduce the conceptual load and make this a lot easier to reason about.

<br/>

## What is a Presenter?

A Presenter is something that does the heavy lifting for a View, like network requests and data storage/manipulation. Afterwards, it _presents_ ready to process data to the view. In SwiftUI specifically, the view will [observe](https://developer.apple.com/documentation/swiftui/state-and-data-flow) the view state from the presenter. This pattern better adheres to the [Single Responsibility Principle](https://en.wikipedia.org/wiki/Single-responsibility_principle) and it's cleaner to test.

<br/>

## Creating a Presenter

Create a new class called `SignInPresenter` that conforms to `ObservableObject`. This presenter is going to own the `isLoading` variable and it's also going to own an `isFinished` variable which the view will use.

```swift
class SignInPresenter: ObservableObject {
    @Published var isLoading = false
    @Published var isFinished = false

    func login(_ username: String, _ password: String) {}
}
```

Great! Now we have the rough outline of the presenter, but, it needs to actually do the work. Let's cut the logic out of the button action from the `ContentView` and paste it here _changing the line inside of the second dispatch queue_.


```swift
func login(_ username: String, _ password: String) {
    isLoading = true
    Task {
        defer { DispatchQueue.main.async { self.isLoading = false } }
        let result = try? await MyAuthenticationHandler.login(username, password)
        if result?.isLoggedIn == true {
            DispatchQueue.main.async {
                self.isFinished = true
            }
        }
    }
}
```

Next, we can remove all of the noise from the view and observe this object like:

```swift
struct ContentView: View {
    @ObservedObject var presenter = SignInPresenter()
    @State var username = ""
    @State var password = ""

    var body: some View {
        VStack {
            if presenter.isLoading {
                ProgressView()
            } else {
                TextField("username", text: $username)
                TextField("password", text: $password)
                Spacer()
                Button("Login") {
                    presenter.login(username, password)
                }
            }
        }
        .padding()
        .sheet(isPresented: $presenter.isFinished) {
            Text("You're in!")
        }
    }
}
```

<br/>

## 🔥☝️

That is much easer to read through! Presenters are commonly used to handle user interactions that modify the view state, like performing complex tasks that manipulate the view data. This example was very simplistic. Where in your code bases could you use a presenter to simplify your view logic?