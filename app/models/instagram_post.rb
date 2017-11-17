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
    @shortcode_media = @parsed[:graphql][:shortcode_media]

    tap do |post|
      post.display_url                 = @shortcode_media[:display_url]
      post.username                    = @shortcode_media[:owner][:username]
      post.profile_pic_url             = @shortcode_media[:owner][:profile_pic_url]
      post.like_count                  = @shortcode_media[:edge_media_preview_like][:count]
      post.taken_at_timestamp          = @shortcode_media[:taken_at_timestamp]
      post.edge_media_to_caption       = media_caption
      post.edge_media_to_comment_array = media_comment_array
    end
  end

  def media_caption
    return nil if @shortcode_media[:edge_media_to_caption][:edges].empty?
    @shortcode_media[:edge_media_to_caption][:edges][0][:node][:text]
  end

  def media_comment_array
    return [] if @shortcode_media[:edge_media_to_comment][:edges].empty?

    @shortcode_media[:edge_media_to_comment][:edges].map do |edge|
      { text: edge[:node][:text], username: edge[:node][:owner][:username] }
    end
  end
end
