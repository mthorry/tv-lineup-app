class UserShows < ActiveRecord::Migration[5.1]
  def change
      create_table :user_shows do |t|

      t.integer :user_id
      t.integer :show_id
      t.string :rating
    end
  end
end
