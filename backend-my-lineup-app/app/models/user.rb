class User < ApplicationRecord
  has_many :user_shows
  has_many :shows, through: :user_shows
  has_many :user_episodes
  has_many :episodes, through: :user_episodes
  has_secure_password
end
