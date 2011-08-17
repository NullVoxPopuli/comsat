class AddRealNameAndAgeToPlayers < ActiveRecord::Migration
  def self.up
    add_column :players, :real_name, :string
    add_column :players, :age, :integer
  end

  def self.down
    remove_column :players, :real_name
    remove_column :players, :age
  end
end
