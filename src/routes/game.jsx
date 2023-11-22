import React from 'react';
import { useLocation } from 'react-router-dom';
import { getWords } from '../utils/getWords';
import { Timer } from '../components/Timer';
import { WordContainer } from '../components/WordContainer';
import Input from '../components/Input';

export default function Game() {
  const location = useLocation();
  const [words, setWords] = React.useState([]);
  const [wordInput, setWordInput] = React.useState('');
  const [inputCorrect, setInputCorrect] = React.useState([]);
  const [correctKeystroke, setCorrectKeystroke] = React.useState(0);
  const [wrongKeystroke, setWrongKeystroke] = React.useState(0);
  const [correction, setCorrection] = React.useState(0);
  const [correctWords, setCorrectWords] = React.useState(0);
  const [wrongWords, setWrongWords] = React.useState(0);
  const [timer, setTimer] = React.useState(0);
  const [currentWordIndex, setCurrentWordIndex] = React.useState(0);
  const [gameFinished, setGameFinished] = React.useState(false);
  const currentWord = React.useMemo(
    () => words[currentWordIndex],
    [words, currentWordIndex]
  );
  const totalKeyStrokes = React.useMemo(
    () => correctKeystroke + wrongKeystroke,
    [correctKeystroke, wrongKeystroke]
  );

  const intervalRef = React.useRef();

  const { level } = location.state;

  React.useEffect(() => {
    setWords(getWords(level));
    let wordCount;
    if (level === 'easy') {
      wordCount = 10;
    } else if (level === 'medium') {
      wordCount = 20;
    } else {
      wordCount = 30;
    }
    setInputCorrect(new Array(wordCount).fill(null));
  }, [level]);

  React.useEffect(() => {
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  const successRate = React.useMemo(() => {
    if (correctWords + wrongWords === 0) return 0;
    return (
      (correctWords / (correctWords + wrongWords)) *
      100
    ).toFixed(2);
  }, [correctWords, wrongWords]);

  const timerHandler = () => {
    intervalRef.current = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000);
  };

  const inputHandler = (inputText) => {
    setWordInput(inputText);

    const isCorrect =
      currentWord &&
      inputText.trim() === currentWord.slice(0, inputText.length);

    if (inputText.endsWith(' ')) {
      const inputWord = inputText.trim();

      setInputCorrect((prev) => {
        const newInputCorrect = [...prev];
        newInputCorrect[currentWordIndex] = inputWord === currentWord;
        return newInputCorrect;
      });

      setWordInput('');

      if (inputWord === currentWord) {
        setCorrectWords((prev) => prev + 1);
      } else {
        setWrongWords((prev) => prev + 1);
      }

      setCurrentWordIndex((prevIndex) => {
        if (prevIndex + 1 === words.length) {
          clearInterval(intervalRef.current);
          setGameFinished(true);
        }
        return prevIndex + 1;
      });
    } else if (inputText.trim().length > 0) {
      // Real-time feedback as the user is typing each word
      if (isCorrect !== inputCorrect[currentWordIndex]) {
        setInputCorrect((prev) => {
          const newInputCorrect = [...prev];
          newInputCorrect[currentWordIndex] = isCorrect;
          return newInputCorrect;
        });
      }
    }
  };

  const keyUpHandler = (key) => {
    if (key.length === 1 && key !== ' ') {
      if (totalKeyStrokes === 0) {
        //start timer when user first enter key
        timerHandler();
      }

      if (inputCorrect) {
        setCorrectKeystroke((prev) => prev + 1);
      } else {
        setWrongKeystroke((prev) => prev + 1);
      }
    }

    
      if (event.key === 'Backspace') {
         setCorrection(1);
    }
  };

  const restartGame = () => {
    setGameFinished(false);
    clearInterval(intervalRef.current);
    setWords(getWords(level));
    setWordInput('');
    setInputCorrect(new Array(words.length).fill(null));
    setCorrectKeystroke(0);
    setWrongKeystroke(0);
    setCorrection(0);

    setCorrectWords(0);
    setCurrentWordIndex(0);
    setWrongWords(0);
    setTimer(0);
  };

  return (
    <>
      <div className="container">
        <Timer timer={timer} />
        <WordContainer
          words={words}
          inputCorrect={inputCorrect}
          currentWordIndex={currentWordIndex}
        />
        <Input
          value={wordInput}
          disabled={gameFinished}
          onChange={inputHandler}
          onKeyUp={keyUpHandler}
        />
        {gameFinished && (
          <>
    <div className="score">
              Score: {correctWords + wrongWords} words typed,{' '}
              {successRate}% success rate
            </div>
            <button
              type="button"
              onClick={restartGame}
              className="button"
            >
              Play again
            </button>
          </>
        )}
      </div>
    </>
  );
}
