import React, { useState } from 'react';
import './App.css';

const isWinner = (squares, player) => {
  const rows = 15;
  const cols = 15;
  const directions = [
    [0, 1], [1, 0], [1, 1], [-1, 1]
  ];

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (squares[row * cols + col] === player) {
        for (const [dRow, dCol] of directions) {
          let count = 1;
          let nextRow = row + dRow;
          let nextCol = col + dCol;
          while (nextRow >= 0 && nextRow < rows && nextCol >= 0 && nextCol < cols &&
                 squares[nextRow * cols + nextCol] === player) {
            count++;
            nextRow += dRow;
            nextCol += dCol;
          }
          nextRow = row - dRow;
          nextCol = col - dCol;
          while (nextRow >= 0 && nextRow < rows && nextCol >= 0 && nextCol < cols &&
                 squares[nextRow * cols + nextCol] === player) {
            count++;
            nextRow -= dRow;
            nextCol -= dCol;
          }
          if (count >= 5) {
            return player;
          }
        }
      }
    }
  }
  return null;
};

const Square = ({ value, onClick }) => {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
};

const Board = ({ squares, onClick }) => {
  return (
    <div className="board">
      {squares.map((square, index) => (
        <Square
          key={index}
          value={square}
          onClick={() => onClick(index)}
        />
      ))}
    </div>
  );
};

const Game = () => {
  const [squares, setSquares] = useState(Array(225).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);

  const handleClick = (index) => {
    if (squares[index] || winner) {
      return;
    }

    const newSquares = squares.slice();
    newSquares[index] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);

    const newWinner = isWinner(newSquares, xIsNext ? 'X' : 'O');
    if (newWinner) {
      setWinner(newWinner);
    }

    setXIsNext(!xIsNext);
  };

  const resetGame = () => {
    setSquares(Array(225).fill(null));
    setXIsNext(true);
    setWinner(null);
  };

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={squares} onClick={handleClick} />
      </div>
      <div className="game-info">
        {winner ? `Winner: ${winner}` : `Next player: ${xIsNext ? 'X' : 'O'}`}
      </div>
      <button onClick={resetGame}>Restart Game</button>
    </div>
  );
};

export default Game;