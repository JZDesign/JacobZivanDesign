// swift-tools-version:5.6

import PackageDescription

let package = Package(
    name: "JZDPublish",
    platforms: [.macOS(.v12)],
    products: [
        .executable(
            name: "JZDPublish",
            targets: ["JZDPublish"]
        )
    ],
    dependencies: [
        .package(url: "https://github.com/JZDesign/CNAMEPublishPlugin", branch: "hotfix.support.macos.v12"),
        // Files 4.3.0 uses URL-based copies, which prevents Publish deployment
        // paths from being flattened by newer Foundation versions.
        .package(url: "https://github.com/johnsundell/files.git", from: "4.3.0"),
        .package(url: "https://github.com/johnsundell/publish.git", .upToNextMajor(from: "0.9.0")),
        .package(url: "https://github.com/johnsundell/splashpublishplugin",.upToNextMajor(from: "0.2.0"))

    ],
    targets: [
        .executableTarget(
            name: "JZDPublish",
            dependencies: [
                .product(name: "Files", package: "files"),
                .product(name: "Publish", package: "publish"),
                .product(name: "SplashPublishPlugin", package: "splashpublishplugin"),
                .product(name: "CNAMEPublishPlugin", package: "CNAMEPublishPlugin")
            ]
        )
    ]
)
