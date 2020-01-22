# frozen_string_literal: true

require 'net/http'
require 'uri'
require 'json'
require 'set'
require 'sidekiq-scheduler'

class PullCarsJob
  include Sidekiq::Worker
  sidekiq_options queue: 'default'

  def perform(*_args)
    # register_worker(obtain_token)

    from_year = 2014 # TODO: This has to be modifiable
    limit_amount = 1000 # TODO: This has to be modifiable

    locations = Location.all
    years = pull_years_id(from_year)
    structures = []
    threads = []

    release_number = GeneralConfiguration.find('pull_release').value

    locations.each do |location|
      years.each do |year|
        threads << Thread.new { structures << pull_amount(year, location.mh_id, limit_amount, release_number) }
        sleep 1
      end
    end

    threads.each(&:join)

    # Bigger waiting time
    bigger = 0
    structures.each do |task|
      (0..task[:divisor] - 1).each do |i|
        task[:index] = (i + 1)
        bigger = bigger < (5 * i) ? (5 * i) : bigger
        PullFromLocationJob.perform_at((5 * i).minutes, JSON.parse(task.to_json))
      end
    end

    GeneralConfiguration.find('pull_release').update!(value: release_number.to_i + 1)
  end

  def pull_amount(year, location, limit_amount, release_number)

    structure = {
      amount: 0,
      year: year,
      location: location,
      index: 1,
      chunks_size: 1,
      divisor: 1
    }

    url = URI("https://api.manheim.com/isws-basic/listings?api_key=#{ENV['MANHEIM_API_KEY']}")

    request = Net::HTTP::Post.new(url)
    request['Content-Type'] = 'application/x-www-form-urlencoded'
    request.body = "pageSize=0&YEAR=#{year}&LOCATION=#{location}"

    response = Net::HTTP.start(url.host, url.port,
                               use_ssl: url.scheme == 'https') do |http|
      http.request(request)
    end

    result = JSON.parse(response.body)

    structure[:amount] = result['totalListings']
    structure[:divisor] = (structure[:amount] / limit_amount) + 1
    structure[:chunks_size] = structure[:amount] / structure[:divisor]
    structure[:release_number] = release_number

    structure
  end

  def pull_years_id(from)
    url = URI.parse("https://api.manheim.com/isws-basic/parameters/YEAR?api_key=#{ENV['MANHEIM_API_KEY']}")
    req = Net::HTTP::Get.new(url.to_s)
    res = Net::HTTP.start(url.host, url.port,
                          use_ssl: url.scheme == 'https') do |http|
      http.request(req)
    end
    years = []
    JSON.parse(res.body)['parameterValues'].each do |year_data|
      years << year_data['id'] if year_data['name'].to_i >= from
    end
    years
  end
end