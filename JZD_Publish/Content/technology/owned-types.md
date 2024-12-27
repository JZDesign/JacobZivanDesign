---
date: 2024-12-26 21:16
description: Have you heard of Phantom Types or Shadow Types but struggle to understand them or use them? In this article, you'll learn to level up the Swift compiler with Owned Types (aka Phantom Types or Shadow Types).
tags: Technology, Tips, Workflow, Swift, Type System, Phantom Types, Shadow Types
---

# Owned Types

A few months ago I wrote [an article](https://jacobzivandesign.com/technology/people_make_mistakes/) about using the compiler to help you prevent human error by explicitly typing certain fields in model objects. It was the first article I wrote that was picked up—and shared—by [another company's blog](https://www.runway.team/flight-deck/13)… at least the first that I'm aware of anyway. In that article I talked about a way to ensure that you don't just pass strings around for identifiers so you don't accidentally jumble them up and end up passing the ID for a Customer when you really needed the ID for a Membership. And—because this article was shared far beyond my sphere of influence—someone tracked me down and emailed me about it.

They gave me something interesting to look into. Something they called a Phantom Type.

## What is a Phantom Type?

At first, I thought the person who emailed me was talking about something like an Associated Type—like how Apple's `Identifiable` protocol helpfully assigns a `MyType.ID` to our structs and classes. And I emailed the individual with my incorrect understanding. After spending a bit more time looking into what a Phantom Type (or Shadow Type) is, I better understand why I got that email in the first place.

The whole premise of the first blog was to prevent human error. To make it hard to pass some simple value where it shouldn't get used. My solution was to create a model and use the model instead of some simple type. And the reason I found it useful was that we could use it in our networking layer as if it were a simple type in our Codable models.

The Codable implementation _is_ a nice plus… and while Phantom Types are other types—much like what I wrote about before—they better solve the problem presented in the last article. They provide an automated and more readable solution that the compiler will enforce: Ownership.

> Shadow Types provide an automated and more readable solution that the compiler will enforce: Ownership.

Similar—but far better—to what I thought the email was getting at with the `Identifiable` protocol. We can assign that a type _belongs_ to or with another type, and the compiler will enforce it!

## Apple's [Identifiable](https://developer.apple.com/documentation/swift/identifiable) — It's not the same

What I initially envisioned with Phantom Types was that it behaved like Apple's `Identifiable` protocol. Where a type that conformed to it, would have an associated ID type, and we could reference that. And that _is_ partially true. But the associated type doesn't provide the same degree of enforcement that the Phantom or Shadow types do.

To explain, let's look at some code:

```swift
struct MyType: Identifiable {
    let id: Int
    let ownerName: String
}

func printOwner(for types: [MyType], by id: MyType.ID) {
    if let target = types.first(where: { $0.id = id }) {
        print(target.ownerName)
    }
}
```

Consider the code above. There is a type that is `Identifiable`, `MyType`. That type had an `id` field that is an `Int`. Since it's `Identifiable` we can express that by `MyType.ID`, which we did in the `printOwner` function. Now, I'll show you how we can invoke that function.

```swift
let example = MyType(id: 42, ownerName: "Arthur Dent")

printOwner(for types: [example], by: example.id)

// Even though the way that function declares that the ID must equal MyType.ID… we don't have
// to search by the ID that belongs to MyType. We can just use the same underlying type, which is an integer. Like so:

printOwner(for types: [example], by: 42)
```

In the above example, both function invocations compile fine. And that is precisely the issue we are solving for. We're aiming to reduce the prevalence of human error.

## Phantom Types

Enter Phantom Types! Imagine, in that function declaration—where it required `MyType.ID`—that the compiler actually enforced that the function was only ever called with an `ID` that belonged to `MyType`. We can do that with Phantom Types! However, I want to ensure that we use those types in such a way that there is an ownership hierarchy, and therefore I want to refer to them as `OwnedTypes` instead of Phantom Types or Shadow Types.

> We can do that with Phantom Types!

We're going to build one. It will be a long an arduous journey. Buckle up! First things first… We need to define a reusable type.

```swift
struct OwnedType<Owner, Value>: RawRepresentable {
    var rawValue: Value
}
```

Done. That's literally it.

I was joking about long and arduous btw…

😂🤣

It's referred to a Phantom or Shadow type because the type itself doesn't actually use—at least one of—the associated type(s) that are passed into it. In this example, the Phantom Type is technically the Owner, since it's not used. These objects that are used _containing_ Phantom Types are also referred to as Phantom Types… which is exactly why I'd like to call them "Owned Types." That naming overload is rather confusing.

IDK about you… but it doesn't click until I see it in action. Go ahead and modify `MyType` to use the `OwnedType` for the ID like so:

```swift
struct MyType: Identifiable {
    let id: OwnedType<Self, Int>
    let ownerName: String
}
```

That's really it… Now that function above would enforce that we actually use an integer type that was associated with the `MyType`struct. Not just any old `Int`

Now… it still has the same codable issue that I wrote about in the [other article](https://jacobzivandesign.com/technology/people_make_mistakes/), so I would recommend to make `OwnedType` a `DomainPrimitive` to handle that. 

You can find all of the sample code in this [Repo](https://github.com/JZDesign/DomainPrimitive)