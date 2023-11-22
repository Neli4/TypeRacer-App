import React from 'react';

const Input = ({ value, onChange, onKeyUp, disabled }) => {
  return (
    <div className="word-input">
      <label htmlFor="word">Type:</label>
      <input
        name="word"
        type="text"
        aria-label="Insert word"
        placeholder="Type..."
        className=""
        autoFocus
        value={value || ''}
        onChange={(event) => onChange(event.target.value)}
        onKeyUp={(event) => onKeyUp(event.key)}
        disabled={disabled}
      />
    </div>
  );
};

export default Input;
