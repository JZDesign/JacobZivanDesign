---
date: 2021-03-01 10:13
description: What are Mocking and Stubbing and how do those concepts help write write cleaner, more effective unit tests in Swift. We'll explore Protocol Oriented Programming and hand-rolled mocks, and Mockingbird, an amazing framework that makes testing a breeze.
tags: iOS, Swift, Mocking, Stubbing, Testing, Technology, Tutorial
---

# What's Mocking and Stubbing?
_And how do those concepts help write cleaner, more effective unit tests?_

<br/>

<!-- Writing tests is one of those things in software engineering that many of us don't pick up until we've been at it for several years. We get started begrudgingly, then we accept testing and write tests dutifully, eventually we come to love them and write them enthusiastically. -->

Early on, I encountered the concepts of **Stubbing** and **Mocking** for the first time. I reacted to the discovery much like I did to testing in general. _"What's the point?"_ I clearly didn't get it. In this article, we'll cover what mocks and stubs are, why they're used, and how they're used effectively.

<br/>

> What's the point?

<br/>

## Are you Mocking me?

**Mocking** and **Stubbing** are used primarily for **Unit Testing.** But what are Mocks, or Stubs? And what is a "Unit" test? Yea... There's a lot of assumed knowledge here. Let's start by laying out some definitions and context:

<br/>

### Unit Testing

Unit testing is the act of writing tests where we run a small chunk of code in isolation, specifically, a single function. This "unit" should do exactly `A` under `X` conditions or exactly `B` under `Y` conditions etc., We control the variables and observe the outcomes at a very small scale.

Because unit tests target singular functions in the code base, we are able to verify how all the little pieces work in isolation. This gives us confidence that multiple units will integrate together without any surprises. And, what I like most about unit tests, when a test is written well, automated checks catch bugs _before_ they ship to production. 

_A more specific description can be found on [stack overflow](https://stackoverflow.com/a/1393/9333764), among other places._ [Pure Functions](https://en.wikipedia.org/wiki/Pure_function) are ideal for unit testing.


### Mocks

Mocks are test doubles of an object that we place inside of our tests. They operate exactly as they are told to, and report back to you what happened in the test.

Mocks, when created, have the same interface as its target, but none of the functionality. Instead, the mock can be told to return stubbed data or to verify whether or not a mock's function was executed. In short, Mocking and Stubbing allow us to focus on the code we're writing. 


### Stubs

Stubs are hardcoded responses that we can force into our test code that allow us to easily test a function fully, without having to configure the rest of the environment to achieve all of the possible outcomes. 

_[Here is a good summary](https://stackoverflow.com/a/463305/9333764) of mocking and stubbing if you'd like more info._

<br/>

### But why?

There are 3 primary reasons I use mocking and stubbing. First, there is a significant reduction in the amount of boilerplate code required to configure each test. Second, we can prevent noisy or expensive tasks from occurring, like log outs or database reads and writes, by replacing those dependencies with mocks. Finally, we can automate tests that verify a code path was executed _this can not easily be done without the mock_.

<br/>
<br/>

> Mocking and Stubbing allow us to focus on the code we're writing. 

<br/>

## TLDR - What the mock?

<br/>


## Writing Mocks and Stubs in Swift

Swift is an awesome language. There's a lot to love about it, but, its implementation of [reflection](https://en.wikipedia.org/wiki/Reflective_programming) is somewhat limited. Because of that, there used to be no good way to generate a mock and so, many developers have been manually creating them. Fortunately, Swift if is a [Protocol Oriented Programming](https://bit.ly/3uJjpc8) Language, and we can account for this slight shortcoming.

<br/>
<br/>

### Hand Rolled Mocks
<br/>

Much of the Swift community manually creates the mocks they need as they need them. To demonstrate how this is done, we'll make a simple example of a controller, a data store, and a logger using [Protocols](https://www.swiftbysundell.com/basics/protocols/). _Note the following example does not actually create a logger or store, only their interface._

This is what the implementation might look like:

<br/>
<br/>

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
<br/>

The function `loadDataForUser` should read from a data store, log that it did so, and update the controller's `data` value. To test this code without actually logging an event or reading from our databases, we will need a mocked version of a logger and a data store. That might look something like this:

<br/>
<br/>

```swift
struct MockLogger: Loggable {
    var wasCalled = false

    func log(_ message: String) {
        wasCalled = true
    }
}

struct MockStore: DataStore {
    func getDataFor(_ user: User) -> Data? {
        "".data(using: .utf8)
    }
}
```
<br/>
<br/>

These mocks will allow us to verify that `Controller.loadDataForUser` modifies the data variable, **and** that the logger gets called _(which is near impossible to do without a mock)_. We do this like so:

<br/>
<br/>

```swift
class ControllerTests: XCTestCase {
    func testLoadDataForUser() {
        // Given
        let logger = MockLogger()
        let controller = Controller(logger, MockStore(), User(named: "Test"))

        XCTAssertFalse(logger.wasCalled)
        XCTAssertNil(controller.data)
        
        // When
        controller.loadDataForUser()
        
        // Then
        XCTAssertTrue(logger.wasCalled)
        XCTAssertNotNil(controller.data)
    }
}
```
<br/>
<br/>

In that example, we created the two mocked interfaces we needed to create and, effectively tested the `Controller`. Because of the mocks, we were able to verify the functionality of the Controller without testing the functionality of the `DataStore` or the `Logger`. The actual implementations of those will get tested in isolation.

Now, you may have noticed that there was a bit of configuration code required to run those tests. And I told you that mocking _reduces_ the amount of test configuration we need to write.

They do. Even hand rolled mocks like these do. But I prefer to have my mocks generated for me in such a way that reduces needing to create one off mocks like this. And there is a package that will do just that. 😊

<br/>
<br/>

## Auto-Magically generate mocks using [Mockingbird](https://github.com/birdrides/mockingbird)
<br/>

I personally use the [Mockingbird](https://github.com/birdrides/mockingbird) framework to generate my mocks for me. I don't like having to mock an entire interface for every code path I want to test. [Mockingbird](https://github.com/birdrides/mockingbird) affords me the convenience and versatility I've been looking for in the Swift world. It does have its limitations, but it's far better than doing all of that work by hand.

<br/>
<br/>

### Installing Mockingbird
<br/>

To get started, follow the [instructions](https://github.com/birdrides/mockingbird) to install and use Mockingbird in your project. They support CocoaPods, Carthage, and SPM. Please follow the instructions to the letter. This isn't a _"normal"_ package. It is generating source code for your test suite on build. So you need to pay attention to the details.

<br/>
<br/>

### Using Mockingbird
<br/>

After you've installed Mockingbird in your project and added the run script phases in your test target, you're ready to rock! 🎸🎸 

Before we begin, there are several functions you should get to know in order to effectively use Mockingbird. You'll need to know how to create a mock, stub them, and verify the results from them.

<br/>
<br/>

#### Create the mock
<br/>

Mockingbird has an awesome helper function, `mock`, that handles most of this for us. It's used rather simply:

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

#### Doing it, for real....

<br/>

Let's recreate that test using Mockingbird instead of hand rolled mocks. To start, that means delete `MockLogger`, and `MockStore`.

You heard me. Delete them.... Go ahead.

What we'll do instead is use the generated mocks provided to us by Mockingbird. Inside of the test function we wrote earlier, `testLoadDataForUser`, delete all of the code and add the following.

<br/>

```swift
let logger = mock(Logger.self)
let store = mock(DataStore.self)
let user = User(named: "Test")
let controller = Controller(logger, store, user)
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


