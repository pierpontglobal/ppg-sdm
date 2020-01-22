import React from 'react';
import { notification, Icon } from 'antd';

const openNotification = (title, description, success) => {
  notification.open({
    message: title,
    description: description,
    icon: <Icon type={success ? 'check-circle' : 'warning'} style={{ color: success ? '#0bbc34' : '#bc1c0a' }} />,
    duration: 3
  });
};

const withClientNotifier = (WrappedComponent) => {
  return class Wrapped extends React.Component {
    render() {
      return (
        <WrappedComponent 
          {...this.props} 
          openNotification={(notification) => 
            openNotification(notification.title, notification.description, notification.success)}
        />
      );
    }
  }
}

export default withClientNotifier;