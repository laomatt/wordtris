class SentencesController < ApplicationController

  def create
    sentence = Sentence.create(player_id: params[:player_id] , content: params[:content] )
    render :json => Player.find(params[:player_id]).sentences
  end

def index
    player = Player.find(params[:player_id])
    render :json => player.sentences
end

def list_all_sentences
  render :json => Sentence.all
end

  def destroy

  end

  private

  def sentence_params
    # player_id: params, content: string

  end
end
