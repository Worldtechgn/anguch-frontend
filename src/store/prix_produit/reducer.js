import { 
    DEL_PRIX_PRODUIT_ERROR, 
    DEL_PRIX_PRODUIT_SUCCESS, 
    GET_PRIX_PRODUIT_ERROR, 
    GET_PRIX_PRODUIT_SUCCESS, 
    POST_PRIX_PRODUIT, 
    POST_PRIX_PRODUIT_ERROR, 
    POST_PRIX_PRODUIT_SUCCESS, 
    PUT_PRIX_PRODUIT_ERROR, 
    PUT_PRIX_PRODUIT_SUCCESS, 
    SHOW_PRIX_PRODUIT_ERROR, 
    SHOW_PRIX_PRODUIT_SUCCESS 
} from "./actionType"

const initState = {
    prix_produits:[],
    prix_produit:{},
    error:{}
}


const prix_produits = (state = initState, action) => {
    switch (action.type) {
        case GET_PRIX_PRODUIT_SUCCESS:
            return {
                ...state,
                prix_produits: action.payload
            }
        case GET_PRIX_PRODUIT_ERROR:
            return {
                ...state,
                error: action.payload
            }
        case POST_PRIX_PRODUIT:
            return {
                ...state,
                prix_produit: action.payload
            }
        case POST_PRIX_PRODUIT_SUCCESS:
            return {
                ...state,
                prix_produit: action.payload
            }
        case POST_PRIX_PRODUIT_ERROR:
            return {
                ...state,
                error: action.payload
            }
        case PUT_PRIX_PRODUIT_SUCCESS:
            return {
                ...state,
                prix_produit: action.payload
            }
        case PUT_PRIX_PRODUIT_ERROR:
            return {
                ...state,
                error: action.payload
            }
        case DEL_PRIX_PRODUIT_SUCCESS:
            return {
                ...state,
                prix_produit: action.payload
            }
        case DEL_PRIX_PRODUIT_ERROR:
            return {
                ...state,
                error: action.payload
            }
        case SHOW_PRIX_PRODUIT_SUCCESS:
            return {
                ...state,
                prix_produit: action.payload
            }
        case SHOW_PRIX_PRODUIT_ERROR:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state
        
    }
}

export default prix_produits

