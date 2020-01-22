# frozen_string_literal: true

Rails.application.configure do
  # Settings specified here will take precedence over those in config/application.rb.

  # In the development environment your application's code is reloaded on
  # every request. This slows down response time but is perfect for development
  # since you don't have to restart the web server when you make code changes.
  config.cache_classes = false
  Rails.application.routes.default_url_options[:host] = ENV['DB_HOST']

  # Do not eager load code on boot.
  config.eager_load = true

  # Show full error reports.
  config.consider_all_requests_local = true

  # Enable/disable caching. By default caching is disabled.
  # Run rails dev:cache to toggle caching.
  if Rails.root.join('tmp', 'caching-dev.txt').exist?
    config.action_controller.perform_caching = true

    config.cache_store = :memory_store
    config.public_file_server.headers = {
      'Cache-Control' => "public, max-age=#{2.days.to_i}"
    }
  else
    config.action_controller.perform_caching = false

    config.cache_store = :null_store
  end

  # Store uploaded files on the local file system (see config/storage.yml for options)
  config.active_storage.service = :local

  # Don't care if the mailer can't send.
  config.action_mailer.raise_delivery_errors = false

  config.action_mailer.perform_caching = false

  # Raise an error on page load if there are pending migrations.
  config.active_record.migration_error = :page_load

  # Highlight code that triggered database queries in logs.
  config.active_record.verbose_query_logs = true

  # Raises error for missing translations
  # config.action_view.raise_on_missing_translations = true

  # Use an evented file watcher to asynchronously detect changes in source code,
  # routes, locales, etc. This feature depends on the listen gem.
  config.file_watcher = ActiveSupport::EventedFileUpdateChecker
  config.log_level = :info

  unless ENV['SLAVE'] === 'true'
    Minfraud.configure do |c|
      c.license_key = ENV['MAX_MIND_KEY']
      c.user_id = ENV['MAX_MIND_USER']
    end

    Thread.new do
      app_name = 'PierpontglobalApi'

      config.semantic_logger.add_appender(
          index: 'pierpontglobal_api',
          appender: :elasticsearch,
          url: (ENV['ELASTICSEARCH_URL']).to_s
      )
      config.log_tags = {
          ip: :remote_ip
      }
      config.semantic_logger.application = app_name
    end

    ActionMailer::Base.smtp_settings = {
      user_name: 'apikey',
      password: ENV['SENDGRID_API_KEY_SMTP'],
      address: 'smtp.sendgrid.net',
      port: 587,
      authentication: :plain,
      enable_starttls_auto: true
    }
  end
end
