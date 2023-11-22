import React from 'react';

export const Timer = ({ timer }) => (
  <div className="timer">
    <span className="timer__title">Timer: </span>
    <span>
      {Math.floor(timer / 60)}:
      {(timer % 60).toString().padStart(2, '0')}
    </span>
  </div>
);
