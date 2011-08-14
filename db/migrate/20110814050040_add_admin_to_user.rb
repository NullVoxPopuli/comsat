class AddAdminToUser < ActiveRecord::Migration
  def self.up
    drop_table :admins
    add_column :users, :admin, :boolean, :default => false
  end

  def self.down
    remove_column :users, :admin
    create_table :admins do |t|
      t.database_authenticatable
      t.timestamps
    end
  end
end
