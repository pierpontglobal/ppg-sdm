# frozen_string_literal: true

module NotificationHandler
  def self.send_notification(title, message, payload, receiver_id, type = Notification::INFO_NOTIFICATION, issue_id = nil, lang = "en", actor_id = 1)

    # TODO: "lang" is in english by default. Every request made in the client includes a params named lang. Please in the call
    # for this action, include it and then, based on that, translate the selected text. Need to find an efficient way to handle this on RoR.

    hash_data = {
      message: message,
      title: title,
      payload: payload,
      sent_date: Time.now
    }

    # TODO: (NOT SURE, no time to think) Verify if notification exists before create it, if it does, just update the read_at to nil, if not, create it.
    # If we do this, then, the READ notifications won't be accurate. So I think a better process will be to DELETE read notifications that
    #   has been there for more than one week

    notification = Notification.create!(
      pending: true,
      data: hash_data,
      receiver_id: receiver_id,
      actor_id: actor_id,
      notification_type: type,
      issues_id: issue_id
    )

    user = ::User.find(receiver_id)
    NotificationHandler.push_notification(user, message, title)
    ActionCable.server.broadcast(
      "notification_single_#{receiver_id}",
      hash_data.merge!(notification_id: notification.id, notification_type: type)
    )
  end

  def self.push_notification(user, message, title)
    params = {
      app_id: ENV['ONESIGNAL_APP_ID'],
      headings: { en: title },
      contents: { en: message },
      subtitle: { en: 'Visit the app' },
      include_player_ids: user.subscribers.map(&:one_signal_uuid)
    }
    puts params
    uri = URI.parse('https://onesignal.com/api/v1/notifications')
    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true

    request = Net::HTTP::Post.new(uri.path, 'Content-Type' => 'application/json;charset=utf-8')
    request.body = params.as_json.to_json
    response = http.request(request)
    puts response.body
  end
end
