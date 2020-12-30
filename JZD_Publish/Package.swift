// swift-tools-version:5.2

import PackageDescription

let package = Package(
    name: "JZDPublish",
    products: [
        .executable(
            name: "JZDPublish",
            targets: ["JZDPublish"]
        )
    ],
    dependencies: [
        .package(name: "Publish", url: "https://github.com/johnsundell/publish.git", from: "0.6.0")
    ],
    targets: [
        .target(
            name: "JZDPublish",
            dependencies: ["Publish"]
        )
    ]
)