class Topic < ActiveRecord::Base
  belongs_to :day
  belongs_to :room
  serialize :author_avatars, JSON

  default_scope {order(:start_at)}
end
