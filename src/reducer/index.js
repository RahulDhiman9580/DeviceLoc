import { combineReducers } from 'redux';

//Reducers
import {generalInfoReducer} from '../modules/deviceInfoModule/reducer';
const reducers = combineReducers({
    generalInfoReducer
});

export default reducers;