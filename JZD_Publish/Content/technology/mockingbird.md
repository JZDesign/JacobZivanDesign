---
date: 2021-03-04 10:13
description: Now that you understand Mocking and Stubbing, I'll show you how to avoid writing hand-rolled mocks using Mockingbird; an amazing framework that makes unit testing a breeze.
tags: MacOS, iOS, Swift, Mocking, Stubbing, Testing, Technology, Tutorial
---


# Auto-Magically generate mocks using Mockingbird
<br/>

I personally use the [Mockingbird](https://github.com/birdrides/mockingbird) framework to generate my mocks for me. I don't like having to mock an entire interface for every code path I want to test. [Mockingbird](https://github.com/birdrides/mockingbird) affords me the convenience and versatility I've been looking for in the Swift world. It does have its limitations, but it's far better than doing all of that work by hand.

_If you're not sure what mocking or stubbing is, check out [this article.](../mocking_and_stubbing)_

<br/>
<br/>

### Installing Mockingbird
<br/>

To get started, follow the [instructions](https://github.com/birdrides/mockingbird) to install and use Mockingbird in your project. They support CocoaPods, Carthage, and Swift Package Manager (SPM). Please follow the instructions to the letter. This isn't a _"normal"_ package. It is generating source code for your test suite on build. So you need to pay attention to the details.

_I've done both Carthage and SPM in the past. I prefer the SPM route._

<br/>
<br/>

### Using Mockingbird
<br/>

After you've installed Mockingbird in your project's test target, you're ready to rock! 🎸🎸 Before we begin, there are several functions you should get to know in order to effectively use Mockingbird. There is a lot that Mockingbird is [capable of](https://github.com/birdrides/mockingbird#usage), but for this tutorial, we'll focus on the following:
<br/>
<br/>

#### Creating a mock
<br/>

Mockingbird has an awesome helper function, `mock()`, that handles most of this for us. It's used rather simply:

```swift
let myMock = mock(MyClass.self)
```

We want to assign the mock to a variable, in most cases, so that we can verify if a function it contains was, or will be, called.

<br/>
<br/>


#### Stubbing the mock
<br/>


Stubbing is handled with Mockinbird's `given` function. `given` will take a mock and one of its functions or variables and allow you to define the result of its invocation. This is handled with the `~>` operator like so:

```swift 
given(myMock.someFunction()) ~> "You da man!"
// or to throw 🤯
given(myMock.someFunction()) ~> { throw SomeError() }
```
<br/>

<br/>
<br/>


#### Verifying the Mock
<br/>

One of the most useful things about mocking, is verifying that a code path was executed. Mockingbird has a `verify` method that allows us to check if a function was called or not, or more specifically, exactly how many times it was called. It's pretty straight forward:

```swift
verify(mock.someFunc()).wasCalled()
// Or if the function should get triggered multiple times
verify(mock.someFunc()).wasCalled(exactly(10))
```

<br/>
<br/>

#### Mocking Parameters and Return Values
<br/>

Another incredibly useful feature of Mockingbird is the `any()` function. This little gizmo will inspect the type of the object it is supposed to fill, and create a mock of that type on the fly. It's incredibly handy if we need to test what happens if a dependency returns `nil` or not but we don't care about a specific value.

I use this a lot, especially for the harder to define values like the `Data` type: 

```swift
given(store.getDataForUser(user: any())) ~> any() // Inline stubbing!!
```
<br/>
<br/>


## Doing it, for real....

<br/>

Let's recreate [the example](../mocking_and_stubbing) from my last article, but for the tests we'll do things a little differently. Below is a controller that has a logger and a data store. There is a function that reads from the store and logs the event.

```swift
protocol Loggable {
    func log(_ message: String)
}

protocol DataStore {
    func getDataFor(_ user: User) -> Data?
}

class Controller {
    let logger: Loggable
    let store: DataStore
    let user: User
    var data: Data? = nil

    init(_ logger: Loggable, _ store: DataStore, _ user: User) {
        self.logger = logger
        self.store = store
        self.user = user
    }

    func loadDataForUser() {
        data = store.getDataFor(user)
        logger.log("data retrieved")
    }
}
```
<br/>

What we'll do instead of hand writing the mocks is use the generated mocks provided to us by Mockingbird. The setup will look like this:

<br/>

```swift
class ControllerTests: XCTestCase {
    func testLoadDataForUser() {
        let logger = mock(Logger.self)
        let store = mock(DataStore.self)
        let user = User(named: "Test")
        let controller = Controller(logger, store, user)
    }
}
```

<br/>

Then we can **Stub** the **Mock** `DataStore` like:

<br/>

```swift
given(store.getDataForUser(user: user)) ~> any()
```

<br/>

And finally we can invoke the controller function and run our assertions:


<br/>

```swift
controller.loadDataForUser()

verify(logger.log(any())).wasCalled()
XCTAssertNotNil(controller.data)
```
<br/>
<br/>

Instead of needing to write a mock for each use case we want to test, we can instead generate them on the fly, and stub their responses only when necessary. This reduces so much overhead when it comes to writing tests that it's tough to describe. I can't tell you how many lines of aggravating configuration code this tool has saved me this year alone.


