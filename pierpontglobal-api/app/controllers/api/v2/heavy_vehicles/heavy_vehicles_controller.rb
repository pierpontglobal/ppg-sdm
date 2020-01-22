
module Api
  module V2
    module HeavyVehicles
      class HeavyVehiclesController < ApplicationController

        def show
          ScrapHeavyVehicles.perform_at(1.hour.from_now)
          render json: {
              message: "Worker started!"
          }, :status => :ok
        end

        def show_by
          if params[:vehicle_id].present?
            vehicle = ::HeavyVehicle.find(params[:vehicle_id])
            if vehicle.present?
              render json: {
                  vehicle: vehicle.sanitized_with_user(current_user)
              }, :status => :ok
            else
              render json: {
                  message: "Couldn't find a vehicle with id: #{params[:vehicle_id]}"
              }
            end
          else
            render json: {
                message: "Please, provide a vehicle id"
            }, :status => :bad_request
          end
        end

        def query
          search_text = query_params[:search_text].present? ? query_params[:search_text] : "*"
          type_id = params[:type_id].to_i ||= -1
          category_id = params[:category_id].to_i ||= -1

          where_query = {}
          where_query[:type_id] = type_id if type_id != -1
          where_query[:category_id] = category_id if category_id != -1

          vehicles = ::HeavyVehicle.search(search_text,
                                           where: where_query,
                                           page: query_params[:page].to_i,
                                           per_page: query_params[:page_size].to_i)

          render json: {
              total_vehicles: vehicles.total_count,
              vehicles: vehicles.map { |v| v.sanitized_with_user(current_user) }
          }, :status => :ok
        end

        def reindex
          ::HeavyVehicle.reindex
        end

        def add_to_user
          if params[:vehicle_id].present?
            vehicle = :: HeavyVehicle.find(params[:vehicle_id])
            quantity = params[:quantity] ||= 1
            if vehicle.present?
              user_heavy_vehicle = ::UserHeavyVehicle.find_by(user_id: current_user[:id], heavy_vehicle_id: vehicle[:id])
              if user_heavy_vehicle.present?
                user_heavy_vehicle.update!(quantity: user_heavy_vehicle[:quantity] + 1)
              else
                ::UserHeavyVehicle.create!(user_id: current_user[:id], heavy_vehicle_id: vehicle[:id], quantity: quantity)
              end

              render json: {
                  vehicle: vehicle
              }, :status => :ok
            else
              render json: {
                  message: "Couldn't find a vehicle with id: #{params[:vehicle_id]}"
              }, :status => 500
            end
          else
            render json: {
                message: "Please, provide a vehicle id"
            }, :status => :bad_request
          end
        end

        def remove_from_user
          if params[:vehicle_id].present?
            vehicle = :: HeavyVehicle.find(params[:vehicle_id])
            if vehicle.present?
              user_heavy_vehicle = ::UserHeavyVehicle.find_by(user_id: current_user[:id], heavy_vehicle_id: vehicle[:id])
              if user_heavy_vehicle.present?
                if user_heavy_vehicle[:quantity] > 1
                  user_heavy_vehicle.update!(quantity: user_heavy_vehicle[:quantity] - 1)
                else
                  user_heavy_vehicle.destroy!
                end
                render json: {
                    vehicle: vehicle
                }, :status => :ok
              else
                render json: {
                    message: "It seems this user does not have a vehicle with id: #{vehicle[:id]} associated."
                }, :status => :bad_gateway
              end
            else
              render json: {
                  message: "Couldn't find a vehicle with id: #{params[:vehicle_id]}"
              }, :status => 500
            end
          else
            render json: {
                message: "Please, provide a vehicle id"
            }, :status => :bad_request
          end
        end

        def remove_all_from_user
          if params[:vehicle_id].present?
            vehicle = :: HeavyVehicle.find(params[:vehicle_id])
            if vehicle.present?
              user_heavy_vehicle = ::UserHeavyVehicle.find_by(user_id: current_user[:id], heavy_vehicle_id: vehicle[:id])
              if user_heavy_vehicle.present?
                user_heavy_vehicle.destroy!
                render json: {
                    vehicle: vehicle
                }, :status => :ok
              else
                render json: {
                    message: "It seems this user does not have a vehicle with id: #{vehicle[:id]} associated."
                }, :status => :bad_gateway
              end
            else
              render json: {
                  message: "Couldn't find a vehicle with id: #{params[:vehicle_id]}"
              }, :status => 500
            end
          else
            render json: {
                message: "Please, provide a vehicle id"
            }, :status => :bad_request
          end
        end

        def make_request
          if params[:vehicle_id].present?
            vehicle = ::HeavyVehicle.find(params[:vehicle_id])
            quantity = params[:quantity] ||= 1
            if vehicle.present?
              request = ::HeavyVehicleRequest.create!(user_id: current_user[:id], heavy_vehicle_id: vehicle[:id], quantity: quantity, status: "new")
              render json: {
                  vehicle: vehicle,
                  request: request
              }
            else
              render json: {
                  message: "Couldn't find a vehicle with id: #{params[:id]}"
              }
            end
          else
            render json: {
                message: "Please, provide a vehicle id"
            }, :status => :bad_request
          end
        end

        def user_cart
          user_vehicles = ::UserHeavyVehicle.where(:user_id => current_user[:id])
          render json: {
              vehicles: user_vehicles.map { |obj| obj.sanitized_with_user(current_user) }
          }, :status => :ok
        end

        def request_cart
          user_vehicles = ::UserHeavyVehicle.where(:user_id => current_user[:id])
          user_vehicles.each do |obj|
            ::HeavyVehicleRequest.create!(user_id: obj[:user_id], heavy_vehicle_id: obj[:heavy_vehicle_id], status: "new", quantity: obj[:quantity])
          end
          user_vehicles.destroy_all
          render json: {
              vehicles: ::UserHeavyVehicle.where(user_id: current_user[:id])
          }, :status => :ok
        end


        private

        def query_params
          params.permit(:page, :page_size, :type, :category, :sub_category, :search_text)
        end

      end
    end
  end
end
