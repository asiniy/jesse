class User < ApplicationRecord
  has_secure_password

  def jwt
    payload = { data: { id: self.id } }
    JWT.encode(payload, nil, 'none')
  end
end
