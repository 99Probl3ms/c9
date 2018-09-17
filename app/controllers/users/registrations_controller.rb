class Users::RegistrationsController < Devise::RegistrationsController
  def Create
    super do |resource|
      if params[:plan]
        resource.plan_id = params[:plan];
        if resource.plan == 2
          resource.save_with_subscription
        else
          resource.save
        end
      end
    end
  end
end