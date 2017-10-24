class EpisodesController < ApplicationController
  def create
    user = User.find(1)

    if params[:episode][:image]
      image = params[:episode][:image][:original]
    elsif params[:image]
      image = params[:image][:original]
    else
      image = nil
    end

    if params[:show_id]
       show = Show.find(params[:show_id])
      episode = Episode.find_or_create_by(
        id: params[:episode][:id],
        show_title: show.title,
        title: params[:episode][:name],
        season: params[:episode][:season],
        number: params[:episode][:number],
        airdate: params[:episode][:airdate],
        airtime: params[:episode][:airtime],
        airstamp: params[:episode][:airstamp],
        runtime: params[:episode][:runtime],
        img: image,
        url: params[:episode][:url],
        summary: params[:episode][:summary],
        show_id: show.id
      )
      episode.users << user
    # elsif params[:episode][:show][:title] || params[:show][:title]
    #   show = Show.find_by(title: params[:episode][:show][:title]) || show = Show.find_by(title: params[:show][:title])
      # show = Show.find(params[:show][:id])
      # episode = Episode.find_or_create_by(
      #   id: params[:id],
      #   show_title: show.title,
      #   title: params[:name],
      #   season: params[:season],
      #   number: params[:number],
      #   airdate: params[:airdate],
      #   airtime: params[:airtime],
      #   airstamp: params[:airstamp],
      #   runtime: params[:runtime],
      #   img: image,
      #   url: params[:url],
      #   summary: params[:summary],
      #   show_id: params[:show][:id]
      # )
      # episode.users << user
    else
    end

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
