import { 
    DEL_CATASTROPHE_ERROR, 
    DEL_CATASTROPHE_SUCCESS, 
    GET_CATASTROPHE_ERROR, 
    GET_CATASTROPHE_SUCCESS, 
    GET_WITH_PAGINATE_CATASTROPHE_ERROR, 
    GET_WITH_PAGINATE_CATASTROPHE_SUCCESS, 
    POST_CATASTROPHES, 
    POST_CATASTROPHE_ERROR, 
    POST_CATASTROPHE_SUCCESS, 
    PUT_CATASTROPHE_ERROR, 
    PUT_CATASTROPHE_SUCCESS, 
    SHOW_CATASTROPHE_ERROR, 
    SHOW_CATASTROPHE_SUCCESS} from "./actionType"

const initState = {
    catastrophes:[],
    catastrophe:{},
    error:{}
}


const catastrophes = (state = initState, action) => {
    switch (action.type) {
        case GET_CATASTROPHE_SUCCESS:
            return {
                ...state,
                catastrophes: action.payload
            }
        case GET_CATASTROPHE_ERROR:
            return {
                ...state,
                error: action.payload
            }
        case GET_WITH_PAGINATE_CATASTROPHE_SUCCESS:
            return {
                ...state,
                catastrophes: action.payload
            }
        case GET_WITH_PAGINATE_CATASTROPHE_ERROR:
            return {
                ...state,
                catastrophes: action.payload
            }
        case POST_CATASTROPHES:
            return {
                ...state,
                catastrophes: action.payload
            }
        case POST_CATASTROPHE_SUCCESS:
            return {
                ...state,
                catastrophes: action.payload
            }
        case POST_CATASTROPHE_ERROR:
            return {
                ...state,
                error: action.payload
            }
        case PUT_CATASTROPHE_SUCCESS:
            return {
                ...state,
                catastrophes: action.payload
            }
        case PUT_CATASTROPHE_ERROR:
            return {
                ...state,
                error: action.payload
            }
        case DEL_CATASTROPHE_SUCCESS:
            return {
                ...state,
                catastrophes: action.payload
            }
        case DEL_CATASTROPHE_ERROR:
            return {
                ...state,
                error: action.payload
            }
        case SHOW_CATASTROPHE_SUCCESS:
            return {
                ...state,
                catastrophe: action.payload
            }
        case SHOW_CATASTROPHE_ERROR:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state
        
    }
}

export default catastrophes