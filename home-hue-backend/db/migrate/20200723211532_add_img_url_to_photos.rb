class AddImgUrlToPhotos < ActiveRecord::Migration[6.0]
  def change
    add_column :photos, :img_url, :string
  end
end
