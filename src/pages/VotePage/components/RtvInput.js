import React, { useContext, useEffect } from 'react';
import VoteContext from '../../../context/VoteContext';
import { MAPPINGS } from '../../../backend/mock-server-calls';
import { voteSetRtv } from '../../../reducers/voteReducer';

const RtvInput = ({ autoPopulate = '' }) => {

  const { rtv, voteDispatch } = useContext(VoteContext);

  useEffect(() => {
    voteDispatch(voteSetRtv(autoPopulate !== '' ? getMappedRtv(autoPopulate) : ''));
  }, [autoPopulate, voteDispatch]);

  const getMappedRtv = (issue) => {
    return MAPPINGS.find((mapped) => mapped.issue === issue).rtv;
  };

  return (
    <div>
      <label>Paste your GovernMint issued Voting Right here!</label><br />
      <textarea
        value={rtv}
        onChange={(e) => voteDispatch(voteSetRtv(e.target.value))}
      ></textarea>
      <br />
    </div>
  );
};

export default RtvInput;