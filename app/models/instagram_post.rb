class InstagramPost
  include HTTParty

  attr_accessor(
    :short_code,
    :display_url,
    :username,
    :profile_pic_url,
    :like_count,
    :taken_at_timestamp,
    :edge_media_to_caption,
    :edge_media_to_comment_array
  )

  def initialize(short_code:)
    @short_code = short_code
    fetch_details!
  end

  def valid?
    @valid
  end

  def to_json
    {
      short_code:                  @short_code,
      display_url:                 @display_url,
      username:                    @username,
      profile_pic_url:             @profile_pic_url,
      like_count:                  @like_count,
      taken_at_timestamp:          @taken_at_timestamp,
      edge_media_to_caption:       @edge_media_to_caption,
      edge_media_to_comment_array: @edge_media_to_comment_array
    }.to_json
  end

  private

  def fetch_details!
    response ||= self.class.get("https://www.instagram.com/p/#{short_code}?__a=1")

    if response.success?
      @response_body ||= response.body
      @valid = true
      assign_values!
    end
  end

  def assign_values!
    @parsed ||= JSON.parse(@response_body, symbolize_names: true)

    tap do |post|
      post.display_url                 = @parsed[:graphql][:shortcode_media][:shortcode]
      post.username                    = @parsed[:graphql][:shortcode_media][:shortcode]
      post.profile_pic_url             = @parsed[:graphql][:shortcode_media][:shortcode]
      post.like_count                  = @parsed[:graphql][:shortcode_media][:shortcode]
      post.taken_at_timestamp          = @parsed[:graphql][:shortcode_media][:shortcode]
      post.edge_media_to_caption       = @parsed[:graphql][:shortcode_media][:shortcode]
      post.edge_media_to_comment_array = @parsed[:graphql][:shortcode_media][:shortcode]
    end
  end
end
