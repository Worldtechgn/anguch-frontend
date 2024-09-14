import { 
    DEL_PRIX_PRODUIT, 
    DEL_PRIX_PRODUIT_ERROR,
    DEL_PRIX_PRODUIT_SUCCESS, 
    GET_PRIX_PRODUIT, 
    GET_PRIX_PRODUIT_ERROR, 
    GET_PRIX_PRODUIT_SUCCESS, 
    POST_PRIX_PRODUIT, 
    POST_PRIX_PRODUIT_ERROR, 
    POST_PRIX_PRODUIT_SUCCESS, 
    PUT_PRIX_PRODUIT, 
    PUT_PRIX_PRODUIT_ERROR, 
    PUT_PRIX_PRODUIT_SUCCESS, 
    SHOW_PRIX_PRODUIT, 
    SHOW_PRIX_PRODUIT_ERROR, 
    SHOW_PRIX_PRODUIT_SUCCESS 
} from "./actionType"

export const getPrixProduit = () => ({ type: GET_PRIX_PRODUIT})
export const getPrixProduitSuccess = (prix_produits) => ({type: GET_PRIX_PRODUIT_SUCCESS, payload: prix_produits})
export const getPrixProduitError = error => ({ type: GET_PRIX_PRODUIT_ERROR,payload: error})

export const postPrixProduits = prix_produit => ({ type: POST_PRIX_PRODUIT,payload: prix_produit})
export const postPrixProduitSuccess = prix_produit => ({ type: POST_PRIX_PRODUIT_SUCCESS,payload: prix_produit})
export const postPrixProduitError = error => ({ type: POST_PRIX_PRODUIT_ERROR,payload: error})

export const getShowPrixProduit = id => ({ type: SHOW_PRIX_PRODUIT, payload: id})
export const getShowPrixProduitSuccess = prix_produit => ({ type: SHOW_PRIX_PRODUIT_SUCCESS, payload: prix_produit})
export const getShowPrixProduitError = error => ({ type: SHOW_PRIX_PRODUIT_ERROR,payload: error})

export const putPrixProduits = (id,prix_produit,history) => ({ type: PUT_PRIX_PRODUIT, payload:{id, prix_produit, history}})
export const putPrixProduitSuccess = (prix_produit) => ({ type: PUT_PRIX_PRODUIT_SUCCESS, payload: prix_produit})
export const putPrixProduitError = error => ({ type: PUT_PRIX_PRODUIT_ERROR, payload: error})

export const delPrixProduits = (id,history) => ({ type: DEL_PRIX_PRODUIT, payload:{id, history}})
export const delPrixProduitSuccess = id => ({ type: DEL_PRIX_PRODUIT_SUCCESS, payload: id})
export const delPrixProduitError = error => ({ type: DEL_PRIX_PRODUIT_ERROR, payload: error})