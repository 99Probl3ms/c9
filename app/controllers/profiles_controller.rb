class ProfilesController < ApplicationController
  
  
  def new
    # render new profile form
    
    @profile = Profile.new
  end
  # POST to /users/:user_id/profile
  def create
    # Ensure that we have the user who is filling out form
    @User = User.find( params[:user_id])
     # Create profile linked to this specific user
    @Profile = @User.build_profile( profile_params )
    if @Profile.save
      flash[:success] = "Profile Updated!"
      redirect_to user_path(params[:user_id]) 
    else
      render action: :new
    end
  end
  
  
  # get request to /users/:user_id/profile/edit
  def edit
    @user = User.find(params[:user_id])
    @profile = @user.profile
  end
  
  private
  def profile_params
    params.require(:profile).permit(:first_name, :last_name, :avatar, :job_title, :phone_number, :contact_email, :description)
  end
end