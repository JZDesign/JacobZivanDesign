---
date: 2021-08-11 08:13
description: Clean up your views with the Presenter pattern in Swift UI. Some people call it "BetterProgramming" when the view contains a lot of `@State` variables and functions. It's really not. Let's take a look on how to write a presenter with Swift 5.5

tags: iOS, MacOS, Technology, Tutorial, SwiftUI, Design-Patterns
---

# The Presenter Pattern

Often, when I read articles on how to do something in SwiftUI, I see a lot of bad patterns. _My friends and I call them "Code smells" because... well, they stink._ One of the most prevalent code smells I encounter are massive view files. You know the ones I'm talking about. The views that have a lot of logic in them. So much so that it becomes hard to read or figure out where the view begins and the application logic ends. 

Here is a light example:

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
                Button("Login", action: login)
            }
        }
        .padding()
        .fullScreenCover(isPresented: $shouldPresentHomeScreen, onDismiss: nil, content: {
            Text("You're in!")
        })
    }

    func login() {
        isLoading = true
        Task {
            defer { self.isLoading = false }
            let result = try? await MyAuthenticationHandler.login(username, password)
            if result?.isLoggedIn == true {
                DispatchQueue.main.async {
                    self.shouldPresentHomeScreen = true
                }
            }
        }
    }
}
```

This is not an extreme example, but even this is a lot to look at and it makes reading the View code more challenging. We can abstract much of this into a Presenter to make this a lot easier to reason about.

<br/>

## What is a Presenter?

A Presenter is an object that the View can observe and read the view state from, additionally the presenter can own more of the application logic so that the view can be nice and lean. This better adheres to the Single Responsibility Principle and it's cleaner to test.

<br/>

## Creating a Presenter

Create a new class called SignInPresenter that conforms to `ObservableObject` like so:

```swift
class SignInPresenter: ObservableObject {

}
```

Then lets add the 2 variables from `ContentView` that are responsible for displaying the correct view and a function called login.

```swift
class SignInPresenter: ObservableObject {
    @Published var isLoading = false
    @Published var shouldPresentHomeScreen = false

    func login(_ username: String, _ password: String) {
    }
}
```

Great! Now we have the rough outline of the presenter. Now it needs to actually do the work. Let's cut the logic out of the login function in `ContentView` and paste it here.


```swift
class SignInPresenter: ObservableObject {
    @Published var isLoading = false
    @Published var shouldPresentHomeScreen = false

    func login(_ username: String, _ password: String) {
        isLoading = true
        Task {
            defer { self.isLoading = false }
            let result = try? await MyAuthenticationHandler.login(username, password)
            if result?.isLoggedIn == true {
                DispatchQueue.main.async {
                    self.shouldPresentHomeScreen = true
                }
            }
        }
    }
}
```

Then we can remove all of the noise from the view and observe this object like:

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
        .fullScreenCover(isPresented: $presenter.shouldPresentHomeScreen, onDismiss: nil, content: {
            Text("You're in!")
        })
    }
}
```

<br/>

## 🔥☝️

That is much easer to read through! What other things can you do to clean up your views? 