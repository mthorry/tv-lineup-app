class Episode < ApplicationRecord
  has_many :user_episodes, dependent: :destroy
  has_many :users, through: :user_episodes
  belongs_to :show
end
