class SessionsController < ApplicationController
  skip_before_action :authorized, only: [:create]

  def show
    render json: {
      id: current_user.id,
      username: current_user.username
    }
  end

  def create
    user = User.find_by(username: params[:username])
    if user && user.authenticate(params[:password])
      payload = {user_id: user.id}
      token = issue_token(payload)
      render json: { jwt: token, user_id: user.id }

    else
      render json: { error: "Incorrect Username or Password"}
    end
  end

end