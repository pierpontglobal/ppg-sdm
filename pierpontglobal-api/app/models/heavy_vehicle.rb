class HeavyVehicle < ApplicationRecord
  searchkick word_middle: [:heavy_vehicle_identifier],
             callbacks: :async

  def search_data
    {
        heavy_vehicle_identifier: "#{title} #{location} #{equipment_id}",
        fielddata: true,
        type_id: type_id,
        category_id: category_id
    }
  end

  has_many :user_heavy_vehicles
  has_many :users, through: :user_heavy_vehicles

  def sanitized
    price_percentage_config = ::GeneralConfiguration.find_by(:key => 'heavy_vehicle_price_percentage')
    increase_price_percentage = price_percentage_config[:value].to_f
    {
        id: id,
        title: title,
        main_image: main_image,
        images: HeavyVehicleImage.where(heavy_vehicle_id: id),
        location: location,
        price: price * (1 + increase_price_percentage),
        equipment_id: equipment_id,
        description: description,
        serial: serial,
        condition: condition,
        type: type_id.present? ? ::HeavyVehicleType.find(type_id) : nil,
        requested: HeavyVehicleRequest.find_by(user_id: id, status: "open"),
        added_to_cart: UserHeavyVehicle.find_by(user_id: current_user[:id], heavy_vehicle_id: id),
        manufacturer: manufacturer_id.present? ? ::HeavyVehicleManufacturer.find(manufacturer_id) : nil,
        class_code: class_code,
        year: year,
        meter: meter,
        category: category_id.present? ? ::HeavyVehicleCategory.find(category_id) : nil,
    }
  end

  def sanitized_with_user(user)
    price_percentage_config = ::GeneralConfiguration.find_by(:key => 'heavy_vehicle_price_percentage')
    increase_price_percentage = price_percentage_config[:value].to_f
    {
        id: id,
        title: title,
        main_image: main_image,
        images: HeavyVehicleImage.where(heavy_vehicle_id: id),
        location: location,
        price: price * (1 + increase_price_percentage),
        equipment_id: equipment_id,
        description: description,
        serial: serial,
        condition: condition,
        type: type_id.present? ? ::HeavyVehicleType.find(type_id) : nil,
        requested: HeavyVehicleRequest.find_by(id: id, status: "open"),
        added_to_cart: UserHeavyVehicle.find_by(user_id: user[:id], heavy_vehicle_id: id),
        manufacturer: manufacturer_id.present? ? ::HeavyVehicleManufacturer.find(manufacturer_id) : nil,
        class_code: class_code,
        year: year,
        meter: meter,
        category: category_id.present? ? ::HeavyVehicleCategory.find(category_id) : nil,
    }
  end

end
