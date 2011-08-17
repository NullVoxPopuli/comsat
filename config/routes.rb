DeviseExample::Application.routes.draw do
  resources :races

  resources :teams

  resources :countries

  resources :players

  devise_for :users

  resources :home, :only => :index

  root :to => 'home#index'

  match '/token' => 'home#token', :as => :token
end
