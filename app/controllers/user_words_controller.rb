class UserWordsController < ApplicationController
  before_action :set_user_word, only: [:show, :edit, :update, :destroy]

  # GET /user_words
  # GET /user_words.json
  def index
    @user_words = UserWord.all
  end

  # GET /user_words/1
  # GET /user_words/1.json
  def show
  end

  # GET /user_words/new
  def new
    @user_word = UserWord.new
  end

  # GET /user_words/1/edit
  def edit
  end

  # POST /user_words
  # POST /user_words.json
  def create
    @user_word = UserWord.new(user_word_params)

    respond_to do |format|
      if @user_word.save
        format.html { redirect_to @user_word, notice: 'User word was successfully created.' }
        format.json { render :show, status: :created, location: @user_word }
      else
        format.html { render :new }
        format.json { render json: @user_word.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /user_words/1
  # PATCH/PUT /user_words/1.json
  def update
    respond_to do |format|
      if @user_word.update(user_word_params)
        format.html { redirect_to @user_word, notice: 'User word was successfully updated.' }
        format.json { render :show, status: :ok, location: @user_word }
      else
        format.html { render :edit }
        format.json { render json: @user_word.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /user_words/1
  # DELETE /user_words/1.json
  def destroy
    @user_word.destroy
    respond_to do |format|
      format.html { redirect_to user_words_url, notice: 'User word was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user_word
      @user_word = UserWord.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def user_word_params
      params[:user_word]
    end
end
