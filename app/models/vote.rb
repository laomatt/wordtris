class Vote < ActiveRecord::Base
  belongs_to :sentence
  belongs_to :player
end
