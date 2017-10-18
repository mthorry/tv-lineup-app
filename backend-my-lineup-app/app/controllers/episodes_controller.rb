class EpisodesController < ApplicationController
  def create
    user = User.find(1)
    if params[:show][:image]
      image = params[:show][:image][:original]
    else
      image = nil
    end
    show = Show.find(params[:show_id])
    episode = Episode.find_or_create_by(
      id: params[:show][:id],
      show_title: show.title,
      title: params[:show][:name],
      season: params[:show][:season],
      number: params[:show][:number],
      airdate: params[:show][:airdate],
      airtime: params[:show][:airtime],
      airstamp: params[:show][:airstamp],
      runtime: params[:show][:runtime],
      img: image,
      url: params[:show][:url],
      summary: params[:show][:summary],
      show_id: params[:show_id]
    )
    episode.users << user

    render json: user.episodes
  end

  def index
    user = User.find(params[:id])
    episodes = user.episodes
    render json: episodes
  end

  def destroy
    episode = Episode.find(params[:id])
    user = User.find(1)
    episode.destroy
    render json: user.episodes
  end
end

  # def search
  #   search = params[:_json]
  #   response = RestClient::Request.execute(
  #     method: :get,
  #     url: "https://api.trakt.tv/search/search/show?query=#{search}&type=show&extended=full",
  #     headers: {
  #       'Accept': 'application/json',
  #       'Content-Type': 'application/json',
  #       'trakt-api-version': '2',
  #       'trakt-api-key': '8de248cf5d4040db92f61ab373123612d998328b4d63540b45991fce09e88d64'
  #     }
  #   )
  #   results = JSON.parse(response)
  #   render json: results
  # end

  # https://api.trakt.tv/shows/how-to-get-away-with-murder?extended=full
