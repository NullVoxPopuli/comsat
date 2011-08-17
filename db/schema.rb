# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20110816233719) do

  create_table "countries", :force => true do |t|
    t.string   "name"
    t.string   "abbreviation"
    t.string   "flag_file_name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "players", :force => true do |t|
    t.string   "english_name"
    t.boolean  "featured"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "real_name"
    t.integer  "age"
    t.integer  "country_id"
    t.integer  "team_id"
    t.integer  "race_id"
    t.string   "mini_head_file_name"
    t.string   "action_shot_file_name"
  end

  create_table "races", :force => true do |t|
    t.string   "name"
    t.string   "race_logo_file_name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "teams", :force => true do |t|
    t.string   "name"
    t.string   "abbreviation"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "users", :force => true do |t|
    t.string   "email",                                                  :null => false
    t.string   "encrypted_password",   :limit => 128,                    :null => false
    t.string   "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string   "reset_password_token"
    t.string   "remember_token"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",                       :default => 0
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.integer  "failed_attempts",                     :default => 0
    t.string   "unlock_token"
    t.datetime "locked_at"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "authentication_token"
    t.string   "login"
    t.string   "battle_net_id"
    t.string   "battle_net_url"
    t.boolean  "admin",                               :default => false
    t.string   "username"
  end

end
