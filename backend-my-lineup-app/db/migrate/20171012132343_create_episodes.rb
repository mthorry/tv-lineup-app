class CreateEpisodes < ActiveRecord::Migration[5.1]
  def change
    create_table :episodes do |t|
      t.string :title
      t.integer :season
      t.integer :number
      t.string :airdate
      t.string :runtime
      t.string :img
      t.string :url
      t.text :summary
      t.integer :show_id

      t.timestamps
    end
  end
end
