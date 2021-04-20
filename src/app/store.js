/*
	The store for the website. The project uses both react-redux and redux-persist.
  Redux allows us to store the state of the application, while redux-persists retains the store.
  For example, if the user refreshes the page, the store will, as it were, persist.
*/

import { combineReducers, createStore } from '@reduxjs/toolkit';
import candidateReducer from '../features/candidate/candidateSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage: storage,
}

// There is only one reducer in the project, but more reducers could be combined
const persistedReducer = persistReducer(persistConfig, combineReducers({ candidate: candidateReducer }));
 
export default () => {
  let store = createStore(persistedReducer)
  let persistor = persistStore(store)
  return { store, persistor }
}