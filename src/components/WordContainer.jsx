import React from 'react';

export const WordContainer = ({
  words,
  inputCorrect,
  currentWordIndex,
  correction,
}) => {
  return (
    <div className="word-container">
      <span className="word-container__title">Text:</span>
      <div className="word-container__words">
        {words.map((word, index) => (
          <span
            key={index}
            className="word-container__word"
            style={{
              background:
                inputCorrect[index] === false
                  ? 'red'
                  : index === currentWordIndex
                  ? 'LightGreen'
                  : 'transparent',
                  
                  
            }}
          >
            {word}{' '}
          </span>
        ))}
      </div>
    </div>
  );
};
