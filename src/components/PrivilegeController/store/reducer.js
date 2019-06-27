import * as actionType from './actionType'
import {Map, fromJS} from 'immutable'
let PrivilegeReducer = fromJS({    
    dataList:[],
    page:0,
    rowsPerPage:5,
    total:0,
})
export default (state = PrivilegeReducer, action) => {
    if(action.type === actionType.GET_DATALIST ){
        return state.merge({
            dataList:action.dataList,
            page:action.page,
            rowsPerPage:action.rowsPerPage,
            total:action.total,
        })
    }
    return state; 
} 