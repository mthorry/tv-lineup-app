class UserEpisodeSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :episode_id, :rating, :watched

  belongs_to :user
  belongs_to :episode
end
