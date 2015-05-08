class CreateUserWords < ActiveRecord::Migration
  def change
    create_table :user_words do |t|
      t.references :player
      t.string :name
      t.string :definition

      t.timestamps null: false
    end
  end
end
