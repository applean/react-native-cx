class Day < ActiveRecord::Base
  has_many :topics
  has_many :rooms
end
