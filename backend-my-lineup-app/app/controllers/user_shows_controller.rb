class UserShowsController < ApplicationController

  def index
    user = User.find(params[:id])
    user_shows = user.user_shows
    render json: user_shows
  end

  def rate_show
    user = User.find(params[:id])
    user_show = UserShow.find_by(user_id: params[:id], show_id: params[:show_id])
    user_show.rating = params[:rating].to_i
    user_show.save
    render json: user.user_shows
  end

  def destroy
    user_show = UserShow.find_by(user_id: params[:id], show_id: params[:show_id])
    user_show.destroy
    shows = User.find(params[:id]).shows

    render json: shows
  end

end