import { LOGIN, LOGOUT, UPDATE } from './types'

// const initialState = {
//   username: 'mxy',
//   avatar: 'https://file.sharejs.wiki/avatars/avatar_dog.jpeg',
//   email: 'VWdPQ@example.com',
// }
const initialState = {}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        ...action.payload
      }
    case LOGOUT:
      return {};
    case UPDATE:
      return {
        ...state,
        ...action.payload
      }
    default:
      return state;
  }
}

export default userReducer;