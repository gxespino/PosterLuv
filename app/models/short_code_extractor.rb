class ShortCodeExtractor
  def self.extract(url)
    # Get the path component of the URL,
    # split on forward slashes,
    # return the last portion
    URI.parse(url).path.split('/').last
  end
end
