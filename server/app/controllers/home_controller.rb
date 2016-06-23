class HomeController < ApplicationController
  def index
    @days = Day.all
  end
end
