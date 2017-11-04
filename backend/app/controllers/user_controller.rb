class UserController < ApplicationController
  ERROR_MESSAGE = 'JWT is incorrect'

  def show
    user = Services::UserByJWT.new(params[:jwt]).call

    response = user ? { jwt: user.jwt, username: user.username } : { error: ERROR_MESSAGE }
    status = user ? 200 : 422

    render json: response, status: status
  end
end
