import React from 'react';
import FormInput from './FormInput/FormInput';
import { injectIntl } from 'react-intl';

function ProfileForm({
  editable, name,
  onNameChange, address,
  onAddressChange, email,
  onEmailChange, phone, onPhoneChange,
  intl
}) {

  const labels = {
    accountName: intl.formatMessage({ id: 'profile.settings.account-name' }),
    address: intl.formatMessage({ id: 'profile.settings.address' }),
    email: intl.formatMessage({ id: 'profile.settings.email' }),
    phone: intl.formatMessage({ id: 'profile.settings.phone' }),
  };

  return (
    <div className="flex-column">
      <FormInput
        label={labels.accountName}
        value={name}
        onChange={onNameChange}
        editable={editable}
        id="name"
      />
      <FormInput
        label={labels.address}
        value={address}
        onChange={onAddressChange}
        editable={editable}
        id="address"
      />
      <FormInput
        label={labels.email}
        value={email}
        onChange={onEmailChange}
        editable={editable}
        id="email"
      />
      <FormInput
        label={labels.phone}
        value={phone}
        onChange={onPhoneChange}
        editable={editable}
        id="phone"
      />
    </div>
  );
}

export default injectIntl(ProfileForm);
