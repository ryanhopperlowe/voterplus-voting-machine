import React from 'react';
import { Centered } from '../../../baseui/style-formats';
import { Card, StyledBody } from 'baseui/card';
import { ListItem, ListItemLabel } from 'baseui/list';
import { FormControl } from 'baseui/form-control';
import { Textarea } from 'baseui/textarea';

const Receipt = ({ issue, selection, receiptNo }) => (
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
        </ul>
      </StyledBody>
    </Card>
  </Centered>
);

export default Receipt;