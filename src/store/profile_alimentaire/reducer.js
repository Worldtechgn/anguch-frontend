import { DEL_PROFILE_ALIMENTAIRE_ERROR, DEL_PROFILE_ALIMENTAIRE_SUCCESS, GET_PROFILE_ALIMENTAIRE_ERROR, GET_PROFILE_ALIMENTAIRE_SUCCESS, POST_PROFILE_ALIMENTAIRES, POST_PROFILE_ALIMENTAIRE_ERROR, POST_PROFILE_ALIMENTAIRE_SUCCESS, PUT_PROFILE_ALIMENTAIRE_ERROR, PUT_PROFILE_ALIMENTAIRE_SUCCESS, SHOW_PROFILE_ALIMENTAIRE_ERROR, SHOW_PROFILE_ALIMENTAIRE_SUCCESS } from "./actionType"

const initState = {
    profile_alimentaires:[],
    profile_alimentaire:{},
    error:{}
}


const profile_alimentaires = (state = initState, action) => {
    switch (action.type) {
        case GET_PROFILE_ALIMENTAIRE_SUCCESS:
            return {
                ...state,
                profile_alimentaires: action.payload
            }
        case GET_PROFILE_ALIMENTAIRE_ERROR:
            return {
                ...state,
                error: action.payload
            }
        case POST_PROFILE_ALIMENTAIRES:
            return {
                ...state,
                profile_alimentaires: action.payload
            }
        case POST_PROFILE_ALIMENTAIRE_SUCCESS:
            return {
                ...state,
                profile_alimentaires: action.payload
            }
        case POST_PROFILE_ALIMENTAIRE_ERROR:
            return {
                ...state,
                error: action.payload
            }
        case PUT_PROFILE_ALIMENTAIRE_SUCCESS:
            return {
                ...state,
                profile_alimentaires: action.payload
            }
        case PUT_PROFILE_ALIMENTAIRE_ERROR:
            return {
                ...state,
                error: action.payload
            }
        case DEL_PROFILE_ALIMENTAIRE_SUCCESS:
            return {
                ...state,
                profile_alimentaires: action.payload
            }
        case DEL_PROFILE_ALIMENTAIRE_ERROR:
            return {
                ...state,
                error: action.payload
            }
        case SHOW_PROFILE_ALIMENTAIRE_SUCCESS:
            return {
                ...state,
                profile_alimentaire: action.payload
            }
        case SHOW_PROFILE_ALIMENTAIRE_ERROR:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state
        
    }
}

export default profile_alimentaires

