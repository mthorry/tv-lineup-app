class ShowsController < ApplicationController

  def index
    user = User.find(params[:id])
    shows = user.shows
    render json: shows
  end


  def create
    @user = User.find(1)
    if params[:network] == nil
      network = params[:webChannel][:name]
    else
      network = params[:network][:name]
    end

    show = Show.find_or_create_by(
          id: params[:id],
          title: params[:name],
          summary: params[:summary],
          img: params[:image][:original],
          genre: params[:genres].join(", "),
          network: network,
          air_day: params[:schedule][:days][0],
          air_time: params[:schedule][:time],
          url: params[:officialSite],
          rating: params[:rating][:average],
          status: params[:status]
        )
    show.users << @user

    render json: @user.shows
  end


  def search
    search = params[:search]
    response = RestClient::Request.execute(
      method: :get,
      url: "http://api.tvmaze.com/search/shows?q=#{search}",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    )
    results = JSON.parse(response)
    render json: results
  end


  def fetch_suggested
    id = params[:id]
    response = RestClient::Request.execute(
      method: :get,
      url: "http://api.tvmaze.com/lookup/shows?thetvdb=#{id}",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    )
    results = JSON.parse(response)
    render json: results
  end


  def fetch_premieres
    date = params[:date]
    url = "https://api.trakt.tv/calendars/all/shows/premieres/#{date}/7?extended=full"
    response = RestClient::Request.execute(
      method: :get,
      url: url,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'trakt-api-version': '2',
        'trakt-api-key': '8de248cf5d4040db92f61ab373123612d998328b4d63540b45991fce09e88d64'
      }
    )
    results = JSON.parse(response)
    render json: results, status: 200
  end


  def fetch_trending
    url = "https://api.trakt.tv/shows/trending?extended=full"
    response = RestClient::Request.execute(
      method: :get,
      url: url,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'trakt-api-version': '2',
        'trakt-api-key': '8de248cf5d4040db92f61ab373123612d998328b4d63540b45991fce09e88d64'
      }
    )
    results = JSON.parse(response)
    render json: results, status: 200
  end


  def fetch_watching
    period = params[:period]
    url = "https://api.trakt.tv/shows/watched/#{period}?extended=full"
    response = RestClient::Request.execute(
      method: :get,
      url: url,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'trakt-api-version': '2',
        'trakt-api-key': '8de248cf5d4040db92f61ab373123612d998328b4d63540b45991fce09e88d64'
      }
    )
    results = JSON.parse(response)
    render json: results, status: 200
  end


  def destroy
    show = Show.find(params[:_json])
    show.destroy
    render json: User.first.shows
  end


  def recommended
    show = params[:_json]
    url = "https://api.trakt.tv/shows/#{show}/related?extended=full"
    response = RestClient::Request.execute(
      method: :get,
      url: url,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'trakt-api-version': '2',
        'trakt-api-key': '8de248cf5d4040db92f61ab373123612d998328b4d63540b45991fce09e88d64'
      }
    )
    results = JSON.parse(response)
    render json: results, status: 200
  end


end
