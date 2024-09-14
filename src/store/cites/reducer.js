import {
    GET_SITES_FAIL,
    GET_SITE_FAIL,
    GET_SITES_SUCCESS,
    GET_SITE_SUCCESS,
    ADD_SITE_SUCCESS,
    ADD_SITE_FAIL,
    UPDATE_SITE_SUCCESS,
    UPDATE_SITE_FAIL,
    DELETE_SITE_SUCCESS,
    DELETE_SITE_FAIL,
} from "./typeAction"

const INIT_STATE = {
    sites: [],
    site: {},
    error: {},
};

const sites = (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_SITES_SUCCESS:
            return {
                ...state,
                sites: action.payload,
            };

        case GET_SITES_FAIL:
            return {
                ...state,
                error: action.payload,
            };
        case GET_SITE_SUCCESS:
            return {
                ...state,
                site: action.payload,
            }
        
        case GET_SITE_FAIL:
            return {
                ...state,
                error: action.payload,
            }

        case ADD_SITE_SUCCESS:
            return {
                ...state,
                sites: [...state.sites, action.payload],
            };

        case ADD_SITE_FAIL:
            return {
                ...state,
                error: action.payload,
            };

        case UPDATE_SITE_SUCCESS:
            return {
                ...state,
                sites: state.sites.map(site =>
                    site.id.toString() === action.payload.id.toString()
                        ? { site, ...action.payload }
                        : site
                ),
            };

        case UPDATE_SITE_FAIL:
            return {
                ...state,
                error: action.payload,
            };

        case DELETE_SITE_SUCCESS:
            return {
                ...state,
                sites: state.sites.filter(
                    site => site.id.toString() !== action.payload.id.toString()
                ),
            };

        case DELETE_SITE_FAIL:
            return {
                ...state,
                error: action.payload,
            };

        default:
            return state;
    }
};

export default sites;
