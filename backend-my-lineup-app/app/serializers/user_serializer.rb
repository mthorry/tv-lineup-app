class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :genres, :password, :password_digest

  has_many :user_shows
  has_many :shows, through: :user_shows
  has_many :user_episodes
  has_many :episodes, through: :user_episodes
end
