class HomeController < ApplicationController
  before_filter :authenticate_user!, :only => :token
  layout "comsat"

  def index
    @featured_players = Player.find(:all, :conditions => ["featured = ?", true])
  end

  def token
  end
  
  def manage
  end
end
