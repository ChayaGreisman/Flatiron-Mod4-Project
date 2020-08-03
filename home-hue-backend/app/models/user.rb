class User < ApplicationRecord
    has_many :rooms
    has_many :likes
    has_many :comments
end
