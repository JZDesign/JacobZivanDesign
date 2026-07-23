#!/usr/bin/env ruby

require "cgi"
require "pathname"

site_root = Pathname.new(__dir__).join("..").expand_path
output_root = site_root.join("Output")
base_url = "https://jacobzivandesign.com/"
errors = []

unless output_root.directory?
  warn "Output is missing. Run `swift run --quiet` first."
  exit 1
end

index_files = Dir.glob(output_root.join("**", "index.html")).sort
indexable_files = index_files.reject do |file|
  File.read(file).match?(/<meta\b[^>]*\bname="robots"[^>]*\bcontent="[^"]*noindex/i)
end
generated_urls = indexable_files.map do |file|
  relative_directory = Pathname.new(file).dirname.relative_path_from(output_root).to_s
  relative_directory == "." ? base_url : "#{base_url}#{relative_directory}/"
end

index_files.each do |file|
  html = File.read(file)
  relative_directory = Pathname.new(file).dirname.relative_path_from(output_root).to_s
  expected_canonical = relative_directory == "." ? base_url : "#{base_url}#{relative_directory}/"
  canonical_tag = html.scan(/<link\b[^>]*>/).find { |tag| tag.match?(/\brel="canonical"/) }
  canonical_url = canonical_tag&.match(/\bhref="([^"]+)"/)&.captures&.first

  if canonical_url != expected_canonical
    errors << "#{file}: canonical is #{canonical_url.inspect}; expected #{expected_canonical.inspect}"
  end

  html.scan(/\bhref="([^"]+)"/).flatten.each do |href|
    next unless href.start_with?("/")

    path = href.split(/[?#]/, 2).first
    next if path == "/" || path.end_with?("/") || !File.extname(path).empty?

    errors << "#{file}: internal page link is missing a trailing slash: #{href}"
  end

  html.scan(/<meta\b.*?\/>/).each do |tag|
    attributes = tag.delete_prefix("<meta").delete_suffix("/>")
    remainder = attributes.gsub(/\s+[A-Za-z_:][-A-Za-z0-9_:.]*="[^"]*"/, "")
    errors << "#{file}: malformed meta tag: #{tag}" unless remainder.strip.empty?
  end
end

sitemap_path = output_root.join("sitemap.xml")
if sitemap_path.file?
  sitemap = File.read(sitemap_path)
  sitemap_urls = sitemap.scan(/<loc>(.*?)<\/loc>/).flatten.map { |url| CGI.unescapeHTML(url) }

  errors << "sitemap.xml contains duplicate URLs" unless sitemap_urls.uniq.length == sitemap_urls.length
  sitemap_urls.each do |url|
    errors << "sitemap.xml contains a non-canonical URL: #{url}" unless url == base_url || url.end_with?("/")
  end

  missing_urls = generated_urls - sitemap_urls
  extra_urls = sitemap_urls - generated_urls
  errors << "sitemap.xml is missing: #{missing_urls.join(", ")}" unless missing_urls.empty?
  errors << "sitemap.xml contains non-generated pages: #{extra_urls.join(", ")}" unless extra_urls.empty?
else
  errors << "sitemap.xml is missing"
end

robots_path = output_root.join("robots.txt")
robots = robots_path.file? ? File.read(robots_path) : ""
unless robots.include?("Sitemap: #{base_url}sitemap.xml")
  errors << "robots.txt is missing the canonical sitemap URL"
end

errors << ".nojekyll is missing from Output" unless output_root.join(".nojekyll").file?
errors << "draft musings were generated" if output_root.join("__musings").exist?

mermaid_pages = index_files.select { |file| File.read(file).match?(/mermaid/i) }
unless mermaid_pages.empty?
  errors << "Mermaid is loaded without being used: #{mermaid_pages.join(", ")}"
end

macos_archive_path = output_root.join("tags", "macos", "index.html")
if macos_archive_path.file?
  macos_archive = File.read(macos_archive_path)
  macos_items = macos_archive.scan(%r{href="/technology/[^"#?]+/"}).uniq
  errors << "macOS archive contains #{macos_items.length} articles; expected 12" unless macos_items.length == 12
  errors << "macOS archive contains the nonstandard 'MacOS' label" if macos_archive.include?(">MacOS<")
else
  errors << "macOS tag archive is missing"
end

tag_archive_files = Dir.glob(output_root.join("tags", "*", "index.html")).sort
tag_titles = []
tag_descriptions = []
thin_archive_count = 0

tag_archive_files.each do |file|
  html = File.read(file)
  item_count = html.scan("<li><article>").length
  noindex = html.match?(/<meta\b[^>]*\bname="robots"[^>]*\bcontent="noindex, follow"/i)
  title = html[/<title>(.*?)<\/title>/, 1]
  description_tag = html.scan(/<meta\b[^>]*>/).find { |tag| tag.match?(/\bname="description"/) }
  description = description_tag&.match(/\bcontent="([^"]*)"/)&.captures&.first

  tag_titles << title
  tag_descriptions << description

  if item_count <= 1
    thin_archive_count += 1
    errors << "#{file}: thin tag archive is indexable" unless noindex
  elsif noindex
    errors << "#{file}: substantive tag archive is noindexed"
  end
end

errors << "no thin tag archives were found to validate" if thin_archive_count.zero?
errors << "tag archive titles are not unique" unless tag_titles.compact.uniq.length == tag_archive_files.length
errors << "tag archive descriptions are not unique" unless tag_descriptions.compact.uniq.length == tag_archive_files.length

tag_list_path = output_root.join("tags", "index.html")
if tag_list_path.file?
  tag_list = File.read(tag_list_path)
  errors << "tag list title is generic" unless tag_list.include?("<title>Writing Topics | Jacob Zivan Design</title>")
  errors << "tag list description is generic" unless tag_list.include?("Browse Jacob Zivan's writing by topic")
else
  errors << "tag list page is missing"
end

presenter_path = output_root.join("technology", "presenter-patterns", "index.html")
presenter_description = "Clean up your views with the Presenter pattern in Swift UI. Some people call it \"BetterProgramming\" when the view contains a lot of `@State` variables and functions. It's really not. Let's take a look on how to write a presenter with Swift 5.5"

if presenter_path.file?
  presenter_html = File.read(presenter_path)
  ["description", "twitter:description", "og:description"].each do |name|
    tag = presenter_html.scan(/<meta\b.*?\/>/).find { |meta| meta.include?("name=\"#{name}\"") }
    value = tag&.match(/\bcontent="([^"]*)"/)&.captures&.first
    decoded_value = value && CGI.unescapeHTML(value)
    errors << "presenter #{name} metadata is truncated" unless decoded_value == presenter_description
  end
else
  errors << "presenter article is missing"
end

home_path = output_root.join("index.html")
if home_path.file?
  home = File.read(home_path)
  images = home.scan(/<img\b.*?\/>/)
  sources = home.scan(/<source\b.*?\/>/)

  errors << "homepage contains #{images.length} images; expected 5" unless images.length == 5
  images.each do |image|
    errors << "homepage image is missing intrinsic dimensions: #{image}" unless image.match?(/\bwidth="\d+"/) && image.match?(/\bheight="\d+"/)
    errors << "homepage image is missing async decoding: #{image}" unless image.include?("decoding=\"async\"")
  end

  errors << "homepage should lazy-load exactly 4 below-fold images" unless images.count { |image| image.include?("loading=\"lazy\"") } == 4
  errors << "homepage hero should be the only eager image" unless images.count { |image| image.include?("loading=\"eager\"") } == 1
  errors << "homepage hero should be the only high-priority image" unless images.count { |image| image.include?("fetchpriority=\"high\"") } == 1
  errors << "homepage should contain 3 responsive WebP sources" unless sources.length == 3 && sources.all? { |source| source.include?("type=\"image/webp\"") && source.include?("srcset=") && source.include?("sizes=") }
  errors << "homepage still references the mislabeled WhoYa PNG" if home.include?("whoya-icon.png")
else
  errors << "homepage is missing"
end

app_image_root = site_root.join("Resources", "images", "apps")
expected_webp_files = %w[
  whoya-icon-320.webp
  whoya-icon-640.webp
  whoya-icon-1024.webp
  noah-weather-icon-240.webp
  noah-weather-icon-480.webp
  noah-weather-icon-720.webp
]
expected_webp_files.each do |name|
  errors << "responsive image is missing: #{name}" unless app_image_root.join(name).file?
end

whoya_fallback = app_image_root.join("whoya-icon.jpg")
unless whoya_fallback.file? && File.binread(whoya_fallback, 2) == "\xFF\xD8".b
  errors << "WhoYa fallback is not a correctly named JPEG"
end

if errors.empty?
  puts "SEO validation passed for #{index_files.length} generated pages."
else
  warn errors.map { |error| "- #{error}" }.join("\n")
  exit 1
end
