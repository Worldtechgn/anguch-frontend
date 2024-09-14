import { 
   LIST_CATASTROPHE_SUCCESS,
    LIST_CATASTROPHE_FAIL,
    LIST_DENRE_SUCCESS,
    LIST_DENRE_FAIL,
    LIST_MATERIEL_SUCCESS,
    LIST_MATERIEL_FAIL,
    LIST_CATASTROPHES,
    LIST_DENRES,
    LIST_MATERIELS
} from "./actionType"

//catastrophes
export const getCatastrophes = () => ({
    type: LIST_CATASTROPHES
})
export const getListeCatastropheSucess = catastrophes => ({
    type: LIST_CATASTROPHE_SUCCESS,
    payload: catastrophes
})
export const getlisteCatastropheFail = error => ({
    type: LIST_CATASTROPHE_FAIL,
    payload: error
})

//denres
export const getDenres = () => ({
    type: LIST_DENRES
})
export const getListeDenresSuccess = denres => ({
    type: LIST_DENRE_SUCCESS,
    payload: denres
})
export const getListeDenreFail = error => ({
    type: LIST_DENRE_FAIL,
    payload: error
})

//materiels
export const getMateriels = () => ({
    type: LIST_MATERIELS
})
export const getListeMaterielsSuccess = materiels => ({
    type: LIST_MATERIEL_SUCCESS,
    payload: materiels
})
export const getListeMaterielsFail = error => ({
    type: LIST_MATERIEL_FAIL,
    payload: error
})

