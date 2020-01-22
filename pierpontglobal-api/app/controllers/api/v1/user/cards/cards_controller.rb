# frozen_string_literal: true

require 'stripe'

module Api
  module V1
    module User
      module Cards
        # Handles the users related calls
        class CardsController < Api::V1::UserBaseController
          before_action :stripe_user, except: %i[card_registration coupon]
          skip_before_action :authenticate_user!, only: :coupon

          Stripe.api_key = ENV['STRIPE_KEY']

          def coupon
            coupon = Stripe::Coupon.retrieve(params[:coupon])
            render json: coupon, status: :ok
          rescue StandardError => _e
            render json: { error: 'No coupon with the given identifier' }, status: :not_found
          end

          def append_card
            card = @user_stripe.sources.create(source: params['card_token'])
            NotificationHandler.send_notification('Appended card', "You have added a new card to your account: #{current_user[:email]}. Brand: #{card[:brand]}. Card name: #{card[:name]}", card, current_user[:id])
            render json: { status: 'created' }, status: :created
          rescue StandardError => e
            render json: { status: 'error', message: e }, status: :bad_request
          end

          def card_registration
            customer = Stripe::Customer.create(
              source: params['card_token'],
              email: current_user.email
            )
            current_user.update!(stripe_customer: customer.id)

            st = Stripe::Subscription.create(
              customer: customer.id,
              items: [
                {
                  plan: 'PG_USA_ACCESS'
                }
              ],
              coupon: params['coupon'] || ''
            )
          ensure
            # Create notification for current_user
            NotificationHandler.send_notification('New card', "You have added a new card to your account: #{customer[:email]}", st, current_user[:id])

            render json: { status: 'created' }, status: :created
          end

          def card_sources
            if current_user.stripe_customer
              customer = Stripe::Customer.retrieve(current_user.stripe_customer)
              sources = customer.sources.data
              card_sources = []
              sources.each do |source|
                card_sources << source if source.object == 'card'
              end
              render json: card_sources, status: :ok
            else
              render json: { message: 'No cards registered' }, status: :ok
            end
          end

          def change_default_card_source
            if current_user.stripe_customer
              customer = Stripe::Customer.retrieve(current_user.stripe_customer)
              customer.default_source = params['card_id']
              customer.save
              render json: customer.default_source, status: :ok
            else
              render json: nil, status: :ok
            end
          end

          def default_card_source
            if current_user.stripe_customer
              customer = Stripe::Customer.retrieve(current_user.stripe_customer)
              render json: customer.default_source, status: :ok
            else
              render json: { message: 'No cards registered' }, status: :ok
            end
          end

          def remove_card
            if current_user.stripe_customer
              customer = Stripe::Customer.retrieve(current_user.stripe_customer)

              NotificationHandler.send_notification('Deleted card', "You have removed a card from your account: #{customer[:email]}", customer, current_user[:id])

              render json: customer.sources.retrieve(params['card_id']).delete, status: :ok
            else
              render json: { message: 'No cards registered' }, status: :ok
            end
          end

          private

          def stripe_user
            @user_stripe = Stripe::Customer.retrieve(current_user.stripe_customer)

          rescue Stripe::APIConnectionError => e
            render json: { message: 'Connection with stripe failed', error: e }, status: :service_unavailable

          rescue StandardError => e
            render json: { message: 'Not associated billable identity', error: e }, status: :not_found
            nil # Close request
          end
        end
      end
    end
  end
end
