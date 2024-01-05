import { ERROR, CLEAR } from './types'
const initialState = ''

const errMsgReducer = (state = initialState, action) => {
  switch (action.type) {
    case ERROR:
      return action.payload
    case CLEAR:
      return ''
    default:
      return state;
  }
}

export default errMsgReducer;