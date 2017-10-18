class ShowsController < ApplicationController

  def search
    search = params[:_json]
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

  def destroy
    show = Show.find(params[:_json])
    show.destroy
    render json: User.first.shows
  end

end
