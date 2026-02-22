import React, { useState, useLayoutEffect } from "react";

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xTurn, setXTurn] = useState(true);
  const [winner, setWinner] = useState(null);

  useLayoutEffect(() => {
    checkWinner();
  }, [board]);

  const checkWinner = () => {
    const lines = [
      [0,1,2],[3,4,5],[6,7,8],
      [0,3,6],[1,4,7],[2,5,8],
      [0,4,8],[2,4,6]
    ];

    for (let line of lines) {
      const [a,b,c] = line;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a]);
        return;
      }
    }
  };

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = xTurn ? "X" : "O";

    setBoard(newBoard);
    setXTurn(prev => !prev);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setXTurn(true);
  };

return (
  <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
    <div className="card game-container">
      <h2 className="game-title">Tic Tac Toe</h2>

      <div className="board">
        {board.map((cell, i) => (
          <div
            key={i}
            className={`cell ${cell === "X" ? "x" : ""} ${cell === "O" ? "o" : ""}`}
            onClick={() => handleClick(i)}
          >
            {cell}
          </div>
        ))}
      </div>

      <div className="game-info">
        {winner ? (
          <h3 className="winner">Winner: {winner}</h3>
        ) : (
          <p>Turn: {xTurn ? "X" : "O"}</p>
        )}

        <button className="primary" onClick={resetGame}>
          Reset Game
        </button>
      </div>
    </div>
  </div>
);
};

export default TicTacToe;