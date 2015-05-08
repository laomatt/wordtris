class Sentence < ActiveRecord::Base
  belongs_to :player
  has_many :votes
end
