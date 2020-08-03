class UsersController < ApplicationController
    def index
        users=User.all

        render :json => users.to_json(:include => {:rooms => {:include=> :likes}})

    end

    def new
    
    end

    def create
    user=User.create(user_params)
    render json: user
    end

    def destroy
    
    end

    def show
        user=User.find(params[:id])
        render json: user, include:[:rooms, :likes]
    end

    def update
        user=User.find(params[:id])
        user.update(user_params)
        render json: user.to_json(:include => {:rooms => {:include=> :likes}})
    end

    private 
    def user_params
        params.require(:user).permit(:name, :username, :email, :password, :image_url)
    end

end
