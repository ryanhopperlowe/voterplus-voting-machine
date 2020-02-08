import React from 'react';

const Receipt = ({ issue, selection, receiptNo }) => (
  <div>
    <h1>Receipt:</h1>
    <h3><strong>Issue:</strong> {issue}</h3>
    <h4><strong>Selection:</strong> {selection}</h4>
    <label>Receipt Number (copy it and submit to governmint portal to verify your vote was counted!)</label><br />
    <textarea value={receiptNo} disabled></textarea>
  </div>
);

export default Receipt;