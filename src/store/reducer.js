import { combineReducers } from 'redux'
import userReducer from './login/reducer'
import loadingReducer from './loading/reducer'
import errMsgReducer from './errMsg/reducer'


// COMBINED REDUCERS
const reducers = {
  user: userReducer,
  loading: loadingReducer,
  errMsg: errMsgReducer
}

export default combineReducers(reducers)