import React, { useReducer } from 'react';
import ReceiptContext from '../../context/ReceiptContext';
import VoteForm from './components/VoteForm';
import receiptReducer from '../../reducers/receipt';
import Receipt from './components/Receipt';

const VotePage = () => {

  const [state, receiptDispatch] = useReducer(receiptReducer, {
    receipt: {},
    voteSubmitted: false
  });

  return (
    <ReceiptContext.Provider value={{ receiptDispatch }}>
      {!state.voteSubmitted ? (
        <VoteForm />
      ) : (
        <Receipt {...state.receipt} />
      )}
    </ReceiptContext.Provider>
  );
};

export default VotePage;