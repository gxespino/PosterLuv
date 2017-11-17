Rails.application.routes.draw do
  root 'prints#new'

  resource :instagram_posts, only: [:create]
end
