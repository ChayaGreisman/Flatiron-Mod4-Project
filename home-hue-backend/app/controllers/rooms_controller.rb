class RoomsController < ApplicationController

    def index
        rooms=Room.all
        render json: rooms, include:[:likes, :comments, :photos, :user]
    end

    def create
        room = Room.create(room_params)
        render json: room, include:[:likes, :comments, :photos, :user]
    end

    def destroy
        room=Room.find(params[:id])
        room.likes.each{|like| like.destroy}
        room.photos.each{|photo| photo.destroy}
        room.destroy
        render json: room
    end

    private

    def room_params
        params.require(:room).permit(:user_id, :name, :description, :img_url, :pvt)
    end

end
