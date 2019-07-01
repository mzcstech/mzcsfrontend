// import * as actionType from './actionType'
import {fromJS} from 'immutable'
let PrivilegeReducer = fromJS({    
    personinformations:[]
})
export default (state = PrivilegeReducer, action) => {
    if(action.type === "EDIT_PERSONINFORMATIONS" ){
        return state.merge({personinformations:action.personInformation})
    }
    return state; 
} 