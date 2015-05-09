class AddPlayerIdColumnToSuggestedWords < ActiveRecord::Migration
  def change
    add_column :suggested_words, :player_id, :integer
  end
end
