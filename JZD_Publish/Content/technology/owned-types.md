---
date: 2024-12-26 21:16
description: Have you heard of Phantom Types or Shadow Types but struggle to understand them or use them? In this article, you'll learn to level up the Swift compiler with Owned Types (aka Phantom Types or Shadow Types).
tags: Technology, Tips, Workflow, Swift, Type System, Phantom Types
---

# Enhanced Compiler Authority with Owned Types

A few months ago I wrote [an article](https://jacobzivandesign.com/technology/people_make_mistakes/) about using the compiler to help you prevent human error. In that article I talked about a way to ensure that you don't just pass strings around for identifiers and inadvertently jumble ID's up and end up passing the ID for a Customer when you really needed the ID for a Membership. We did this by explicitly typing certain fields in model objects.

That article was shared by [Runway](https://www.runway.team/flight-deck/13), and [iOS Code Review](https://ioscodereview.com/issues/70/). Someone read it and emailed me about it. They gave me something interesting to look into. Something they called a Phantom Type.

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

We  can create specific types and let the compiler enforce that we're speaking about the same things. The perk is that we can prevent human error by making it hard to pass some simple value where it shouldn't get used. My solution in that previous article was to create a unique model and use it instead of some simple type for each parent type that needed a unique identifier. And the reason I found it useful was that we could use it in our networking layer as if it were a simple type in our Codable models.

The Codable implementation _is_ a nice plus… and while Phantom Types are other types—much like what I described before—they better solve the problem presented in the last article because it is less repetitive but just as type safe. They provide an automated and more readable solution that the compiler will enforce: Ownership. But it does so in an unexpected way. The new type must be given the owning type, but the owner is never used by the underlying type. It's only there for the compiler to do it's job better. And since it just lingers around your new type like a ghost haunting a mansion, it got the name of "Phantom Type."

> Phantom Types provide an automated and more readable solution that the compiler will enforce: Ownership.

Similar—but far better—to what I thought the email was getting at with the `Identifiable` protocol. We can assign that a type _belongs_ to or with another type, and the compiler will enforce it!

<br/>

## Apple's [Identifiable](https://developer.apple.com/documentation/swift/identifiable) — Why it's not the same

Before we get into exactly how the Phantom Types work, we should first talk about Associated Types and why they aren't the same. I initially envisioned Phantom Types were like Apple's `Identifiable` protocol. Where a type that conformed to it, would have an associated ID type, and we could reference that. And that _is_ partially true. But the associated type doesn't provide the same degree of enforcement that the Phantom types do.

To explain, let's look at some code:

```swift
struct GuideToTheGalaxy: Identifiable {
    let id: Int
    let ownerName: String
}

func printOwner(for guides: [GuideToTheGalaxy], by id: GuideToTheGalaxy.ID) {
    if let target = types.first(where: { $0.id == id }) {
        print(target.ownerName)
    }
}
```

Consider the code above. There is a type that is `Identifiable`, `GuideToTheGalaxy`. That type had an `id` field that is an `Int`. Since it's `Identifiable` we can reference the ID type of that model—we express that by `GuideToTheGalaxy.ID`—which we did in the `printOwner` function. Now, I'll show you how we can invoke that function.

```swift
let hitchHikersGuide = GuideToTheGalaxy(id: 42, ownerName: "Ford Prefect")

printOwner(for guides: [hitchHikersGuide], by: hitchHikersGuide.id)

// Even though that function declares that the ID must be GuideToTheGalaxy.ID
// we don't **have** to search by the ID that belongs to GuideToTheGalaxy. 
// We can just use the same underlying type, which is an integer. Like so:

printOwner(for types: [hitchHikersGuide], by: 42)
printOwner(for types: [hitchHikersGuide], by: arrayOfInfiniteImprobabilities.count)
```

In the above example, all of the `printOwner` function invocations compile fine. We used a random number, and the count of an array… neither of which should identify the owner of the book. And that is precisely the issue we are solving for. We're aiming to reduce the prevalence of human error. That is what Phantom Types help us prevent.

<br/>

## Phantom Types

Enter Phantom Types! Imagine, in that function declaration—where it asked for `GuideToTheGalaxy.ID`—that the compiler actually enforced that the function was only ever called with an `ID` that belonged to `GuideToTheGalaxy`.

> We can do that with Phantom Types!

We're going to build one. It will be a long an arduous journey. First things first… We need to define a reusable type that will hold a Phantom. Buckle up!

```swift
struct PhantomType<Phantom, Value> {
    var value: Value
}
```

Done. That's literally it.

I was joking about long and arduous btw…

😂🤣

It's referred to a Phantom type because the type itself doesn't actually use—at least one of—the generic type(s) that are passed into it. In this example, the Phantom Type is technically the `Phantom` generic because it's not used by the `PhatnomType` struct. These objects that are used _containing_ Phantoms are also referred to as Phantom Types… and that overload confused me. Which is exactly why I'd like to call them "Owned Types." So let's go ahead and modify that new code to have a better naming convention.

```swift
// Hashable conformance allows this type to be used by the `Identifiable` protocol
struct OwnedType<Owner, Value: Hashable>: Hashable {
    var value: Value
}
```

IDK about you… but it doesn't click until I see it in action. Go ahead and modify `GuideToTheGalaxy` to use the `OwnedType` for the ID like so:

```swift
struct GuideToTheGalaxy: Identifiable {
    let id: OwnedType<Self, Int>
    let ownerName: String
}
```

That's really it… Now that function above would enforce that we actually use an integer type that was associated with the `GuideToTheGalaxy` struct. Not just any old `Int`. Let's see how that would work.

```swift
// This function is identical to the one above, 
// I've put it here simply to prevent you from scrolling up
func printOwner(for guides: [GuideToTheGalaxy], by id: GuideToTheGalaxy.ID) {
    if let target = types.first(where: { $0.id == id }) {
        print(target.ownerName)
    }
}

let hitchHikersGuide = GuideToTheGalaxy(id: .init(value: 42), ownerName: "Ford Prefect")

printOwner(for guides: [hitchHikersGuide], by: hitchHikersGuide.id)
// If you try to pass in an integer or the count of an array Xcode will scream at you in bands of glorious red.
```

Now it's important to recognize that the `OwnedType` can represent anything that belongs to _(or is associated with)_ another thing—not just an ID. Like the count of reactions vs the count of comments on a social media post, or a user's access level… you could have the compiler enforce the correct usage in this way.

So, if you read [other article](https://jacobzivandesign.com/technology/people_make_mistakes/), you may be asking how this is different from the `DomainPrimitive` that I talked about there. It's slight, but that slight change adds capability to the compiler and removes duplication from our codebase. It's all about the Phantom or Owner. Let's look at the example from the article I linked above. We ended with 3 different ID types that would get used by a struct and a function with un-named parameters:

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

struct Customer {
    let id: CustomerId
    let membershipId: MembershipId
    let activeOfferId: ActiveOfferId

    static func new(
        _ id: CustomerId, 
        _ membershipId: MembershipId, 
        _ activeOfferId: ActiveOfferId
    ) -> Customer
}
```

The example from before was this. We have a function that an engineer wants to alphabetize, but all of the IDs in the function are just UUID Strings in the database. If we reorder them when the ID's are just simple types, we don't have to update the call sites and then we have bugs. So we created unique types for each of those values so that the compiler would know how to help us. But we could do this with only one ID struct instead of three ID structs. Like so:

```swift
struct ID<Entity, Value: Hashable>: Hashable {
    let value: Value
}

struct Customer: Identifiable {
    let id: ID<Self, UUID>
    let membershipId: Membership.ID
    let activeOfferId: ActiveOffer.ID

    static func new(
        _ id: Customer.ID, 
        _ membershipId: Membership.ID, 
        _ activeOfferId: ActiveOffer.ID
    ) -> Customer
}
// for the sake of brevity, I'm going to not show the Membership or ActiveOffer structs.
// Just assume that they also use the same ID struct but pass in their own Self and 
// the value's type
```

Here we created an owned type that has more useful naming for its use case. It's essentially identical to the `OwnedType` struct above. Now… it still has the same codable issue that I wrote about in the [other article](https://jacobzivandesign.com/technology/people_make_mistakes/), so I would recommend to make `OwnedType` a `DomainPrimitive` to handle that. 

You can find all of the sample code in this [Repo](https://github.com/JZDesign/DomainPrimitive)
