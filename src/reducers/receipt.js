
const receiptReducer = (state, action) => {
  switch (action.type) {
    case 'VOTE_SUBMIT':
      return {
        ...state,
        receipt: action.receipt,
        voteSubmitted: true
      };
    
    default:
      return state;
  }
};

export default receiptReducer;

export const rSetReceipt = ({ issue, selection, receiptNo }) => ({
  type: 'VOTE_SUBMIT',
  receipt: {
    issue,
    selection,
    receiptNo
  }
});