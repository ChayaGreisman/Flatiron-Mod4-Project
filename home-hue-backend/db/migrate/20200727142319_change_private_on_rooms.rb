class ChangePrivateOnRooms < ActiveRecord::Migration[6.0]
  def change
    rename_column :rooms, :private, :pvt
  end
end
