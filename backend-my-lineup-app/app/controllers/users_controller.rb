class UsersController < ApplicationController

  def create
    user = User.new(username: params[:username], password: params[:password], genres: params[:genres])

    if user.save
      token = encode_token({user_id: user.id})
      render json: {user_id: user.id, jwt: token}
    else
      render json: { message: "Error" }
    end
  end

  def show
    user = User.find(params[:id])
    if user
      render json: user
    else
      render json: { message: "Error" }
    end
  end

end
