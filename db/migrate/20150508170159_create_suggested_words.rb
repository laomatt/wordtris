class CreateSuggestedWords < ActiveRecord::Migration
  def change
    create_table :suggested_words do |t|
      t.string :name
      t.string :definition

      t.timestamps null: false
    end
  end
end
