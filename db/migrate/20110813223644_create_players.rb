class CreatePlayers < ActiveRecord::Migration
  def self.up
    create_table :players do |t|
      t.string :english_name
      t.string :main_race
      t.string :country
      t.string :team
      t.string :team_shorthand
      t.boolean :featured

      t.timestamps
    end
  end

  def self.down
    drop_table :players
  end
end
