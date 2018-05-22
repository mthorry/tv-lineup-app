class UserEpisodesController < ApplicationController

  def index
    user = User.find(1)
    user_episodes = user.user_episodes
    render json: user_episodes
  end

  def rate_episode
    user = User.find(1)
    user_episode = UserEpisode.find_by(user_id: 1, episode_id: params[:episode_id])
    user_episode.rating = params[:rating].to_i
    user_episode.save
    render json: user.user_episodes
  end

  def watched_episode
    user = User.find(1)
    user_episode = UserEpisode.find_by(user_id: 1, episode_id: params[:episode_id])
    user_episode.watched = !user_episode.watched
    user_episode.save
    render json: user.user_episodes
  end

  def destroy
    user_episode = UserEpisode.find_by(user_id: 1, episode_id: params[:episode_id])
    user_episode.destroy
    episodes = User.find(1).episodes

    render json: episodes
  end

end