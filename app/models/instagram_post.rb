class InstagramPost
  def initialize(params)
    @params = params
  end

  def valid?
    true
  end

  def to_json
    {
      displayUrl: 'picture.com',
      userPictureUrl: 'userpic.com'
    }.to_json
  end
end
