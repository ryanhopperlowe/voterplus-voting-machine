import React from 'react';
import { Notification, KIND } from 'baseui/notification';

const ErrorBox = ({ error }) => !!error && (
  <Notification kind={KIND.negative}>
    {error}
  </Notification>
);

export default ErrorBox;