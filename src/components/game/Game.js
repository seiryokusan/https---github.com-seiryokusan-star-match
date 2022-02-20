import React from 'react';
import utils from '../../utils/MathUtils';
import StarsDisplay from './StarsDisplay';
import PlayNumber from './PlayNumber';
import PlayAgainButton from './PlayAgainButton';
import useGameState from './effects/GameState';

const Game = (props) => {
  const {
    stars,
    availableNumbers,
    candidateNumbers,
    secondsLeft,
    setGameState,
  } = useGameState();

  const areCandidatesWrong = utils.sum(candidateNumbers) > stars;

  const gameStatus =
    availableNumbers.length === 0
      ? 'won'
      : secondsLeft === 0
      ? 'lost'
      : 'active';

  const numberStatus = (number) => {
    if (!availableNumbers.includes(number)) {
      return 'used';
    }

    if (candidateNumbers.includes(number)) {
      return areCandidatesWrong ? 'wrong' : 'candidate';
    }

    return 'available';
  };

  const onNumberClick = (number, currentStatus) => {
    if (currentStatus === 'used' || secondsLeft === 0) {
      return;
    }

    const newCandidateNumbers =
      currentStatus === 'available'
        ? candidateNumbers.concat(number)
        : candidateNumbers.filter((cn) => cn !== number);

    setGameState(newCandidateNumbers);
  };

  return (
    <div className="game">
      <div className="help">
        Pick 1 or more numbers that sum to the number of stars
      </div>
      <div className="body">
        <div className="left">
          {gameStatus !== 'active' ? (
            <PlayAgainButton
              onClick={props.startNewGame}
              gameStatus={gameStatus}
            />
          ) : (
            <StarsDisplay count={stars} />
          )}
        </div>
        <div className="right">
          {utils.range(1, 9).map((number) => (
            <PlayNumber
              key={number}
              status={numberStatus(number)}
              number={number}
              onClick={onNumberClick}
            />
          ))}
        </div>
      </div>
      <div className="timer">Time Remaining: {secondsLeft}</div>
    </div>
  );
};

export default Game;
