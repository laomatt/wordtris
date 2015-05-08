class CreateVotes < ActiveRecord::Migration
  def change
    create_table :votes do |t|
      t.references :sentence
      t.references :player
      t.timestamps null: false
    end
  end
end
