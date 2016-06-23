class CreateRooms < ActiveRecord::Migration
  def change
    create_table :rooms do |t|
      t.references :day, index: true, foreign_key: true
      t.string :name
      t.string :description
      t.string :location

      t.timestamps null: false
    end
  end
end
