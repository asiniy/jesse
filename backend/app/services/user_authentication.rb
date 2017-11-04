class Services::UserAuthentication
  attr_reader :username, :password

  def initialize(username, password)
    @username, @password = username, password
  end

  def call()
    user = User.find_by(username: username)
    return false unless user

    user.authenticate(password)
  end
end
