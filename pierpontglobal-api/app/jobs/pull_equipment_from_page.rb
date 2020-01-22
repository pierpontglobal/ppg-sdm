# frozen_string_literal: true
require 'sidekiq-scheduler'

class PullEquipmentFromPage
  include Sidekiq::Worker
  sidekiq_options queue: 'car_pulling'

  def perform(*args)
    params = args.first
    vehicles = []

    (params["start"]..params["end"]).each do |page|
      vehicles = vehicles | ::HeavyVehiclesWorker.get_for_page(page)
    end

    vehicles.each do |vehicle|
      heavy_vehicle = ::HeavyVehicle.find_by(equipment_id: vehicle[:ur_id])
      if !heavy_vehicle.present?
        created_vehicle = ::HeavyVehicle.create!(
            main_image: vehicle[:main_image],
            title: vehicle[:title],
            location: vehicle[:location],
            price: vehicle[:price],
            equipment_id: vehicle[:ur_id],
            description: vehicle["description"],
            serial: vehicle["serial"],
            class_code: vehicle["class_code"],
            year: vehicle[:year],
            meter: vehicle[:meter]
        )
        add_relations(created_vehicle, vehicle)

      else
        heavy_vehicle.update!(
            main_image: vehicle[:main_image],
            title: vehicle[:title],
            location: vehicle[:location],
            price: vehicle[:price],
            equipment_id: vehicle[:ur_id],
            description: vehicle["description"],
            serial: vehicle["serial"],
            class_code: vehicle["class_code"],
            year: vehicle[:year],
            meter: vehicle[:meter]
        )
        add_relations(heavy_vehicle, vehicle)
      end
    end
  end

  def add_relations(vehicle, info)
    equipment_type = HeavyVehicleType.where("lower(name) = ?", info["equipment_type"].to_s.downcase)[0]
    if !equipment_type.present?
      equipment_type = HeavyVehicleType.create!(name: info["equipment_type"])
    end
    vehicle.type_id = equipment_type[:id]

    manufacturer = HeavyVehicleManufacturer.where("lower(name) = ?", info["manufacturer"].to_s.downcase)[0]
    if !manufacturer.present?
      manufacturer = HeavyVehicleManufacturer.create!(name: info["manufacturer"])
    end
    vehicle.manufacturer_id = manufacturer[:id]

    category = ::HeavyVehicleCategory.where("lower(name) = ?", info["category"].to_s.downcase)[0]
    if !category.present?
      category = ::HeavyVehicleCategory.create!(name: info["category"])
    end
    category[:type_id] = equipment_type[:id]

    images = info["tile-images"]
    images.each do |img|
      ::HeavyVehicleImage.create!(heavy_vehicle_id: vehicle[:id], image: img.gsub("FeaturedThumb", "ItemDetailLarge"))
    end

    category.save!
    vehicle[:category_id] = category[:id]
    vehicle.save!
  end

end
