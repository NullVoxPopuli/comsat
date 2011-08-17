class Race < ActiveRecord::Base
  has_many :players
  
  validates_presence_of :name, :race_logo_file_name
  
  has_attached_file :race_logo
end
