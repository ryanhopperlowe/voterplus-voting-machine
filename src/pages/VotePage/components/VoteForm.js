import React, { useState, useContext, useEffect, useReducer } from 'react';
import ReceiptContext from '../../../context/ReceiptContext';
import VoteContext from '../../../context/VoteContext';
// import { sendVoteSubmission } from '../../../backend/mock-server-calls';
import { rSetReceipt } from '../../../reducers/receipt';
import ErrorBox from '../../../components/ErrorBox';
import voteReducer from '../../../reducers/voteReducer';
import IssuesSelect from './IssuesSelect';
import VoteOptions from './VoteOptions';
import RtvInput from './RtvInput';
import { sendVoteSubmission } from '../../../backend/api';

const VoteForm = () => {
  const { receiptDispatch } = useContext(ReceiptContext);

  const [vote, voteDispatch] = useReducer(voteReducer, {
    issue: '',
    selection: '',
    rtv: ''
  });

  const [error, setError] = useState('');
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    if (vote.issue !== '' && vote.selection !== '' && vote.rtv !== '') {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [vote.issue, vote.selection, vote.rtv])

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (!formValid) {
      setError('Form not yet valid');
      return false;
    }

    sendVoteSubmission(vote.issue, vote.selection, vote.rtv)
    .then(({ message, receipt }) => {
      console.log(message);
      receiptDispatch(rSetReceipt(receipt));
    })
    .catch(err => {
      setError(err.message);
    });

    return true;
  };
  
  return (
    <VoteContext.Provider value={{ ...vote, voteDispatch }}>
      <form onSubmit={onFormSubmit}>
        <IssuesSelect />

        <VoteOptions />
        
        <RtvInput autoPopulate={vote.issue} />
        
        <button>Submit</button>
      
      </form>

      <ErrorBox error={error} />
    </VoteContext.Provider>
  );
};

export default VoteForm;