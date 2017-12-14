Rails.application.routes.draw do
  root 'prints#new'

  get '/success', to: 'prints#success'

  resource :instagram_posts, only: [:create]
  resource :purchases, only: [:create]
end
