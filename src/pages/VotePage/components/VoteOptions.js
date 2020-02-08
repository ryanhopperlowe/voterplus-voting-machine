import React, { useContext, useState, useEffect } from 'react';
import VoteContext from '../../../context/VoteContext';
import { getRelevantOptions } from '../../../backend/mock-server-calls';
import { voteSetSelection } from '../../../reducers/voteReducer';

const VoteOptions = () => {

  const { issue, selection, voteDispatch } = useContext(VoteContext);

  const [options, setOptions] = useState([]);

  useEffect(() => {
    voteDispatch(voteSetSelection(''));

    if (issue !== '') {
      getRelevantOptions(issue)
      .then((response) => {
        setOptions(response.options)
      });
    } else {
      setOptions([]);
    }
  }, [issue, voteDispatch])

  return options.length > 0 && (
    <div>
      <label>Select Option for {issue}</label><br />
      {options.map((opt) => (
        <div key={opt}>
          <input 
            name="selection"
            type="radio"
            checked={selection === opt}
            value={opt}
            required
            onChange={(e) => voteDispatch(voteSetSelection(e.target.value))}
          />
          {opt}
        </div>
      ))}
    </div>
  );
};

export default VoteOptions;