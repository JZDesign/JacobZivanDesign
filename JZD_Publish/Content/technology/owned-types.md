---
date: 2024-12-26 21:16
description: Have you heard of Phantom Types or Shadow Types but struggle to understand them or use them? In this article, you'll learn to level up the Swift compiler with Owned Types (aka Phantom Types or Shadow Types).
tags: Technology, Tips, Workflow, Swift, Type System, Phantom Types
---

# Enhanced Compiler Authority with Owned Types

A few months ago I wrote [an article](https://jacobzivandesign.com/technology/people_make_mistakes/) about using the compiler to help you prevent human error by explicitly typing certain fields in model objects. It was the first article I wrote that was picked up—and shared—by [another company's blog](https://www.runway.team/flight-deck/13)… at least the first that I'm aware of anyway. In that article I talked about a way to ensure that you don't just pass strings around for identifiers so you don't accidentally jumble them up and end up passing the ID for a Customer when you really needed the ID for a Membership. And—because this article was shared far beyond my sphere of influence—someone tracked me down and emailed me about it.

They gave me something interesting to look into. Something they called a Phantom Type.

At first, I thought the person who emailed me was talking about something like an Associated Type—like how Apple's `Identifiable` protocol helpfully assigns a `MyType.ID` to our structs and classes. And I emailed the individual with my incorrect understanding. After spending a bit more time looking into what a Phantom Type is, I better understand why I got that email in the first place.


<br/>

## What is a Phantom Type?

Let's say you're at a restaurant with some friends, the kind of restaurant where they have numbered their menu for easy ordering. The server asks your friend what they want, he says "The steak fajitas, with extra tortillas, please." 

The server nods and looks at you. "Would you like anything?" with just a hint of an accent in his voice.

You're looking at your phone—not paying much attention, but you say "Nine. Thank you."

When the food comes out, you don't get anything. Confused, you ask the server where your food is and he tells you: "You said no thank you."

As calmly as you can muster the words, you reply "No… I said Nine, thank you."

Then the server laughs and apologizes. "I'm sorry. I'm from Germany originally. When you said Nine, I thought you meant nein—which means no. I'll go get your food in right away."

<br/>

The idea of a Phantom Type seeks to solve miscommunication problems—like the one above—but in our code. If we could have forced the server to only ever hear English and English numbers then you would have gotten your food on time. Now, we can't do that in the real world, but we can do that in code. 

We can create specific types and let the compiler enforce that we're speaking about the same things. Which was the whole premise of the other blog I mentioned earlier: to prevent human error by making it hard to pass some simple value where it shouldn't get used. My solution was to create a model and use the model instead of some simple type. And the reason I found it useful was that we could use it in our networking layer as if it were a simple type in our Codable models. 

The Codable implementation _is_ a nice plus… and while Phantom Types are other types—much like what I wrote about before—they better solve the problem presented in the last article. They provide an automated and more readable solution that the compiler will enforce: Ownership. But it does so in an unexpected way. The new type is passed in the owning type, but it is never used by the underlying type. It's only there for the compiler to do it's job better. And since it just lingers around your new type like a ghost haunting a mansion, it got the name of "Phantom Type."

> Phantom Types provide an automated and more readable solution that the compiler will enforce: Ownership.

Similar—but far better—to what I thought the email was getting at with the `Identifiable` protocol. We can assign that a type _belongs_ to or with another type, and the compiler will enforce it!

<br/>

## Apple's [Identifiable](https://developer.apple.com/documentation/swift/identifiable) — Why it's not the same

Before we get into exactly how the Phantom Types work, we should first talk about Associated Types and why they aren't the same. I initially envisioned Phantom Types were like Apple's `Identifiable` protocol. Where a type that conformed to it, would have an associated ID type, and we could reference that. And that _is_ partially true. But the associated type doesn't provide the same degree of enforcement that the Phantom types do.

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
// to search by the ID that belongs to MyType. We can just use the same underlying type, 
// which is an integer. Like so:

printOwner(for types: [example], by: 42)
printOwner(for types: [example], by: myArray.count)
```

In the above example, all of the function invocations compile fine. And that is precisely the issue we are solving for. We're aiming to reduce the prevalence of human error. That is what Phantom Types help us prevent.

<br/>

## Phantom Types

Enter Phantom Types! Imagine, in that function declaration—where it required `MyType.ID`—that the compiler actually enforced that the function was only ever called with an `ID` that belonged to `MyType`. We can do that with Phantom Types!

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

It's referred to a Phantom type because the type itself doesn't actually use—at least one of—the associated type(s) that are passed into it. In this example, the Phantom Type is technically the `Owner` generic, since it's not used. These objects that are used _containing_ Phantom Types are also referred to as Phantom Types… which is exactly why I'd like to call them "Owned Types." That naming overload is rather confusing.

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
