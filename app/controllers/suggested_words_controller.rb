class SuggestedWordsController < ApplicationController
  def create
    p 't'*90
    p params
    sw = SuggestedWord.create(name:params[:word], player_id:params[:player_id].to_i)
    render :json => sw
  end
end
