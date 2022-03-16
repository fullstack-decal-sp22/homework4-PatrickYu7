import React, { useState } from 'react';
import './styles/Board.css';
import Square from './Square';

function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, changeTurn] = useState(true);
  let status = 'Next player: ' + (xIsNext ? 'X' : 'O');

  function handleClick(i) {
    const square = squares.slice();
    if (calculateWinner(square) || square[i]) {
      return;
    }
    square[i] = xIsNext ? 'X' : 'O';
    setSquares(square);
    changeTurn(!xIsNext);
  }

  function renderSquare(i) {
    const winner = calculateWinner(squares);
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (xIsNext ? 'X' : 'O');
    }
    return <Square value={squares[i]} click={() => handleClick(i)} />;
  }

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <div className="status">{status}</div>
    </div>
  );
}

export default Board;
