---
date: 2021-11-20 13:13
description: Learn how to use Codable enum's in Swift to handle Polymorphic Serialization.
tags: MacOS, iOS, Swift, Technology, Tutorial
---
# Polymorphic Serialization in Swift

Before I show you how to use enumerations to handle polymorphic serialization in Swift, I'm going to explain a few things. After defining some terms and giving examples we'll get into it.


## What is Serialization?

Serialization is one of the most common things I have to handle in my role as a software engineer. It is simple usually. The serialization I'm referring to is the mapping of JSON into your model object in whatever language you're using. 

Let's take this JSON for example:

```json
{
    "item_name" : "potion"
}
```

When we make the request to the server and get that data back from the web, we'd generally like to use a struct that represents an Item like:

```swift
struct Item {
    let name: String
}
```

Serialization does just that. To do it in swift, we use a protocol named [`Codable`](https://developer.apple.com/documentation/swift/codable).

<br/>

## Codable

This protocol handles the heavy lifting for us. Generally all we need to do is make the structure conform to the protocol. Like so:

```swift
struct Item: Codable {
    let name: String
}
```
Just by adding `: Codable` to the structure declaration, swift will be able to [encode](https://developer.apple.com/documentation/swift/encodable/2893603-encode) or [decode](https://developer.apple.com/documentation/swift/decodable/2894081-init) _(AKA serialize)_ the model. However, the JSON this particular model would expect to decode _(or would produce by encoding)_ looks like:

```json
{
    "name": "potion"
}
```

Did you notice the difference, `"name"` instead of `"item_name"`? Swift automatically takes the name of the variable and encodes that as the JSON key. I'd like to use `Item.name` as the syntax in my Swift project instead of `Item.item_name`. To show you how to do that let's take a look at Coding Keys.

<br/>
## Coding Keys

Coding keys are an enumeration we can use to override Swift's default serialization of the keys. Let's go back to item and add a couple of things:

```swift
struct Item: Codable {
    let name: String
    let weight: Decimal
    let description: String

    enum CodingKeys: String, CodingKey {
        case name = "item_name"
        case weight, description
    }
}
```

In this example, we overrode the `name` to have a different coding key, but we left the other 2 alone. This means that we could receive JSON that looks like this:

```json
{
    "item_name": "Potion",
    "weight": 1.22,
    "description": "A generic health potion."
}
```

Great! Now you know how to serialize JSON into a specific type. It's a great start. However, there are some instances where you'll get a dynamic set of data for a given key in the JSON. And this won't help you there. Instead, we would need to create a way for our application to recognize different kinds of items and have a dynamic model to represent the JSON.

<br/>

## Polymorphic Serialization

Let's say that our API is responsible for managing the inventory of our players. It sends back an array of items. Those items can be different types: Weapons, Armor, Potions, Misc, etc., 

Weapons and armor are 2 different items that one could expect to see in many video games. They are dramatically different things, and as such, they aren't represented the same way in the JSON. Let's take a look at the following example.

```json
{
    "backpack": [
        {
            "name": "Leather",
            "armor_class": 1.2,
            "description": "Basic Leather Armor"
        },
        {
            "name": "Short Sword",
            "ranged": false,
            "description": "Basic Short Sword",
            "damage_type": "Slashing",
            "damage_modifier": 1.1
        }
    ]
}
```

See the difference? The first `Item` in the array is a piece of `Armor`, the second is a `Weapon`. Since Swift is statically typed, this can be difficult to represent by a single model without making most fields optional. When I was newer to the craft, I would do that. I used to create a single `Item` model with every possible field represented and most of them would be optional. Something like:

```swift
struct Item: Codable {
    let name: String
    let ranged: Bool?
    let description: String?
    let damageType: String?
    let armorClass: Decimal?
    let damageModifier: Decimal?
}

struct Inventory: Codable {
    let backpack: [Item]
}
```

With the `Item` model shown above, I would have to inspect the structure for specific bits of data to know if it was a weapon, a piece of armor, or a potion. Then I would need to unwrap those fields as I needed to use them. This is a big pain in the rear. Don't do it. 

> Don't do it.

Polymorphic serialization is the process of making the model statically represent the different JSON objects. To do that in Swift we'll use an enumeration.

<br/>

### Enumerations with Associated Values

<br/>

Swift [Enumerations](https://docs.swift.org/swift-book/LanguageGuide/Enumerations.html) are quite powerful. One of my favorite features by far is the [Associated Value](https://www.swiftbysundell.com/tips/default-enum-associated-values/). This is somewhat advanced. It allows us to define a set of values _(the enum)_ that are always the same, but then inject other values into the enumeration _(the associated value)_. It looks like this:

```swift
enum Result<T> {
    case success(T)
    case failure(Error)
}
```

If you're used to Swift, you've seen this enumeration before. To use it we have to inject values into _(and extract the value from)_ the enumeration. Here are some examples on how that works:

```swift
func doSomething(with thing: Int?) -> Result<Int> {
    guard let anotherThing = thing else {
        return .failure(NilIntError())
    }
    return .success(anotherThing)
}

func handle(optional: Int?) {
    switch doSomething(with: optional) {
    case .success(let value):
        print(value)
    case .error(let error):
        print(error)
    }
}
```

Notice how we can only create the 2 values of the enumeration `success` and `failure` but we can put so much more information inside of them!?

We're going to define our own enumeration with associated values in a minute. Before we get there though, let's create 2 different item types that are represented in the JSON response from the Inventory API.

<br/>

### Weapons and Armor

<br/>

The `Item` we made before that was used in the `Inventory` struct wouldn't handle the backpack JSON above very well. Instead `Item` will need to be an enum with the kinds of items that could be represented inside.

Let's create the models:

```swift 
struct Armor: Codable {
    let name: String
    let armorClass: Decimal
    let description: String

    enum CodingKeys: String, CodingKey {
        case name, description
        case armorClass = "armor_class"
    }
}

struct Weapon: Codable {
    let name: String
    let ranged: Bool
    let description: String
    let damageType: String
    let damageModifier: Decimal

    enum CodingKeys: String, CodingKey {
        case name, ranged, description
        case damageType = "damage_type"
        case damageModifier = "damage_modifier"
    }
}

enum Item: Codable {
    case weapon(Weapon)
    case armor(Armor)
}
```

This is looking better. However, if you try to serialize this, you'll get failures. The system doesn't know which enumeration value to select because `.weapon` and `.armor` aren't raw types like String or Int at the top level, the objects being serialized are nested within the enumeration. We need to provide a little more detail for Swift to encode or decode into this enum. To do so, we'll add the `Encodable` function and `Decodable` initializer.

```swift
enum Item: Codable {
    case weapon(Weapon)
    case armor(Armor)

    init (from decoder: Decoder) throws {
        if let weapon = try? Weapon(from: decoder) {
            self = .weapon(weapon)
        } else if let armor = try? Armor(from: decoder) {
            self = .armor(armor)
        } else {
            self.init(from: decoder) // this will fail!
        }
    }

    func encode(to encoder: Encoder) throws {
        switch self {
        case .armor(let armor):
            try armor.encode(to: encoder)
        case .weapon(let weapon):
            try weapon.encode(to: encoder)
        }
    }
}
```

<br/>

# 🔥☝️

That little bit of code handles quite a lot! In the initializer we're attempting to create the types that we care about, in the `else` block we're forcing a failure. You could choose to swallow the mismatched item instead _(perhaps log it)_ until you add that model too. That's really all it takes to create a polymorphic serializer in Swift!