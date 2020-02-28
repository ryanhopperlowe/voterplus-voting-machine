import React, { useContext, useState, useEffect } from 'react';
import VoteContext from '../../../context/VoteContext';
import { voteSetSelection } from '../../../reducers/voteReducer';
import { getRelevantOptions } from '../../../backend/api';
import { RadioGroup, Radio, ALIGN } from "baseui/radio";
import { FormControl } from 'baseui/form-control';

const VoteOptions = () => {

  const { issue, selection, voteDispatch } = useContext(VoteContext);

  const [options, setOptions] = useState([]);

  useEffect(() => {
    voteDispatch(voteSetSelection(''));

    if (issue !== '') {
      getRelevantOptions(issue)
      .then(({ data }) => {
        setOptions(data);
      });
    } else {
      setOptions([]);
    }
  }, [issue, voteDispatch])

  return options.length > 0 && (
    <FormControl
      label={() => "Select an Option for " + issue}
    >
      <RadioGroup
        value={selection}
        onChange={(e) => voteDispatch(voteSetSelection(e.target.value))}
        align={ALIGN.vertical}
        required
      >
        {options.map((option) => (
          <Radio
            value={option}
            key={option}
          >{option}</Radio>
        ))}
      </RadioGroup>
    </FormControl>
  );

  // return options.length > 0 && (
  //   <div>
  //     <label>Select Option for {issue}</label><br />
  //     {options.map((opt) => (
  //       <div key={opt}>
  //         <input
  //           name="selection"
  //           type="radio"
  //           checked={selection === opt}
  //           value={opt}
  //           required
  //           onChange={(e) => voteDispatch(voteSetSelection(e.target.value))}
  //         />
  //         {opt}
  //       </div>
  //     ))}
  //   </div>
  // );
};

export default VoteOptions;