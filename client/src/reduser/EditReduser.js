let inicticalizeState = []
export default function (state = inicticalizeState , action) {
    console.log("EDITpayload");
    console.log(action.payload);
    switch (action.type) {
        
        case "EDIT_USER": {
            return {
                ...state,
                selectedUser : action.payload 
            }
        }
        default : {
           return state
        }
    }
}