class AddTeamIdToPlayer < ActiveRecord::Migration
  def self.up
    add_column :players, :team_id, :integer
    remove_column :players, :team
    remove_column :players, :team_shorthand
  end

  def self.down
    remove_column :players, :team_id
    add_column :players, :team, :string
    add_column :players, :team_shorthand, :string
  end
end
