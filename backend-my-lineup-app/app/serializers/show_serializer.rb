class ShowSerializer < ActiveModel::Serializer
  attributes :id, :title, :summary, :img, :genre, :network, :air_day, :air_time, :url, :rating, :status

  has_many :user_shows, dependent: :destroy
  has_many :users, through: :user_shows
  has_many :episodes
end
