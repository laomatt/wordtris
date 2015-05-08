class CreateSentences < ActiveRecord::Migration
  def change
    create_table :sentences do |t|
      t.references :player
      t.string :content
      t.timestamps null: false
    end
  end
end
