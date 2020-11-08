import { combineReducers } from 'redux';
import balloonsReducer from './balloonsReducer';
import appReducer from './appReducer'


export default combineReducers({
   balloonsReducer, appReducer
});
