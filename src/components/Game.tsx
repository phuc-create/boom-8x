import React, { useRef, useState } from "react";
import produce from 'immer'
import { styles } from '../modules'
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setRankGame } from "../redux/rank.actions";

const ROWS = 10
const COLUMNS = 10
const BOOMS = 10
const DEFAULT_REMAIN = 91
// const COLORS: string[] = ["#1B1464", "#57606f", "#EA2027", "#FFC312"]
/**
 * 0 : default value and hidden
 * 2 : default value and hidden (but this is boom)
 * 1 : appear value for valid block
 * 3 : appear value for booma and put red color
 * @returns 
 */
const PICKET_INIT = 0;
const PICKET_ACTIVE = 1;
const BOOM_INIT = 2;
const BOOM_ACTIVE = 3;
const BOOM_WARNING = 4;
const BOOM_DANGEROUS_ZONE = 8
const FAKE_BOOM_WARNING = 5;
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
      table.push([...Array(COLUMNS)].map(() => PICKET_INIT))
    }

    let countTurn: number = 0;
    while (countTurn < BOOMS) {
      const row: number = Math.floor(Math.random() * 10);
      const col: number = Math.floor(Math.random() * 10);
      if (table[row][col] === PICKET_INIT) {
        table[row][col] = BOOM_INIT;
        countTurn += 1;
      }
    }
    return [...table];
  }

  const [board, setBoard] = useState(() => generateBoardGame())

  const handleBoom = (num: number, i: number, k: number) => {
    const checkIdx = (num: number) => {
      switch (num) {
        case PICKET_INIT:
          return FAKE_BOOM_WARNING;

        case PICKET_ACTIVE:
          return PICKET_ACTIVE;

        case BOOM_WARNING:
          return BOOM_DANGEROUS_ZONE;

        case BOOM_DANGEROUS_ZONE:
          return BOOM_DANGEROUS_ZONE;

        case BOOM_INIT:
          return BOOM_WARNING;

        default:
          return FAKE_BOOM_WARNING
      }
    }

    setBoard((brd: any) => {
      if (num === BOOM_ACTIVE) return brd
      if (num === BOOM_INIT || num === BOOM_WARNING || num === BOOM_DANGEROUS_ZONE) {
        //game over
        setOverG(true)
        return brd = brd.map((rows: number[]) => {
          return rows.map((value: number) => value === BOOM_INIT || value === BOOM_WARNING || value === BOOM_DANGEROUS_ZONE ? BOOM_ACTIVE : PICKET_ACTIVE
          )
        })
      }
      return produce(brd, (boardCopy: number[][]) => {
        let checker: number = 0
        if (brd[i][k] === PICKET_INIT || brd[i][k] === FAKE_BOOM_WARNING) {
          checker = PICKET_ACTIVE
          setCountEnemy(prev => prev - 1)
        }
        checker = PICKET_ACTIVE
        boardCopy[i][k] = checker

        let N = i - 1 < 0 ? i + 1 : i - 1
        let E = k + 1 > 9 ? k - 1 : k + 1
        let S = i + 1 > 9 ? i - 1 : i + 1
        let W = k - 1 < 0 ? k + 1 : k - 1

        if (boardCopy[N][k] === BOOM_INIT || boardCopy[N][k] === BOOM_WARNING
          || boardCopy[i][E] === BOOM_INIT || boardCopy[i][E] === BOOM_WARNING
          || boardCopy[S][k] === BOOM_INIT || boardCopy[S][k] === BOOM_WARNING
          || boardCopy[i][W] === BOOM_INIT || boardCopy[i][W] === BOOM_WARNING
        ) {
          boardCopy[N][k] = checkIdx(brd[N][k])
          boardCopy[i][E] = checkIdx(brd[i][E])
          boardCopy[S][k] = checkIdx(brd[S][k])
          boardCopy[i][W] = checkIdx(brd[i][W])
        }
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
    if (n === PICKET_INIT || n === BOOM_INIT || n === FAKE_BOOM_WARNING || n === BOOM_WARNING || n === BOOM_DANGEROUS_ZONE) {
      return ''
    }
    return n === BOOM_ACTIVE ? '💣' : '🚩'
  }
  const colorRslver = (n: number): string => {
    if (n === BOOM_ACTIVE) return "#EA2027"
    if (n === PICKET_ACTIVE) return "#dfe6e9"
    if (n === BOOM_DANGEROUS_ZONE) return "#ff5e57"
    if (n === BOOM_WARNING || n === FAKE_BOOM_WARNING) return "#e67e22"
    return "#57606f"
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
          <span className="enemy-remain">REMAIN: {countEnemy - 1} </span>
        </div>
        <div className="boom" style={styles.main}>
          {board.map((rows: [], i: number): any => {
            return rows.map((_box: any, k: number) => {
              return <div
                key={`${i}+${k}`}
                onClick={() => handleBoom(_box, i, k)}
                style={{
                  ...styles.box,
                  backgroundColor: colorRslver(board[i][k]),
                }}>
                <span
                  style={{
                    textIndent: `${board[i][k] === PICKET_INIT || board[i][k] === BOOM_INIT || board[i][k] === BOOM_WARNING || board[i][k] === FAKE_BOOM_WARNING || board[i][k] === BOOM_DANGEROUS_ZONE ? "100%" : "0%"}`,
                    whiteSpace: "nowrap",
                    overflow: `${board[i][k] === PICKET_INIT || board[i][k] === BOOM_INIT || board[i][k] === BOOM_WARNING || board[i][k] === FAKE_BOOM_WARNING || board[i][k] === BOOM_DANGEROUS_ZONE ? "hidden" : "unset"}`,
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
        saveRsl && <div className="game-over" style={{ zIndex: 10 }}>
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
      {
        countEnemy <= 1 && <div className="game-over" >

          <p style={{ fontStyle: "oblique", fontSize: "3rem", color: "ButtonFace" }}>Congrat!!!You win this game</p>
          <div className="btn-controler">
            {isDone ? (
              <button onClick={() => history.push("/rank")}>
                VIEW RANKS
              </button>
            ) : (
              <button onClick={() => setSaveRsl(true)}>
                SAVE RESULTS
              </button>

            )}
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
