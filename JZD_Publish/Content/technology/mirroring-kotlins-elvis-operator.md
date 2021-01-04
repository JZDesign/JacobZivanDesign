---
date: 2021-01-04 8:13
description: Unwrap or Throw - Make Swift's equivalent to Kotlin's Elvis Operator!  A Tutorial for adding Custom Operators in Swift.
tags: Kotlin, iOS, Swift, Technology, Tutorial
---

# Mirroring Kotlin's Elvis Operator in Swift

In many languages, there are ways to coalesce `nil` values. In Swift, for example, the Nil Coalescing operator is `??` We use this to provide a fallback value when a variable could be `nil`, like so:

```swift
var y: Int? = nil
var x = y ?? 0
```

In the Kotlin language, there is a similar operator called the "Elvis Operator" _because, seriously... it looks a bit like a tiny sideways elvis_ `?:` It's used like:

```
x = y ?: 0
```

<br/>

## So why try and mirror it?

Unlike Swift's `??`, Kotlin's `?:` does more than coalesce nil values, it can throw too!

```
x = y ?: throw SomeException()
```

When used this way, `x` will still be a non-optional type, but the function will stop there if `y` is `null`.

To do this in Swift, we would generally need to use a `guard` statement.

```swift
guard let x = y else { 
    throw SomeError() 
}
```

It's not terrible, but Kotlin's `?:` is much nicer, _in my opinion._

<br/>

## Writing a Custom Operator in Swift

Swift allows us to write [custom operators](https://docs.swift.org/swift-book/LanguageGuide/AdvancedOperators.html#ID46) to handle things like this. Unfortunately, the `:` character is [unavailable](https://docs.swift.org/swift-book/ReferenceManual/LexicalStructure.html#ID418) for use. So we can't make our operator syntactically identical to Kotlin's.

The operator we'll be creating is an infix operator. Meaning that the operator will fall **in**between it's arguments, just like `argument1 ?? argument2`. In Swift, infix operators must adhere to a [Precedence Group](https://developer.apple.com/documentation/swift/swift_standard_library/operator_declarations). This grouping tells the compiler what order functions should get executed, much like the [Order of Operations](https://en.wikipedia.org/wiki/Order_of_operations) in mathematics.

There is a lot there, so we won't go into the specifics on all of that in this tutorial.

<br/>

### Unwrap or Throw
<br/>

Because we can't use Kotlin's `?:` or Swift's `??` we'll do something a little different.

```swift
infix operator ??? : TernaryPrecedence
func ???<T>(_ left: Optional<T>, right: Error) throws -> T {
    guard let value = left else { throw right }
    return value
}
```
<br/>

Using generics, we can pass any optional type to the left hand side of `???` for evaluation! Let's take a look at how it's used.

```swift
x = try y ??? SomeError()
```

<br/>

It works splendidly! Because of the way Swift handles throwing functions, we do this differently than in Kotlin. `try` on the left instead of `throw` on the right. 

Unlike Kotlin's Elvis Operator, this does not handle both coalescing a `nil` value and throwing errors. We'll have 2, `??` and `???`, and we'll need to use the them appropriately.

I hope you found this useful! 