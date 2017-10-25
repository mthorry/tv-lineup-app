class EpisodeSerializer < ActiveModel::Serializer
  attributes :id, :title, :show_title, :season, :number, :airdate, :airtime, :airstamp, :runtime, :img, :url, :summary, :show_id

  has_many :user_episodes, dependent: :destroy
  has_many :users, through: :user_episodes
  belongs_to :show
end
