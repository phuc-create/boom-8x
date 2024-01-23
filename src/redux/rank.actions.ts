import { getRank, setRank } from './controller'
import * as types from './types'

export const getRankGame = () => async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
  dispatch({
    type: types.GET_RANK_REQUESTED,
  })
  try {
    const { data } = await getRank()
    dispatch({
      type: types.GET_RANK_SUCCESS,
      payload: data.message,
    })
  } catch (error: any) {
    dispatch({
      type: types.GET_RANK_ERROR,
      payload: error.response && error.response.data,
    })
  }
}

export const setRankGame = (user: any, remains: any) => async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
  dispatch({
    type: types.SET_RANK_REQUESTED,
  })
  try {
    const { data } = await setRank(user, remains)
    dispatch({
      type: types.SET_RANK_SUCCESS,
      payload: data.message,
    })
  } catch (error: any) {
    dispatch({
      type: types.SET_RANK_ERROR,
      payload: error.response && error.response.data,
    })
  }
}
