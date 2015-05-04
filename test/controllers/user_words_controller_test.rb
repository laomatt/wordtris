require 'test_helper'

class UserWordsControllerTest < ActionController::TestCase
  setup do
    @user_word = user_words(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:user_words)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create user_word" do
    assert_difference('UserWord.count') do
      post :create, user_word: {  }
    end

    assert_redirected_to user_word_path(assigns(:user_word))
  end

  test "should show user_word" do
    get :show, id: @user_word
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @user_word
    assert_response :success
  end

  test "should update user_word" do
    patch :update, id: @user_word, user_word: {  }
    assert_redirected_to user_word_path(assigns(:user_word))
  end

  test "should destroy user_word" do
    assert_difference('UserWord.count', -1) do
      delete :destroy, id: @user_word
    end

    assert_redirected_to user_words_path
  end
end
