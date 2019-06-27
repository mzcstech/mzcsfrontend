//combineReducers可以将一些小的reducer合并成一个大的reducer
import { combineReducers} from 'redux-immutable'

import {reducer as PrivilegeReducer } from '../components/PrivilegeController/store/index'
import {reducer as SocialSecurity } from '../components/socialsecurity/store/index'
//redux-immutable 可以将state改变成immutable对象
const reducer = combineReducers({
    PrivilegeReducer:PrivilegeReducer,
    SocialSecurity:SocialSecurity
})
export default reducer 