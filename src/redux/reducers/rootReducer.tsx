import { combineReducers } from 'redux'
import ranks from './ranks.reducers'

const rootReducer = combineReducers({
  ranks: ranks,
})
export default rootReducer
