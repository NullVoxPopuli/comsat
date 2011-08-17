class AddRaceIdToPlayer < ActiveRecord::Migration
  def self.up
    add_column :players, :race_id, :integer
    remove_column :players, :main_race
  end

  def self.down
    remove_column :players, :race_id
    add_column :players, :main_race, :string
  end
end
