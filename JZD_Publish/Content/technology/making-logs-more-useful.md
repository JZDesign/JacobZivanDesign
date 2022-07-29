---
date: 2022-17-28 13:13
description: Swift Stack Traces are not very useful in most logs because they're obfuscated. In this article we'll learn how to determine the call site in a usable way using Swift's \#file, \#line, & \#function
tags: MacOS, iOS, Swift, Technology, Tutorial
---

# When Stack Traces Aren't Useful…

One of Swift's more prickly bits is its stack traces. They're obfuscated by default, because of that, they're pretty much unusable without [symbolicating](https://stackoverflow.com/questions/11747802/symbolicating-stack-trace-without-crash) them. In interpreted languages like Java, the stack trace is legible out of the gate. To illustrate, here are some stack trace examples:

**Swift Stack Trace—out of the box**

```
Thread 0 name:  Dispatch queue: com.apple.main-thread
Thread 0 Crashed:
0   libswiftCore.dylib                0x00000001bd38da70 0x1bd149000 + 2378352
1   libswiftCore.dylib                0x00000001bd38da70 0x1bd149000 + 2378352
2   libswiftCore.dylib                0x00000001bd15958c 0x1bd149000 + 66956
3   libswiftCore.dylib                0x00000001bd15c814 0x1bd149000 + 79892
4   TouchCanvas                       0x00000001022cbfa8 0x1022c0000 + 49064
5   TouchCanvas                       0x00000001022c90b0 0x1022c0000 + 37040
```

**Java**

```
Exception in thread "main" java.lang.NullPointerException
    at Printer.printString(Printer.java:13)
    at Printer.print(Printer.java:9)
    at Printer.main(Printer.java:19)
```

## Symbolication

There is a way to make the Swift Stack Trace more useful. That process is called ["Symbolication"](https://developer.apple.com/documentation/xcode/adding-identifiable-symbol-names-to-a-crash-report). 

For example, here is a symbolicated stack trace that from an Objective-C crash report:

```
NSRangeException: *** -[__NSArrayI objectAtIndex:]: index 3 beyond bounds [0 .. 2]
0 CoreFoundation      __exceptionPreprocess + 124
1 libobjc.A.dylib     objc_exception_throw + 52
2 CoreFoundation      -[__NSArrayI objectAtIndex:] + 180
3 MyApplication       getElementFromArray (MyFile.m:22)
4 MyApplication       printAllElements (MyFile.m:27)
```

It is better, but, I still find them cumbersome. The fact that we need to translate the stack trace into something useful while we're reading through logs is, well… annoying. That takes time and will power, and when you're dealing with thousands of logs… it's pretty easy to kill a lot of time and get confused.

## Swift's [Literal Expressions](https://docs.swift.org/swift-book/ReferenceManual/Expressions.html) to the rescue

Thanfully, Swift provides a few nifty expressions to make it easier for us to track down what's happening. If you want to know the exact file, line number and function the offending code originated, we can use these three literals:

```swift
func logSomething() {
    print("\(#file), \(#line), \(#function)")
}
```

That would output something like:

```
User/User-name/pathToProject/PathToFile.swift, 22, logSomething()
```

Great!

With that kind of information, we can make our logs work for us, instead of the other way around.

## In Practice

These can come in handy, however, they can confuse just as easily as a stack trace if you're not careful. For one reason or another, we can use the literals as default arguments in a function and they will identify the location from witch the function is called, which is what we want. That is not true if we do the same in an initializer used as a default argument, it identifies the file, line and function name of the initializer invocation—which is the line where the default argument is supplied. That bit me once or twice already.

For example:

```Swift
// File A.swift
// lines 1 - 5
func logError(file: String = #file, line: Int = #line, function: String = #function, error: Error) {
    print("file: \(file ), line: \(line), funtion:\(function)")
}

//File B.swift
// line 33
logError(error: MyError()) // this will pass in default arguments from this exact location as if we wrote `logError(file: "B.swift", line: 3, function: logError(error:_))

// file ErrorDetails.swift 
// Lines 1-15
struct ErrorDetails {
    let file: String
    let line: Int
    let function: String

    init(
        file: String = #file,
        line: Int = #line,
        function: String = #function
    ) {
        print("file: \(file ), line: \(line), funtion:\(function)")
    }
}

// File C.swift
// lines 30-33
func logErrorDetails(_ details: ErrorDetails = .init(), error: Error) {
    print(details)
}

// File D.swift
// line 100
logErrorDetails(error: error) 
// This would print `file: path/C.swift, line: 32, function: logErrorDetails(_, error)`
// Instead of `file: path/D.swift, line:100, function: someContainingFunctionName`
```

Notice that? The initializer called in C.swift doesn't care about the place the function was called from. Instead it reads the location of where exaclty `.init()` was invoked. 

We can skirt around that by passing the initializer as an argument explicitly like:

```swift
logErrorDetails(.init(), error: error)
```



