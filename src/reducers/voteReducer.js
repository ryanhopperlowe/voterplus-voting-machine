
const voteReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ISSUE':
      return {
        ...state,
        issue: action.issue
      };

    case 'SET_SELECTION':
      return {
        ...state,
        selection: action.selection
      };
    
    case 'SET_RTV':
      return {
        ...state,
        rtv: action.rtv
      }

    default:
      return state
  }
};

export default voteReducer;

export const voteSetIssue = (issue) => ({
  type: 'SET_ISSUE',
  issue
});

export const voteSetSelection = (selection) => ({
  type: 'SET_SELECTION',
  selection
});

export const voteSetRtv = (rtv) => ({
  type: 'SET_RTV',
  rtv
});