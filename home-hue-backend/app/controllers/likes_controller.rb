class LikesController < ApplicationController
    def index
    likes=Like.all
    render json: likes
    end

    def create
        like=Like.create(like_params)
        render json: like
    end

    def destroy
        like=Like.find(params[:id])
        like.destroy
        render json: "like deleted"
    end

    private

    def like_params
        params.require(:like).permit(:user_id, :room_id)
    end
end
