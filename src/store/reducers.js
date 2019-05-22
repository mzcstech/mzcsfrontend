import { version } from "react";
let provise = {    
    personinformations: []
}
export default (state = provise, action) => {

    if (action.type === 'EDIT_PERSONINFORMATIONS') {
        state.personinformations = action.personinformations;
        return state;
    }else {
        return state;
    }

} 