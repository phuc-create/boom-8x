import React, { useRef, useState } from "react";
import produce from 'immer'
import { styles } from '../modules'
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setRankGame } from "../redux/rank.actions";

const ROWS = 10
const COLUMNS = 10
const BOOMS = 10
const DEFAULT_REMAIN = 80
// const COLORS: string[] = ["#1B1464", "#57606f", "#EA2027", "#FFC312"]
/**
 * 0 : default value and hidden
 * 2 : default value and hidden (but this is boom)
 * 1 : appear value for valid block
 * 3 : appear value for booma and put red color
 * @returns 
 */
const Game: React.FC = () => {
  const [overG, setOverG] = useState<boolean>(false);
  const [name, setName] = useState<string>("")
  const [saveRsl, setSaveRsl] = useState(false)
  const [countEnemy, setCountEnemy] = useState<number>(DEFAULT_REMAIN)
  const [isDone, setDone] = useState<boolean>(false)
  const overRef = useRef(overG);
  const history = useHistory()
  const dispatch = useDispatch()

  overRef.current = overG;
  const generateBoardGame = () => {
    let table: any[] = []
    for (let i: number = 0; i < ROWS; i++) {
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

  const handleBoom = (num: number, i: number, k: string | number) => {
    setBoard((brd: any) => {
      if (num === 3) return
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
        let checker: number = 0
        if (board[i][k] === 0) {
          checker = 1
          setCountEnemy(prev => prev - 1)
        }
        checker = 1
        boardCopy[i][k] = checker
      })
    })
  }
  const restartGame = () => {
    setOverG(false);
    setDone(false)
    setBoard(generateBoardGame())
    setCountEnemy(DEFAULT_REMAIN)
    if (!overG) {
      overRef.current = true;
    }
  }

  const iconRslver = (n: number): string => {
    if (n === 0 || n === 2) {
      return ''
    }
    return n === 3 ? '💣' : '🚩'
  }

  const handleSaveRecords = () => {
    let user = name
    let remains = countEnemy
    dispatch(setRankGame(user, remains));
    setSaveRsl(false)
    setDone(true)

  }

  return (
    <div>
      <div className="wrapper">
        <div className="infors">
          <span className="boom-remain">BOOMS: {BOOMS}</span>
          <span className="enemy-remain">REMAIN: {countEnemy} </span>
        </div>
        <div className="boom" style={styles.main}>
          {board.map((rows: [], i: number): any => {
            return rows.map((_box: any, k: string | number) => {
              return <div
                key={`${i}+${k}`}
                onClick={() => handleBoom(_box, i, k)}
                style={{
                  ...styles.box,
                  backgroundColor: board[i][k] === 3 ? "#EA2027" : board[i][k] === 1 ? "#dfe6e9" : "#57606f",
                }}>
                <span
                  style={{
                    textIndent: `${board[i][k] === 0 || board[i][k] === 2 ? "100%" : "0%"}`,
                    whiteSpace: "nowrap",
                    overflow: `${board[i][k] === 0 || board[i][k] === 2 ? "hidden" : "unset"}`,
                  }}
                >
                  {iconRslver(_box)}
                </span>
              </div>
            })
          })}
        </div>
      </div>

      {
        overG && <div className="game-over">
          <span>GAME OVER 💥☠️</span>
          <div className="btn-controler">
            <button
              onClick={() => restartGame()}
            >
              TRY AGAIN
            </button>
            {isDone ? (
              <button onClick={() => history.push("/rank")}>
                VIEW RANKS
              </button>
            ) : (
              <button onClick={() => setSaveRsl(true)}>
                SAVE RESULTS
              </button>

            )}
            <button onClick={() => history.push("/")}>
              EXIT
            </button>
          </div>
        </div>
      }
      {
        saveRsl && <div className="game-over">
          <span>
            <input type="text" placeholder="your name" onChange={(e) => setName(e.target.value)} />
          </span>
          <p style={{ fontStyle: "italic", fontSize: "11px" }}>*in some cases data will not be saved for standard reasons</p>
          <div className="btn-controler">
            <button onClick={() => handleSaveRecords()}>
              SAVE
            </button>
            <button onClick={() => setSaveRsl(false)}>
              EXIT
            </button>
          </div>
        </div>
      }
    </div>
  );
};

export default Game;
