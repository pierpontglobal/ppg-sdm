class CreateColors < ActiveRecord::Migration[5.2]
  def change
    create_table :colors do |t|
      t.string :name
      t.string :hex

      t.timestamps
    end
  end
end
