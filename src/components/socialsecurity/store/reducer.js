// import * as actionType from './actionType'
import {fromJS} from 'immutable'
let PrivilegeReducer = ({    
    personinformations:[]
})
export default (state = PrivilegeReducer, action) => {
    if(action.type === "EDIT_PERSONINFORMATIONS" ){
        alert(123)
        // state.personinformations = action.personinformations;
        return state;
    }
    return state; 
} 