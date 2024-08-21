---
date: 2024-08-21 09:10
description: One thing I've learned is to **just freaking** let the compiler prevent me from making mistakes. Sometimes that's hard to do, then I learned about something called a Domain Primitive and I decided to give it a try in Swift.
tags: Technology, Tips, Workflow, Swift
---
# Humans write code, and humans make mistakes.

In my journey writing software, I've come to love working in strongly typed, compiled languages. If I'm being totally honest, at first… I didn't care for them. They felt restrictive. Why couldn't I just send whatever I wanted and just wrangle it on the other side? In my youthful hubris, I often thought things like: "I'm not dumb, I won't send an object when I need an integer." But, it didn't take long for me to forget the details of what I had worked on, and I wrote the very code I swore I was incapable of writing. And of course, it took longer than I would have liked to figure out what the issue was and get it fixed. Now, I wish I could tell you that I only ever did that once… but I would be lying.

Events like those, whether it was code I wrote or an inherited bug I had to chase down, are what really drove me into the arms of good compiled languages like Swift or Kotlin. One of their primary benefits is the compiler preventing me from making certain mistakes, and therefore, preventing me from shipping a lot more bugs. However, there is one way this is lacking in our languages today, and that is how often we need to pass around a simple value—think of very commonly used types like: `String`, `Int`, `Bool`—and since they're so common, the compiler doesn't ensure I typed what I meant to. To describe what I mean, consider the following examples:

If I have a function or a class that needs an Identifier that is represented by a common type like `String` there is nothing preventing me from providing it the wrong identifier. For example, say we have a Customer object that has an Id. On that object are `membershipId` and `activeOfferId` fields that are used to fetch more specific data later. All are of type `String`. Like this:

```swift
struct Customer {
    let id: String
    let membershipId: String
    let activeOfferId: String
}
```
That seems fine right now, but the problems arise when we need to call certain functions with this data. Say we have a function that gets some useful object by `membershipId` but the developer didn't make that very clear. Like:

```swift
func getUsefulThingForCustomer(by id: String) throws -> SomeUsefulThing
```

That reads as if I should send it the `customer.id`, not the `membershipId` so at some point we can accidentally swap out the argument and introduce a bug because it reads like it should be a different ID. This happens all the more with functions or initializers that use multiple unnamed arguments of the same type. If the order changes for some reason, nothing enforces that we update the call-sites to match the new order. For example:

```swift
struct Customer {
    let id: String
    let membershipId: String
    let activeOfferId: String

    // First version of the function
    static func new(_ id: String, _ membershipId: String, _ activeOfferId: String) -> Customer
}
// It's used in a file like this:
let customer = Customer.new("811E06EC-73C8-45C2-A4CE-AA99E11B05C7", "membership-1", "activeOffer-1")

// Along the lines, someone decides that the code formatter will enforce all functions should have alphabetically ordered arguments
// Then the `new` function is changed to this:

static func new(_ activeOfferId: String, _ id: String, _ membershipId: String) -> Customer

// but the call site does't get updated… and then you have an interesting bug to track down.
```

You can solve this by creating a custom type that represents the value, but is totally unique. For example:

```swift
struct CustomerId: RawRepresentable {
    let rawValue: UUID
}

struct MembershipId: RawRepresentable {
    let rawValue: String
}

struct ActiveOfferId: RawRepresentable {
    let rawValue: String
}

struct Customer {
    let id: CustomerId
    let membershipId: MembershipId
    let activeOfferId: ActiveOfferId

    // First version of the function
    static func new(_ id: CustomerId, _ membershipId: MembershipId, _ activeOfferId: ActiveOfferId) -> Customer
}
```

Now, if the formatter went and tried to make the alphabetical ordering change, the compiler would throw an error because the arguments aren't the right types. This is a nice improvement. But it's not all sunshine and rainbows… That `RawRepresentable` protocol requires you create an object that contains some value, and if that value is more complex than a simple primitive value like `Int`, `Bool`, or `String`… things get interesting when you're serializing the object to and from JSON.

Before, if you wanted to decode JSON into the `Customer` type, you would just need to slap the `Decodable` protocol on the struct and you can ingest JSON that looks like this:

```JSON
{
    "id": "811E06EC-73C8-45C2-A4CE-AA99E11B05C7",
    "membershipId": "mem-1",
    "activeOfferId": "offer-1"
}
```

However, with any `RawRepresentable` model that doesn't contain simple values—`UUID` is one such type—the JSON object would need to look like this for you to decode it into the `Customer` struct:


```JSON
{
    "id": {
        "rawValue" : "811E06EC-73C8-45C2-A4CE-AA99E11B05C7"
    },
    "membershipId": "mem-1",
    "activeOfferId": "offer-1"
}
```

So that's not _that_ useful after all. But, in both Swift and Kotlin (and I'm sure many other languages) this can be addressed too. For now, since Swift is my favorite language, I'll cover how to handle that one below.

So, lets create a protocol to represent this type:

```swift
protocol DomainPrimitive: Codable, RawRepresentable {
    var rawValue: RawValue { get }
}
```

That alone won't solve your woes, you'll still need to add the functions and initializers to handle serialization and skip the nested object when the `RawValue` is `UUID`. And the good news is, we can do that in an extension with Swift and make them default implementations on the Protocol. Like so:

```swift
extension DomainPrimitive where RawValue == UUID {
    func encode(to encoder: any Encoder) throws {
        var container = encoder.singleValueContainer()
        try container.encode(rawValue)
    }

    init(from decoder: any Decoder) throws {
        let rawValue = try decoder.singleValueContainer().decode(UUID.self)
        self.init(rawValue: rawValue)! 
        // Usually, you wouldn't want to force a failing initializer to succeed like this, 
        // but in this case we're okay because we know we have a valid UUID if the try succeeds
    }
}
```

After that, you can change the ID types to conform to this new Protocol and you get both the flat JSON structure, and compiler safety on your IDs and other simple values.

```swift
struct CustomerId: DomainPrimitive {
    let rawValue: UUID
}

struct MembershipId: DomainPrimitive {
    let rawValue: String
}

struct ActiveOfferId: DomainPrimitive {
    let rawValue: String
}
```

Sample code and tests can be found at: https://github.com/JZDesign/DomainPrimitive/

