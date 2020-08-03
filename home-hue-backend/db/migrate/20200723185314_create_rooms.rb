class CreateRooms < ActiveRecord::Migration[6.0]
  def change
    create_table :rooms do |t|
      t.belongs_to :user, null: false, foreign_key: true
      t.string :name
      t.string :description
      t.string :img_url
      t.boolean :private

      t.timestamps
    end
  end
end
