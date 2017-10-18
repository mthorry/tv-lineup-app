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
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20171014142518) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "episodes", force: :cascade do |t|
    t.string "title"
    t.string "show_title"
    t.integer "season"
    t.integer "number"
    t.string "airdate"
    t.string "airtime"
    t.string "airstamp"
    t.integer "runtime"
    t.string "img"
    t.string "url"
    t.text "summary"
    t.integer "show_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "shows", force: :cascade do |t|
    t.string "title"
    t.text "summary"
    t.string "img"
    t.string "genre"
    t.string "network"
    t.string "air_day"
    t.string "air_time"
    t.string "url"
    t.string "rating"
    t.string "status"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "user_episodes", force: :cascade do |t|
    t.integer "user_id"
    t.integer "episode_id"
    t.string "rating"
    t.boolean "watched"
  end

  create_table "user_shows", force: :cascade do |t|
    t.integer "user_id"
    t.integer "show_id"
    t.string "rating"
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "password_digest"
    t.string "genres"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
