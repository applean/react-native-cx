require "rails_helper"

RSpec.describe DaysController, type: :routing do
  describe "routing" do

    it "routes to #index" do
      expect(:get => "/days").to route_to("days#index")
    end

    it "routes to #new" do
      expect(:get => "/days/new").to route_to("days#new")
    end

    it "routes to #show" do
      expect(:get => "/days/1").to route_to("days#show", :id => "1")
    end

    it "routes to #edit" do
      expect(:get => "/days/1/edit").to route_to("days#edit", :id => "1")
    end

    it "routes to #create" do
      expect(:post => "/days").to route_to("days#create")
    end

    it "routes to #update via PUT" do
      expect(:put => "/days/1").to route_to("days#update", :id => "1")
    end

    it "routes to #update via PATCH" do
      expect(:patch => "/days/1").to route_to("days#update", :id => "1")
    end

    it "routes to #destroy" do
      expect(:delete => "/days/1").to route_to("days#destroy", :id => "1")
    end

  end
end
