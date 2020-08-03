class CreatePhotos < ActiveRecord::Migration[6.0]
  def change
    create_table :photos do |t|
      t.string :color1
      t.string :color2
      t.string :color3
      t.belongs_to :room, null: false, foreign_key: true

      t.timestamps
    end
  end
end
