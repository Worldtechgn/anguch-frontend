import { 
    DEL_PRODUIT_ERROR, 
    DEL_PRODUIT_SUCCESS, 
    GET_PRODUIT_ERROR, 
    GET_PRODUIT_SUCCESS, 
    POST_PRODUIT, 
    POST_PRODUIT_ERROR, 
    POST_PRODUIT_SUCCESS, 
    PUT_PRODUIT_ERROR, 
    PUT_PRODUIT_SUCCESS, 
    SHOW_PRODUIT_ERROR, 
    SHOW_PRODUIT_SUCCESS 
} from "./actionType"

const initState = {
    produits:[],
    produit:{},
    error:{}
}

const produits = (state = initState, action) => {
    switch (action.type) {
        case GET_PRODUIT_SUCCESS:
            return {
                ...state,
                produits: action.payload
            }
        case GET_PRODUIT_ERROR:
            return {
                ...state,
                error: action.payload
            }
        case POST_PRODUIT:
            return {
                ...state,
                produit: action.payload
            }
        case POST_PRODUIT_SUCCESS:
            return {
                ...state,
                produit: action.payload
            }
        case POST_PRODUIT_ERROR:
            return {
                ...state,
                error: action.payload
            }
        case PUT_PRODUIT_SUCCESS:
            return {
                ...state,
                produit: action.payload
            }
        case PUT_PRODUIT_ERROR:
            return {
                ...state,
                error: action.payload
            }
        case DEL_PRODUIT_SUCCESS:
            return {
                ...state,
                produit: action.payload
            }
        case DEL_PRODUIT_ERROR:
            return {
                ...state,
                error: action.payload
            }
        case SHOW_PRODUIT_SUCCESS:
            return {
                ...state,
                produit: action.payload
            }
        case SHOW_PRODUIT_ERROR:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state
        
    }
}

export default produits 

