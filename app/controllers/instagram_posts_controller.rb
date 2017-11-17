class InstagramPostsController < ApplicationController
  def create
    @instagram_post = InstagramPost.new(short_code: short_code)

    if @instagram_post.valid?
      render json: @instagram_post.to_json, status: :ok
    else
      render json: @instagram_post.errors, status: :unprocessable_entity
    end
  end

  private

  def instagram_post_params
    params.permit(:instagramPostUrl)
  end

  def short_code
    @short_code ||= ShortCodeExtractor.extract(instagram_post_params[:instagramPostUrl])
  end
end
