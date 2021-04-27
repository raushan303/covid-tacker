import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducer';

export default function configureStore() {
  const middlewares = [thunkMiddleware].filter(Boolean);
  const middleWare = applyMiddleware(...middlewares);
  const store = createStore(rootReducer, middleWare);
  return store;
}
