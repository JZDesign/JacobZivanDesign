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
generated_urls = index_files.map do |file|
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

macos_archive_path = output_root.join("tags", "macos", "index.html")
if macos_archive_path.file?
  macos_archive = File.read(macos_archive_path)
  macos_items = macos_archive.scan(%r{href="/technology/[^"#?]+/"}).uniq
  errors << "macOS archive contains #{macos_items.length} articles; expected 12" unless macos_items.length == 12
  errors << "macOS archive contains the nonstandard 'MacOS' label" if macos_archive.include?(">MacOS<")
else
  errors << "macOS tag archive is missing"
end

if errors.empty?
  puts "SEO validation passed for #{index_files.length} generated pages."
else
  warn errors.map { |error| "- #{error}" }.join("\n")
  exit 1
end
