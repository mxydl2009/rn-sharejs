import { createStore, applyMiddleware } from 'redux'
// import { composeWithDevToolsDevelopmentOnly } from '@redux-devtools/extension'
import thunkMiddleware from 'redux-thunk'
import reducers from './reducer';

const middleware = [ thunkMiddleware ]

// const enhancer = process.env.NODE_ENV === 'development'? 
//   composeWithDevTools(applyMiddleware(...middleware)): 
//   applyMiddleware(...middleware);
// const enhancer = composeWithDevToolsDevelopmentOnly(applyMiddleware(...middleware));
const enhancer = applyMiddleware(...middleware);
const store = createStore(reducers, enhancer);
 
export default store;