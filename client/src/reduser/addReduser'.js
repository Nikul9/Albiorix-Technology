let inicticalizeState = []
export default function (state = inicticalizeState , action) {
    console.log("action.payload");
    console.log(action.payload);
    switch (action.type) {
        
        case "ADD_USER": {
            return {
                ...state,
                userdata : action.payload 
            }
        }
        default : {
           return state
        }
    }
}