class CreateShows < ActiveRecord::Migration[5.1]
  def change
    create_table :shows do |t|
      t.string :title
      t.text :summary
      t.string :img
      t.string :genre
      t.string :network
      t.string :air_day
      t.string :air_time
      t.string :url
      t.string :rating
      t.string :status

      t.timestamps
    end
  end
end
