class UsersController < ApplicationController
# GET to /users/[plan_id]
  def show
    @user = User.find(params[:id])
  end
end