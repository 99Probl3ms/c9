class ProfilesController < ApplicationController
  
  
  def new
    # render new profile form
    @profile = Profile.new
  end
end