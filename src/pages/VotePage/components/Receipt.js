import React, { useState, useEffect } from 'react';
import { Centered } from '../../../baseui/style-formats';
import { Card, StyledBody } from 'baseui/card';
import { ListItem, ListItemLabel } from 'baseui/list';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Notification, KIND } from 'baseui/notification';
import { Button } from 'baseui/button';

const Receipt = ({ receipt }) => {
  const [notify, setNotify] = useState('');

  const display = [
    { key: 'issue', title: 'Issue' },
    { key: 'choice', title: 'Selection' },
    { key: 'receiptNum', title: 'Receipt Number' },
    { key: 'voteGuid', title: 'Vote ID' },
    { key: 'timeStamp', title: 'Time Stamp' },
    { key: 'vm', title: 'VM ID' },
    { key: 'rtv', title: 'Voting Right' },
    { key: 'receiptNo', title: 'Receipt Number' }
  ];

  useEffect(() => {
    console.log(receipt);
  }, [receipt]);

  return (
    <Centered>
      <Card>
        <StyledBody>
          <h2>Your vote was successfully counted</h2>
          <ul>
            {display.map(({ key, title }) => !!receipt[key] && (
              <ListItem key={key}
                endEnhancer={() => (receipt[key].toString().length >= 20 ? receipt[key].toString().slice(0, 20) + '...' : receipt[key].toString())}
              >
                <ListItemLabel>{title}</ListItemLabel>
              </ListItem>

            ))}
            
            {!notify && (
              <CopyToClipboard
                text={JSON.stringify(receipt)}
                onCopy={() => setNotify('Receipt copied to clipboard')}
              >
                <Button>Copy to clipboard</Button>
              </CopyToClipboard>
            )}
            {!!notify && (
              <Notification kind={KIND.positive}>
                {notify}
              </Notification>
            )}
          </ul>
        </StyledBody>
      </Card>
    </Centered>
  )
};

export default Receipt;