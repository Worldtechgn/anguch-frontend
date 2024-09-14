import { DEL_CATASTROPHES, 
    DEL_CATASTROPHE_ERROR, 
    DEL_CATASTROPHE_SUCCESS, 
    GET_CATASTROPHES, 
    GET_CATASTROPHE_ERROR, 
    GET_CATASTROPHE_SUCCESS, 
    GET_WITH_PAGINATE_CATASTROPHES, 
    GET_WITH_PAGINATE_CATASTROPHE_ERROR, 
    GET_WITH_PAGINATE_CATASTROPHE_SUCCESS, 
    POST_CATASTROPHES,
    POST_CATASTROPHE_ERROR,
    POST_CATASTROPHE_SUCCESS,
    PUT_CATASTROPHES,
    PUT_CATASTROPHE_ERROR,
    PUT_CATASTROPHE_SUCCESS,
    SHOW_CATASTROPHE,
    SHOW_CATASTROPHE_ERROR,
    SHOW_CATASTROPHE_SUCCESS
} from "./actionType"

export const getAllCatastropheAction = () => ({ type: GET_CATASTROPHES})
export const getCatastropheActionSuccess = (catastrophes) => ({type: GET_CATASTROPHE_SUCCESS, payload: catastrophes})
export const getCatastropheActionError = error => ({ type: GET_CATASTROPHE_ERROR,payload: error})

export const getWithPaginateCatastropheAction = (page,limit) => ({ type: GET_WITH_PAGINATE_CATASTROPHES,payload:{page,limit}})
export const getWithPaginateCatastropheActionSuccess = (catastrophes) => ({type: GET_WITH_PAGINATE_CATASTROPHE_SUCCESS, payload: catastrophes})
export const getWithPaginateCatastropheActionError = error => ({ type: GET_WITH_PAGINATE_CATASTROPHE_ERROR,payload: error})

export const getExportCatastropheAction = () => ({ type: GET_CATASTROPHES})
export const getExportCatastropheActionSuccess = (catastrophes) => ({type: GET_CATASTROPHE_SUCCESS, payload: catastrophes})
export const getExportCatastropheActionError = error => ({ type: GET_CATASTROPHE_ERROR,payload: error})

export const postCatastrophes = (catastrophe,history) => ({ type: POST_CATASTROPHES,payload: {catastrophe,history}})
export const postCatastropheSuccess = catastrophes => ({ type: POST_CATASTROPHE_SUCCESS,payload: catastrophes})
export const postCatastropheError = error => ({ type: POST_CATASTROPHE_ERROR,payload: error})

export const getShowCatastrophe = id => ({ type: SHOW_CATASTROPHE, payload: id})
export const getShowCatastropheSuccess = catastrophe => ({ type: SHOW_CATASTROPHE_SUCCESS, payload: catastrophe})
export const getShowCatastropheError = error => ({ type: SHOW_CATASTROPHE_ERROR,payload: error})

export const putCatastrophes = (id,catastrophe,history) => ({ 
    type: PUT_CATASTROPHES, 
    payload: {id, catastrophe, history}
})

export const putCatastropheSuccess = (catastrophes) => ({ type: PUT_CATASTROPHE_SUCCESS, payload: catastrophes})
export const putCatastropheError = error => ({ type: PUT_CATASTROPHE_ERROR, payload: error})

export const delCatastrophes = (id,history) => ({ type: DEL_CATASTROPHES, payload:{id, history}})
export const delCatastropheSuccess = id => ({ type: DEL_CATASTROPHE_SUCCESS, payload: id})
export const delCatastropheError = error => ({ type: DEL_CATASTROPHE_ERROR, payload: error})