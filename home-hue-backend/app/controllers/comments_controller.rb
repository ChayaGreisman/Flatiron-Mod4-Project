class CommentsController < ApplicationController

    def index
    comments=Comment.all
    render json: comments
    end

    def create
        comment = Comment.create(comment_params)
        render json: comment, include: :user
    end

    def update
    comment=Comment.find(params[:id])
    comment.update(comment_params)
    render json: comment
    end

    def destroy
    comment=Comment.find(params[:id])
    comment.destroy
    render json: 'deleted!'
    end

    private
    def comment_params
        params.require(:comment).permit(:text, :user_id, :room_id)
    end
end
