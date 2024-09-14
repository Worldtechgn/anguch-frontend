import { 
    DEL_PROFILE_ALIMENTAIRES, 
    DEL_PROFILE_ALIMENTAIRE_ERROR, 
    DEL_PROFILE_ALIMENTAIRE_SUCCESS, 
    GET_PROFILE_ALIMENTAIRES, 
    GET_PROFILE_ALIMENTAIRE_ERROR, 
    GET_PROFILE_ALIMENTAIRE_SUCCESS, 
    POST_PROFILE_ALIMENTAIRES, 
    POST_PROFILE_ALIMENTAIRE_ERROR, 
    POST_PROFILE_ALIMENTAIRE_SUCCESS, 
    PUT_PROFILE_ALIMENTAIRES, 
    PUT_PROFILE_ALIMENTAIRE_ERROR, 
    PUT_PROFILE_ALIMENTAIRE_SUCCESS, 
    SHOW_PROFILE_ALIMENTAIRE, 
    SHOW_PROFILE_ALIMENTAIRE_ERROR, 
    SHOW_PROFILE_ALIMENTAIRE_SUCCESS 
} from "./actionType"

export const getAllProfileAlimentaireAction = () => ({ type: GET_PROFILE_ALIMENTAIRES})
export const getProfileAlimentaireActionSuccess = (profile_alimentaires) => (
    {
        type: GET_PROFILE_ALIMENTAIRE_SUCCESS,
        payload: profile_alimentaires
    })
export const getProfileAlimentaireActionError = error => ({ type: GET_PROFILE_ALIMENTAIRE_ERROR,payload: error})

export const getExportProfileAlimentaireAction = () => ({ type: GET_PROFILE_ALIMENTAIRES})
export const getExportProfileAlimentaireActionSuccess = (profile_alimentaires) => ({type: GET_PROFILE_ALIMENTAIRE_SUCCESS, payload: profile_alimentaires})
export const getExportProfileAlimentaireActionError = error => ({ type: GET_PROFILE_ALIMENTAIRE_ERROR,payload: error})

export const postProfileAlimentaires = profile_alimentaire => ({ type: POST_PROFILE_ALIMENTAIRES,payload: profile_alimentaire})
export const postProfileAlimentaireSuccess = profile_alimentaire => ({ type: POST_PROFILE_ALIMENTAIRE_SUCCESS,payload: profile_alimentaire})
export const postProfileAlimentaireError = error => ({ type: POST_PROFILE_ALIMENTAIRE_ERROR,payload: error})

export const getShowProfileAlimentaire = id => ({ type: SHOW_PROFILE_ALIMENTAIRE, payload: id})
export const getShowProfileAlimentaireSuccess = profile_alimentaire => ({ type: SHOW_PROFILE_ALIMENTAIRE_SUCCESS, payload: profile_alimentaire})
export const getShowProfileAlimentaireError = error => ({ type: SHOW_PROFILE_ALIMENTAIRE_ERROR,payload: error})

export const putProfileAlimentaires = (id,profile_alimentaire,history) => ({ type: PUT_PROFILE_ALIMENTAIRES, payload:{id, profile_alimentaire, history}})
export const putProfileAlimentaireSuccess = (profile_alimentaire) => ({ type: PUT_PROFILE_ALIMENTAIRE_SUCCESS, payload: profile_alimentaire})
export const putProfileAlimentaireError = error => ({ type: PUT_PROFILE_ALIMENTAIRE_ERROR, payload: error})

export const delProfileAlimentaires = (id,history) => ({ type: DEL_PROFILE_ALIMENTAIRES, payload:{id, history}})
export const delProfileAlimentaireSuccess = id => ({ type: DEL_PROFILE_ALIMENTAIRE_SUCCESS, payload: id})
export const delProfileAlimentaireError = error => ({ type: DEL_PROFILE_ALIMENTAIRE_ERROR, payload: error})