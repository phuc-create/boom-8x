import React, { SetStateAction, useCallback, useEffect, useRef, useState } from "react";
import produce from 'immer'
import { classConfig } from './modules'


const ROWS = 10
const COLUMNS = 10
const BOOMS = 10
const NUMS: number[] = [0, 1, 2, 3, 4]
const COLORS: string[] = ["#1B1464", "#57606f", "#EA2027", "#FFC312"]
/**
 * 0 : default value and hidden
 * 2 : default value and hidden (but this is boom)
 * 1 : appear value for valid block
 * 3 : appear value for booma and put red color
 * @returns 
 */
const App: React.FC = () => {
  const [overG, setOverG] = useState(false);
  const overRef = useRef(overG);

  overRef.current = overG;
  const generateBoardGame = () => {
    let table: any[] = []
    for (let i = 0; i < ROWS; i++) {
      table.push([...Array(COLUMNS)].map(() => 0))
    }
    let countTurn: number = 0;

    while (countTurn < BOOMS) {
      const row: number = Math.floor(Math.random() * 10);
      const col: number = Math.floor(Math.random() * 10);
      if (table[row][col] === 0) {
        table[row][col] = 2;
        countTurn += 1;
      }
    }
    return [...table];
  }

  const [board, setBoard] = useState(() => generateBoardGame())
  // console.table(board)
  const handleBoom = (num: number, i: number, k: string | number) => {
    setBoard((brd: any) => {
      console.log(num)
      if (num === 2) {
        //game over
        setOverG(true)
        return brd = brd.map((rows: number[]) => {
          return rows.map((value: number) => value === 2 ? 3 : 1
          )
        })
      }
      return produce(board, boardCopy => {
        boardCopy[i][k] = board[i][k] === 0 ? 1 : 1;
      });
    })
  }

  return (
    <>
      <div className="boom" style={classConfig.main}>
        {board.map((rows, i) => {
          return rows.map((_box: any, k: string | number) => {
            return <div
              key={`${i}+${k}`}
              onClick={() => handleBoom(_box, i, k)}
              style={{
                ...classConfig.box,
                backgroundColor: board[i][k] === 3 ? "red" : board[i][k] === 1 ? "#57606f" : "#dfe6e9",
              }}>
              <span
                style={{
                  textIndent: `${board[i][k] === 0 || board[i][k] === 2 ? "100%" : "0%"}`,
                  whiteSpace: "nowrap",
                  overflow: `${board[i][k] === 0 || board[i][k] === 2 ? "hidden" : "unset"}`,
                }}
              >
                {_box === 3 ? '💥' : '🎯'}

              </span>
            </div>
          })
        })}
      </div>
      {
        overG && <div style={classConfig.over}>
          GAME OVER
          <button
            style={classConfig.button}
            onClick={() => {
              setOverG(false);
              setBoard(generateBoardGame())
              if (!overG) {
                overRef.current = true;
              }
            }}
          >
            TRY AGAIN
          </button>
        </div>
      }
    </>
  );
};

export default App;
