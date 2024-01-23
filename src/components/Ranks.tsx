import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getRankGame } from '../redux/rank.actions'

const Ranks = () => {
  const dispatch = useDispatch()
  const [level] = useState(4)
  const { ranks } = useSelector((state: any) => state.ranks)
  const newRank = ranks.sort((a: { remains: number; }, b: { remains: number; }) => a.remains - b.remains)

  useEffect(() => {
    dispatch(getRankGame())
  }, [dispatch, level])
  return (
    <div className="home">
      <div className="r-head">
        <span>Top</span>
        <span>User</span>
        <span>Remains</span>
      </div>
      <div className="r-s">
        {newRank.length > 0 ? (
          newRank.map((rank: {
            _id: React.Key | null | undefined;
            user: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined;
            remains: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined;
          },
          index: number) => {
            if (index < 10) {
              return (
                <div className="r-s-w" key={rank._id}>
                  <span>{index + 1}</span>
                  <span>{rank.user}</span>
                  <span>{rank.remains}</span>
                </div>
              )
            }
            return null
          })
        ) : (
          <p style={{ color: 'white', marginTop: 20 }}>
            Opp...Not any user at this rank
          </p>
        )}
      </div>
    </div>
  )
}

export default Ranks
