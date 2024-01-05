import { PENDING, RESOLVED } from './types'
const initialState = false

const loadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case PENDING:
      return true
    case RESOLVED:
      return false
    default:
      return state;
  }
}

export default loadingReducer;