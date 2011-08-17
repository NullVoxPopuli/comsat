class Country < ActiveRecord::Base
  has_many :players
  
  has_attached_file :flag
end
