class AddCountryIdToPlayer < ActiveRecord::Migration
  def self.up
    add_column :players, :country_id, :integer
    remove_column :players, :country
  end

  def self.down
    remove_column :players, :country_id
    add_column :players, :country, :string
  end
end
