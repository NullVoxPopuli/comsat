class AddStarcraftFieldsToUser < ActiveRecord::Migration
  def self.up
    add_column :users, :login, :string
    add_column :users, :battle_net_id, :string
    add_column :users, :battle_net_url, :string
  end

  def self.down
    remove_column :users, :login
    remove_column :users, :battle_net_id
    remove_column :users, :battle_net_url
  end
end
