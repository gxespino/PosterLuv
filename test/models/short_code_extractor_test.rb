require 'test_helper'

describe ShortCodeExtractor do
  describe '.extract' do
    it 'accepts a url string' do
      url = 'http://instagram.com/p/ShortCode'

      assert_nothing_raised do
        ShortCodeExtractor.extract(url)
      end
    end

    it 'extracts the short code' do
      url = 'http://instagram.com/p/ShortCode'

      result = ShortCodeExtractor.extract(url)

      assert_equal 'ShortCode', result
    end
  end
end
