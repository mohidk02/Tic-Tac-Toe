import React, { useState } from "react";

const Cell = ({ ID, counterC, onCalculateCounter, onMark }) => {
  const [value, setValue] = useState("-");
  const [marked, setMarked] = useState(null);
  const mark = () => {
    if (!marked) {
      let mark = counterC % 2 === 0 ? "X" : "O";
      setValue(mark);
      onCalculateCounter(counterC);
      onMark(ID, mark);
    }
    setMarked(1);
  };
  return (
    <>
      <div
        id={ID}
        style={{ width: "100%" }}
        className={value === "X" ? "X" : value === "O" ? "O" : ""}
        onClick={mark}
      >
        {value}
      </div>
    </>
  );
};

const Player = ({ player }) => {
  return <>Current Player: {player === 1 ? "X" : "O"}</>;
};

const Tictac = () => {
  //Set Turn Counter
  const [counter, setCounter] = useState(0);

  //Set Result Array
  const [play, setPlay] = useState(Array(9).fill(""));

  //Set possible results
  const win = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [3, 4, 5],
    [6, 7, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
  ];

  //Restart Match
  const replay = () => {
    window.location.reload();
  };

  //set Winner
  const [winner, setWinner] = useState("");
  if (winner) {
    return (
      <>
        <div className="result">
          <h1>Player {winner} has won the game</h1>
          <button onClick={replay}>Play Again</button>
        </div>
      </>
    );
  }

  //Increment Counter By 1 after each turn
  const CalculateCounter = (currentCounter) => {
    setCounter(currentCounter + 1);
  };

  //Store Record to Evaluate Result after each turn
  const evaluate = (ID, mark) => {
    play[ID] = mark;
    setPlay(play);
    win.forEach((element) => {
      const [a, b, c] = element;
      if (play[a] === play[b] && play[b] === play[c] && play[a] !== "") {
        setWinner(play[a] === "X" ? 1 : 2);
      }
    });
  };

  const grid = [];
  let cellID = 0;
  for (let i = 0; i < 3; i++) {
    let row = [];
    for (let j = 0; j < 3; j++) {
      row.push(
        <td key={cellID}>
          <Cell
            ID={cellID}
            counterC={counter}
            onCalculateCounter={CalculateCounter}
            onMark={evaluate}
          />
        </td>
      );
      cellID += 1;
    }
    grid.push(<tr key={`row` + cellID}>{row}</tr>);
  }
  return (
    <>
      <div className="player">
        <Player player={(counter % 2) + 1} />
      </div>
      <div style={{ margin: "200px 600px 100px 600px" }}>
        <table className="cell">
          <tbody>{grid}</tbody>
        </table>
      </div>
    </>
  );
};

export default Tictac;
