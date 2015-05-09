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
  output=[]
Sentence.all.each do |sentence|
  output << {id:sentence.id , player_name:Player.find(sentence.player_id).name, vote_count:sentence.votes.count, content:sentence.content}
end
  render :json => output
end

  def destroy

  end

  private

  def sentence_params
    # player_id: params, content: string

  end
end
