Rails.application.routes.draw do
  resources :saveplaylists do
    collection {post :import}
  end

  namespace :api do
    namespace :v1 do
      post "/create" , to: 'saveplaylistupdates#create'
    end
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
