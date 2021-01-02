class CreateTimelines < ActiveRecord::Migration[6.1]
  def change
    create_table :timelines do |t|
      t.string :quotes,             null: false, default: ""
      t.string :author,             null: false, default: ""
      t.integer :user_id

      t.timestamps
    end
    add_index :timelines, :user_id
  end
end
