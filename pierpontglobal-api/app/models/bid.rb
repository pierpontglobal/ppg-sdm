# frozen_string_literal: true

# Bid model description
class Bid < ApplicationRecord
  belongs_to :user
  belongs_to :bid_collector

  after_create :modify_bid_collector
  after_update :modify_bid_collector
  after_destroy :modify_bid_collector

  after_create :update_funds

  scope :attach_vehicle_info, lambda {
    select('amount', 'id', 'status', 'success', 'bid_collectors.car_id', 'vin', 'year', 'trim', 'step', 'bid_collectors.id AS bid_collector_id',
           '(select array_agg(file_directions.route) as routes from file_directions where file_directions.car_id = bid_collectors.car_id) AS car_images')
      .joins('INNER JOIN bid_collectors ON bid_collectors.id = bid_collector_id')
      .joins('INNER JOIN cars ON cars.id = bid_collectors.car_id')
      .joins('INNER JOIN models ON models.id = model_id').merge(Model.sanitized)
      .joins('INNER JOIN sale_informations ON bid_collectors.car_id = sale_informations.car_id').merge(SaleInformation.sanitize)
  }

  scope :sanitized, lambda {
    select('bids.id as bid_id', 'amount', 'user_id', 'bid_collector_id', 'status', 'success')
      .joins('INNER JOIN bid_collectors ON bid_collectors.id = bid_collector_id')
      .joins('INNER JOIN cars ON cars.id = bid_collectors.car_id').merge(Car.sanitized_referenced)
  }

  def create_structure
    {
      bid_details: self,
      user: user,
      car_details: Car.where(id: bid_collector.car.id).sanitized.first.create_structure
    }
  end

  def modify_bid_collector
    bid_collector.inspect_attributes
    ::BidCollector.notify_change(bid_collector)
  end

  def amount_fraction
    (amount * 10 / 100)
  end

  def update_funds
    balance = user.fund.total
    holdings = user.fund.holdings

    Fund.create!(
      payment: nil,
      balance: balance,
      amount: 0,
      credit: false,
      holding: holdings + amount_fraction,
      user: user,
      source_id: "On going bid: #{bid_collector.id}"
    )
  end
end
