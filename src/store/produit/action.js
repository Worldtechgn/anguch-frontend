import { 
  GET_PRODUIT,
  GET_PRODUIT_SUCCESS, 
  GET_PRODUIT_ERROR,
  POST_PRODUIT,
  POST_PRODUIT_SUCCESS,
  POST_PRODUIT_ERROR,
  SHOW_PRODUIT,
  SHOW_PRODUIT_SUCCESS,
  SHOW_PRODUIT_ERROR,
  PUT_PRODUIT,
  PUT_PRODUIT_SUCCESS,
  PUT_PRODUIT_ERROR,
  DEL_PRODUIT,
  DEL_PRODUIT_SUCCESS,
  DEL_PRODUIT_ERROR
} from "./actionType"

export const getProduits = () => ({ type: GET_PRODUIT})
export const getProduitSuccess = (produit) => ({type: GET_PRODUIT_SUCCESS, payload: produit})
export const getProduitError = error => ({ type: GET_PRODUIT_ERROR,payload: error})

export const postProduits = prix_produit => ({ type: POST_PRODUIT,payload: prix_produit})
export const postProduitSuccess = prix_produit => ({ type: POST_PRODUIT_SUCCESS,payload: prix_produit})
export const postProduitError = error => ({ type: POST_PRODUIT_ERROR,payload: error})

export const getShowProduit = id => ({ type: SHOW_PRODUIT, payload: id})
export const getShowProduitSuccess = prix_produit => ({ type: SHOW_PRODUIT_SUCCESS, payload: prix_produit})
export const getShowProduitError = error => ({ type: SHOW_PRODUIT_ERROR,payload: error})

export const putProduits = (id,prix_produit,history) => ({ type: PUT_PRODUIT, payload:{id, prix_produit, history}})
export const putProduitSuccess = (prix_produit) => ({ type: PUT_PRODUIT_SUCCESS, payload: prix_produit})
export const putProduitError = error => ({ type: PUT_PRODUIT_ERROR, payload: error})

export const delProduits = (id,history) => ({ type: DEL_PRODUIT, payload:{id, history}})
export const delProduitSuccess = id => ({ type: DEL_PRODUIT_SUCCESS, payload: id})
export const delProduitError = error => ({ type: DEL_PRODUIT_ERROR, payload: error})