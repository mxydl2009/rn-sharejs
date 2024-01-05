import { combineReducers } from 'redux'
import userReducer from './login/reducer'
import loadingReducer from './loading/reducer'


// COMBINED REDUCERS
const reducers = {
  user: userReducer,
  loading: loadingReducer
}

export default combineReducers(reducers)