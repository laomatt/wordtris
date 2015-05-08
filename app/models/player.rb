class Player < ActiveRecord::Base
  has_many :user_words
  has_many :sentences
  has_many :games
  has_many :votes
end
