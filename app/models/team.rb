class Team < ActiveRecord::Base
  has_many :players
  
  validates_presence_of :name, :abbreviation
  
end
