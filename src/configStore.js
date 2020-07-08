import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import reducer from './store/reducers';

const rootReducer = combineReducers({
    dataReducer: reducer
})

const configStore = () => createStore(rootReducer);
export default configStore;