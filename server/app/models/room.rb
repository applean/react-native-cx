class Room < ActiveRecord::Base
  belongs_to :day
  has_many :topics
end
