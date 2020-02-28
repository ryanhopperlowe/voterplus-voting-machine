import React, { useContext, useEffect } from 'react';
import VoteContext from '../../../context/VoteContext';
import { MAPPINGS } from '../../../backend/mock-server-calls';
import { voteSetRtv } from '../../../reducers/voteReducer';
import { FormControl } from 'baseui/form-control';
import { Textarea } from 'baseui/textarea';

const RtvInput = ({ autoPopulate = '' }) => {

  const { rtv, voteDispatch } = useContext(VoteContext);

  useEffect(() => {
    voteDispatch(voteSetRtv(autoPopulate !== '' ? getMappedRtv(autoPopulate) : ''));
  }, [autoPopulate, voteDispatch]);

  const getMappedRtv = (issue) => {
    let mappings = MAPPINGS.find((mapped) => mapped.issue === issue).rtv;
    return mappings;
  };

  return (
    <FormControl
      label={() => "Paste your GovernMint issued voting right here:"}
    >
      <Textarea 
        value={rtv}
        onChange={(e) => voteDispatch(voteSetRtv(e.target.value))}
      />
    </FormControl>
  );
};

export default RtvInput;