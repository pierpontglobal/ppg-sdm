class CreateHeavyVehicleCategories < ActiveRecord::Migration[5.2]
  def change
    create_table :heavy_vehicle_categories do |t|
      t.string :name
      t.timestamps
    end
  end
end
