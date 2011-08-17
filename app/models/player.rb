class Player < ActiveRecord::Base
  belongs_to :country
  belongs_to :team
  belongs_to :race
  
  validates_presence_of :english_name, :country, :real_name, :race
  
  has_attached_file :mini_head
  has_attached_file :action_shot
  
end
