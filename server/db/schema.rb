# encoding: UTF-8
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

ActiveRecord::Schema.define(version: 20160623034714) do

  create_table "days", force: :cascade do |t|
    t.string   "name"
    t.date     "date"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "rooms", force: :cascade do |t|
    t.integer  "day_id"
    t.string   "name"
    t.string   "description"
    t.string   "location"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "rooms", ["day_id"], name: "index_rooms_on_day_id"

  create_table "topics", force: :cascade do |t|
    t.integer  "day_id"
    t.integer  "room_id"
    t.string   "author"
    t.string   "author_info"
    t.string   "author_avatars"
    t.string   "title"
    t.text     "description"
    t.boolean  "rest"
    t.time     "start_at"
    t.time     "end_at"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
  end

  add_index "topics", ["day_id"], name: "index_topics_on_day_id"
  add_index "topics", ["room_id"], name: "index_topics_on_room_id"

end
