import React, { useReducer, useEffect, useState } from 'react';
import ReceiptContext from '../../context/ReceiptContext';
import VoteForm from './components/VoteForm';
import receiptReducer from '../../reducers/receipt';
import Receipt from './components/Receipt';
import { loadKeys } from '../../backend/api';

const VotePage = () => {

  const [state, receiptDispatch] = useReducer(receiptReducer, {
    receipt: {},
    voteSubmitted: false
  });

  const [hasKeys, setHasKeys] = useState(false);

  useEffect(() => {    
    loadKeys()
    .then(() => setHasKeys(true))
    .catch(err => console.error(err));
  }, [])

  return (
    <ReceiptContext.Provider value={{ receiptDispatch }}>
      {hasKeys && (
        !state.voteSubmitted ? (
          <VoteForm />
        ) : (
          <Receipt receipt={state.receipt} />
        )
      )}
    </ReceiptContext.Provider>
  );
};

export default VotePage;