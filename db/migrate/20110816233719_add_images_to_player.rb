class AddImagesToPlayer < ActiveRecord::Migration
  def self.up
    add_column :players, :mini_head_file_name, :string
    add_column :players, :action_shot_file_name, :string
  end

  def self.down
    remove_column :players, :mini_head_file_name
    remove_column :players, :action_shot_file_name
  end
end
