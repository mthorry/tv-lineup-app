Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  post '/search', to: 'shows#search'

  get '/:id/shows', to: 'shows#index'
  post '/shows', to: 'shows#create'
  post '/suggested', to: 'shows#find_suggested'
  delete '/shows', to: 'shows#destroy'
  post '/recommend', to: 'shows#recommended'

  get '/:id/episodes', to: 'episodes#index'
  post '/episodes', to: 'episodes#create'
  delete '/episodes', to: 'episodes#destroy'

end
