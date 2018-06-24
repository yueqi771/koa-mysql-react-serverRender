import { combineReducers } from 'redux';
import userInfo from './user'


const mainStore = combineReducers({
    userInfo
})

export default mainStore;