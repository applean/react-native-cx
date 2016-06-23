class CreateTopics < ActiveRecord::Migration
  def change
    create_table :topics do |t|
      t.references :day, index: true, foreign_key: true
      t.references :room, index: true, foreign_key: true
      t.string :author
      t.string :author_info
      t.string :author_avatars
      t.string :title
      t.text :description
      t.boolean :rest
      t.time :start_at
      t.time :end_at

      t.timestamps null: false
    end
  end
end
