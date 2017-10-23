Rails.application.routes.draw do

  post '/search',     to: 'shows#search'
  get '/:id/shows',   to: 'shows#index'
  post '/shows',      to: 'shows#create'
  delete '/shows',    to: 'shows#destroy'

  post '/suggested',  to: 'shows#fetch_suggested'
  post '/premieres',  to: 'shows#fetch_premieres'
  post '/trending',  to: 'shows#fetch_trending'
  post '/recommend',  to: 'shows#recommended'

  get '/:id/episodes',  to: 'episodes#index'
  post '/episodes',     to: 'episodes#create'
  delete '/episodes',   to: 'episodes#destroy'

  post '/login',  to: 'sessions#create'
  post '/signup', to: 'users#create'

end
