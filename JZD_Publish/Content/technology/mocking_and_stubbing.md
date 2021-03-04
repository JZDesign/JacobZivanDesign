---
date: 2021-03-03 10:13
description: What are Mocking and Stubbing and how do those concepts help write write cleaner, more effective unit tests in Swift. We'll explore Protocol Oriented Programming and hand-rolled mocks.
tags: MacOS, iOS, Swift, Mocking, Stubbing, Testing, Technology, Tutorial
---

# What's Mocking and Stubbing?
_And how do those concepts help write cleaner, more effective unit tests in Swift?_

<br/>

Early on, I encountered the concepts of **Stubbing** and **Mocking** for the first time. I reacted to the discovery much like I did to testing in general. _"What's the point?"_ I clearly didn't get it. In this article, we'll cover what mocks and stubs are, why they're used, and how they're used effectively.

<br/>

> What's the point?

<br/>

## Are you Mocking me?

**Mocking** and **Stubbing** are used primarily for **Unit Testing.** But what are Mocks, or Stubs? And what is a "Unit" test? Yea... There's a lot of assumed knowledge here. Let's start by laying out some definitions and context:

<br/>
<br/>
<br/>

### Unit Testing

<br/>

Unit testing is the act of writing tests where we run a small chunk of code in isolation, specifically, a single function. This "unit" should do exactly `A` under `X` conditions or exactly `B` under `Y` conditions etc., We control the variables and observe the outcomes at a very small scale.

Because unit tests target singular functions in the code base, we are able to verify how all the little pieces work in isolation. This gives us confidence that multiple units will integrate together without any surprises. And, what I like most about unit tests, when a test is written well, automated checks catch bugs _before_ they ship to production. 

_A more specific description can be found on [stack overflow](https://stackoverflow.com/a/1393/9333764), among other places._ [Pure Functions](https://en.wikipedia.org/wiki/Pure_function) are ideal for unit testing.

<br/>
<br/>

<br/>

### Mocks
<br/>

Mocks are essentially test doubles of an object that we place inside of our tests. They operate exactly as they are told to, and report back to you what happened in the test.

Mocks, when created, have the same interface as its target, but none of the functionality. Instead, the mock can be told to return stubbed data or to verify whether or not a mock's function was executed. In short, Mocking and Stubbing allow us to focus on the code we're writing. 

<br/>
<br/>
<br/>

### Stubs
<br/>

Stubs are hardcoded responses that we can force into our test code that allow us to easily test a function fully, without having to configure the rest of the environment to achieve all of the possible outcomes. 

_[Here is a good summary](https://stackoverflow.com/a/463305/9333764) of mocking and stubbing if you'd like more info._

<br/>
<br/>
<br/>

### But Why?
<br/>

There are 3 primary reasons I use mocking and stubbing. First, there is a significant reduction in the amount of boilerplate code required to configure each test. Second, we can prevent noisy or expensive tasks from occurring, like log outs or database reads and writes, by replacing those dependencies with mocks. Finally, we can automate tests that verify a code path was executed _this can not easily be done without the mock_.

<br/>
<br/>

> Mocking and Stubbing allow us to focus on the code we're writing. 

<br/>
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

They do. Even hand rolled mocks like these do. But I prefer to have my mocks generated for me in such a way that reduces needing to create one off mocks like this. And there is a package that will do just that. In my next article, you'll learn how to generate fully functional mocks using mockingbird😊

### [`-> Auto-Magically generate mocks using Mockingbird ->`](../mockingbird)

<br/>
<br/>
