class InstagramPost
  attr_reader :short_code

  def initialize(short_code:)
    @short_code = short_code
  end

  def valid?
    true
  end

  def to_json
    {
      shortCode: @short_code,
      userPictureUrl: 'userpic.com'
    }.to_json
  end
end
