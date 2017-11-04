class SessionsController < ApplicationController
  ERROR_MESSAGE = "Wrong username/password combination"

  def create
    user = Services::UserAuthentication.new(params[:username], params[:password]).call

    response = user ? { jwt: user.jwt, username: user.username } : { error: ERROR_MESSAGE }
    status = user ? 200 : 422

    render json: response, status: status
  end
end
