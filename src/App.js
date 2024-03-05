

import { useState } from "react";
import "./App.css";

function App() {
  const initialBoard = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ];
  const [board, setBoard] = useState(initialBoard);
  const [direction, setDirection] = useState(null);
  const [placement, setPlacement] = useState({ x: -1, y: -1, arrow: null });

  const setBoardData = (x, y) => {
    if (x === null || y === null || !placement.arrow) {
      return alert(`Select the ${!x ? "x value" : !y ? "y value" : "Bot facing direction"}`);
    }
    console.log(placement);
    if (x >= 0 && x < initialBoard.length && y >= 0 && y < initialBoard[0].length) {
      setBoard((brd) => {
        brd = initialBoard;
        brd[x][y] = 1;
        return brd;
      });
      setPlacement((p) => ({ ...p, x: x, y: y }));
    } else {
      alert("Invalid Move");
    }
  };

  const move = () => {
    switch (direction) {
      case "EAST": {
        setBoardData(placement.x, placement.y + 1);

        break;
      }
      case "WEST": {
        setBoardData(placement.x, placement.y - 1);
        break;
      }
      case "NORTH": {
        setBoardData(placement.x - 1, placement.y);
        break;
      }
      case "SOUTH": {
        setBoardData(placement.x + 1, placement.y);
        break;
      }
    }
  };

  const rotate = (left) => {
    switch (placement.arrow) {
      case "EAST": {
        setPlacement((p) => ({ ...p, arrow: left ? "NORTH" : "SOUTH" }));
        setDirection(left ? "NORTH" : "SOUTH");
        break;
      }
      case "WEST": {
        setPlacement((p) => ({ ...p, arrow: left ? "SOUTH" : "NORTH" }));
        setDirection(left ? "SOUTH" : "NORTH");
        break;
      }
      case "NORTH": {
        setPlacement((p) => ({ ...p, arrow: left ? "WEST" : "EAST" }));
        setDirection(left ? "WEST" : "EAST");
        break;
      }
      case "SOUTH": {
        setPlacement((p) => ({ ...p, arrow: left ? "EAST" : "WEST" }));
        setDirection(left ? "EAST" : "WEST");
        break;
      }
    }
  };

  return (
    <div className="container">
      <div>
        {board.map((element, i) => {
          return (
            <div className="panel">
              {element.map((data, j) => {
                return (
                  <p
                    className={`${
                      board[i][j]
                        ? direction === "NORTH"
                          ? "robotUp"
                          : direction === "SOUTH"
                          ? "robotDown"
                          : direction === "EAST"
                          ? "robotRight"
                          : "robotLeft"
                        : "block"
                    }`}
                  >
                    {/* {i} {j} */}
                  </p>
                );
              })}
            </div>
          );
        })}
      </div>
      <div className="controls">
        <div>
          <select name="x" id="x" onChange={(e) => setPlacement({ ...placement, x: parseInt(e.target.value) })}>
            <option disabled selected value={-1}>
              x
            </option>
            {board.map((_, idx) => (
              <option value={idx}>{idx}</option>
            ))}
          </select>
          <select name="y" id="y" onChange={(e) => setPlacement({ ...placement, y: parseInt(e.target.value) })}>
            <option disabled selected value={-1}>
              y
            </option>
            {board.map((_, idx) => (
              <option value={idx}>{idx}</option>
            ))}
          </select>
          <select
            name="direction"
            id="direction"
            onChange={(e) => setPlacement({ ...placement, arrow: e.target.value })}
          >
            <option disabled selected value={null}>
              HEAD
            </option>
            <option value="EAST">EAST</option>
            <option value="WEST">WEST</option>
            <option value="NORTH">NORTH</option>
            <option value="SOUTH">SOUTH</option>
          </select>
          <div>
            <button
              onClick={(e) => {
                setDirection(placement?.arrow ?? null);
                setBoardData(placement.x, placement.y);
              }}
            >
              Place
            </button>
          </div>
        </div>
        <br />
        <div>
          <button onClick={move}>Move</button>
        </div>
        <br />
        <div>
          <button onClick={() => rotate(true)}>Left</button>
        </div>
        <br />
        <div>
          <button onClick={() => rotate(false)}>Right</button>
        </div>
        <br />
        <div>
          <button
            onClick={() => {
              alert(`x: ${placement.x} y: ${placement.y} face: ${placement.arrow}`);
            }}
          >
            Report
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
