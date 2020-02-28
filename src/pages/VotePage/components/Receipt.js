import React, { useState } from 'react';
import { Centered } from '../../../baseui/style-formats';
import { Card, StyledBody } from 'baseui/card';
import { ListItem, ListItemLabel } from 'baseui/list';
import { FormControl } from 'baseui/form-control';
import { Textarea } from 'baseui/textarea';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Notification, KIND } from 'baseui/notification';
import { Button } from 'baseui/button';

const Receipt = ({ issue, selection, receiptNo }) => {
  const [notify, setNotify] = useState('');

  return (
    <Centered>
      <Card>
        <StyledBody>
          <h2>Your vote was successfully counted</h2>
          <ul>
            <ListItem
              endEnhancer={() => issue}
            >
              <ListItemLabel>Issue</ListItemLabel>
            </ListItem>
            <ListItem
              endEnhancer={() => selection}
            >
              <ListItemLabel>Selection</ListItemLabel>
            </ListItem>
            <FormControl 
              label={() => "Receipt Number"}
            >
              <Textarea
                disabled
                value={receiptNo}
              />
            </FormControl>
            {!notify && (
              <CopyToClipboard
                text={receiptNo}
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