import * as types from '../types'

const initialState = {
  ranks: [],
  isLoading: false,
  error: null,
}

export default function ranks(state = initialState, action: { type: any; payload: any; }) {
  const { type, payload } = action
  switch (type) {
  case types.GET_RANK_REQUESTED:
  case types.SET_RANK_REQUESTED:
    return { ...state, isLoading: true }
  case types.GET_RANK_SUCCESS:
    return {
      ...state,
      isLoading: false,
      ranks: payload,
    }
  case types.GET_RANK_ERROR:
    return {
      ...state,
      isLoading: false,
      error: payload,
    }
  case types.SET_RANK_SUCCESS:
    return {
      ...state, 
      isLoading: false,
      ranks: payload,
    }
  case types.SET_RANK_ERROR:
    return {
      ...state,
      isLoading: false,
      error: payload,
    }
  default:
    return state
  }
}
