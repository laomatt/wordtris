class CreateVotesTable < ActiveRecord::Migration
  def change
    create_table :votes_tables do |t|
      t.references :sentence
      t.references :player
    end
  end
end
