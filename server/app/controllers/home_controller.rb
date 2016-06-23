class HomeController < ApplicationController
  def index
    @days = Day.all
    @rooms = Room.all
  end
end
