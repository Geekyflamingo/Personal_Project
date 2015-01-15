class AuthenticationController < ApplicationController

  def create
    user = User.find_by_email(params[:email])

    respond_to do |format|
      if user && user.authenticate(params[:password])
        session[:user_id] = user.id
        format.html do
          redirect_to dashboard_path
        end
        format.js do
          render json: {redirect: dashboard_path}
        end
      else
        @sign_in_error = "Username / password combination is invalid"
        format.html do
          render :"pages/index"
        end
        format.js do
          render json: {error: @sign_in_error}
        end
      end
    end
  end

  def destroy
    session.clear
    redirect_to root_path
  end

end
