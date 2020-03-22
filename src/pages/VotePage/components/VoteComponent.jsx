import React, { useReducer, useState, useEffect } from 'react';
import receiptReducer from '../../../reducers/receipt';
import { loadKeys } from '../../../backend/api';
import ReceiptContext from '../../../context/ReceiptContext';
import Receipt from './Receipt';
import VoteForm from './VoteForm';

const VoteComponent = () => {

  const [state, receiptDispatch] = useReducer(receiptReducer, {
    receipt: {},
    voteSubmitted: false
  });

  const [hasKeys, setHasKeys] = useState(false);

  useEffect(() => {    
    loadKeys()
    .then(() => setHasKeys(true))
    .catch(err => console.error(err));
  }, []);

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

export default VoteComponent;