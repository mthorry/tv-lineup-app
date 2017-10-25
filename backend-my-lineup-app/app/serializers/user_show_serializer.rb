class UserShowSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :show_id, :rating

  belongs_to :user
  belongs_to :show
end
