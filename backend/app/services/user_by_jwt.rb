class Services::UserByJWT
  attr_reader :jwt, :user_id

  def initialize(jwt)
    @jwt = jwt
  end

  def call()
    if get_user_id_from_jwt
      User.find_by(id: user_id)
    end
  end

private

  def get_user_id_from_jwt
    return user_id if user_id

    begin
      decoded = JWT.decode(jwt, nil, false)
      @user_id = decoded[0]["data"]["id"]
    rescue JWT::DecodeError
      @user_id = nil
    end
  end
end
