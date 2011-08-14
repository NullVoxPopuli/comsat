DeviseExample::Application.routes.draw do
  resources :players

  devise_for :users, :admin

  resources :home, :only => :index
  resources :admins, :only => :index

  root :to => 'home#index'

  match '/token' => 'home#token', :as => :token
end
