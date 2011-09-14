class HomeController < ApplicationController
  before_filter :authenticate_user!, :only => :token

  def index
  end
  
  def match_set_up
    @featured_players = Player.find(:all, :conditions => ["featured = ?", true])
    render :layout => "comsat"
    
  end
end
