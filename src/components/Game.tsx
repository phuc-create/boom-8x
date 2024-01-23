import React, { useRef, useState } from 'react'
import produce from 'immer'
import { styles } from '../modules'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setRankGame } from '../redux/rank.actions'
import {
  PICKET_INIT,
  BOOM_ACTIVE,
  FAKE_BOOM_WARNING,
  PICKET_ACTIVE,
  BOOM_WARNING,
  BOOM_DANGEROUS_ZONE,
  BOOM_INIT,
  BOOMS,
  COLUMNS,
  DEFAULT_REMAIN,
  ROWS,
} from './constants'
import { checkIdx } from './utils'

// const COLORS: string[] = ["#1B1464", "#57606f", "#EA2027", "#FFC312"]
/**
 * 0 : default value and hidden
 * 2 : default value and hidden (but this is boom)
 * 1 : appear value for valid block
 * 3 : appear value for booma and put red color
 * @returns
 */

const Game: React.FC = () => {
  const [overG, setOverG] = useState<boolean>(false)
  const [name, setName] = useState<string>('')
  const [saveRsl, setSaveRsl] = useState(false)
  const [countEnemy, setCountEnemy] = useState<number>(DEFAULT_REMAIN)
  const [isDone, setDone] = useState<boolean>(false)
  const overRef = useRef(overG)
  const history = useHistory()
  const dispatch = useDispatch()
  const GAME_START = [
    PICKET_INIT,
    BOOM_INIT,
    BOOM_WARNING,
    FAKE_BOOM_WARNING,
    BOOM_DANGEROUS_ZONE,
  ]
  overRef.current = overG
  const generateBoardGame = () => {
    const table = []
    for (let i: number = 0; i < ROWS; i++) {
      table.push([...Array(COLUMNS)].map(() => PICKET_INIT))
    }

    let countTurn: number = 0
    while (countTurn < BOOMS) {
      const row: number = Math.floor(Math.random() * 10)
      const col: number = Math.floor(Math.random() * 10)
      if (table[row][col] === PICKET_INIT) {
        table[row][col] = BOOM_INIT
        countTurn += 1
      }
    }
    return [...table]
  }

  const [board, setBoard] = useState(() => generateBoardGame())
  console.table(board)
  const handleBoom = (num: number, row: number, col: number) => {
    if (board[row][col] === PICKET_ACTIVE) return
    setBoard((brd: number[][]) => {
      if (num === BOOM_ACTIVE) return brd
      if (
        num === BOOM_INIT ||
        num === BOOM_WARNING ||
        num === BOOM_DANGEROUS_ZONE
      ) {
        //game over
        setOverG(true)
        return (brd = brd.map((rows: number[]) => {
          return rows.map((value: number) =>
            [BOOM_INIT, BOOM_WARNING, BOOM_DANGEROUS_ZONE].includes(value)
              ? BOOM_ACTIVE
              : PICKET_ACTIVE,
          )
        }))
      }
      return produce(brd, (boardCopy: number[][]) => {
        let checker: number = 0
        if ([PICKET_INIT, FAKE_BOOM_WARNING].includes(brd[row][col])) {
          checker = PICKET_ACTIVE
          setCountEnemy(prev => prev - 1)
        }
        checker = PICKET_ACTIVE
        boardCopy[row][col] = checker

        // BASED ON THE POSITION CLICKED => CREATE CROSS (+) FROM 4 DIMENSIONS (top, left, right, bottom)
        const TOP = row - 1 < 0 ? row + 1 : row - 1 //
        const LEFT = col - 1 < 0 ? col + 1 : col - 1
        const BOTTOM = row + 1 > 9 ? row - 1 : row + 1
        const RIGHT = col + 1 > 9 ? col - 1 : col + 1

        const checkInitOrWarn = [
          boardCopy[TOP][col],
          boardCopy[row][RIGHT],
          boardCopy[BOTTOM][col],
          boardCopy[row][LEFT],
        ]
        if (
          checkInitOrWarn.includes(BOOM_INIT) ||
          checkInitOrWarn.includes(BOOM_WARNING)
        ) {
          boardCopy[TOP][col] = checkIdx(brd[TOP][col])
          boardCopy[row][RIGHT] = checkIdx(brd[row][RIGHT])
          boardCopy[BOTTOM][col] = checkIdx(brd[BOTTOM][col])
          boardCopy[row][LEFT] = checkIdx(brd[col][LEFT])
        }
      })
    })
  }

  const restartGame = () => {
    setOverG(false)
    setDone(false)
    setBoard(generateBoardGame())
    setCountEnemy(DEFAULT_REMAIN)
    if (!overG) {
      overRef.current = true
    }
  }

  const iconRslver = (n: number): string => {
    if (
      [
        PICKET_INIT,
        BOOM_INIT,
        FAKE_BOOM_WARNING,
        BOOM_WARNING,
        BOOM_DANGEROUS_ZONE,
      ].includes(n)
    ) {
      return ''
    }
    return n === BOOM_ACTIVE ? '💣' : '🚩'
  }

  const colorRslver = (n: number): string => {
    if (n === BOOM_ACTIVE) return '#EA2027'
    if (n === PICKET_ACTIVE) return '#dfe6e9'
    if (n === BOOM_DANGEROUS_ZONE) return '#ff5e57'
    if (n === BOOM_WARNING || n === FAKE_BOOM_WARNING) return '#e67e22'
    return '#57606f'
  }

  const handleSaveRecords = () => {
    const user = name
    const remains = countEnemy
    dispatch(setRankGame(user, remains))
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
          {board.map((rows, i: number) => {
            return rows.map((_box, k: number) => {
              return (
                <div
                  key={`${i}+${k}`}
                  onClick={() => handleBoom(_box, i, k)}
                  style={{
                    ...styles.box,
                    backgroundColor: colorRslver(board[i][k]),
                  }}
                >
                  <span
                    style={{
                      textIndent: `${GAME_START.includes(board[i][k]) ? '100%' : '0%'}`,
                      whiteSpace: 'nowrap',
                      overflow: `${GAME_START.includes(board[i][k]) ? 'hidden' : 'unset'}`,
                    }}
                  >
                    {iconRslver(_box)}
                  </span>
                </div>
              )
            })
          })}
        </div>
      </div>

      {overG && (
        <div className="game-over">
          <span>GAME OVER 💥☠️</span>
          <div className="btn-controler">
            <button onClick={() => restartGame()}>TRY AGAIN</button>
            {isDone ? (
              <button onClick={() => history.push('/rank')}>VIEW RANKS</button>
            ) : (
              <button onClick={() => setSaveRsl(true)}>SAVE RESULTS</button>
            )}
            <button onClick={() => history.push('/')}>EXIT</button>
          </div>
        </div>
      )}
      {saveRsl && (
        <div className="game-over" style={{ zIndex: 10 }}>
          <span>
            <input
              type="text"
              placeholder="your name"
              onChange={e => setName(e.target.value)}
            />
          </span>
          <p style={{ fontStyle: 'italic', fontSize: '11px' }}>
            *in some cases data will not be saved for standard reasons
          </p>
          <div className="btn-controler">
            <button onClick={() => handleSaveRecords()}>SAVE</button>
            <button onClick={() => setSaveRsl(false)}>EXIT</button>
          </div>
        </div>
      )}
      {countEnemy === 0 && (
        <div className="game-over">
          <p
            style={{
              fontStyle: 'oblique',
              fontSize: '3rem',
              color: 'ButtonFace',
            }}
          >
            Congrat!!!You win this game
          </p>
          <div className="btn-controler">
            {isDone ? (
              <button onClick={() => history.push('/rank')}>VIEW RANKS</button>
            ) : (
              <button onClick={() => setSaveRsl(true)}>SAVE RESULTS</button>
            )}
            <button onClick={() => setSaveRsl(false)}>EXIT</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Game
