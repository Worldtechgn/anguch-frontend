import { 
    LIST_CATASTROPHE_SUCCESS, 
    LIST_CATASTROPHE_FAIL, 
    LIST_DENRE_FAIL, 
    LIST_DENRE_SUCCESS, 
    LIST_MATERIEL_FAIL,
    LIST_MATERIEL_SUCCESS
} from "./actionType";

const initialState = {
	catastrophes: [],
	denres: [],
	materiels: [],
	error: {},
};
const typeDataMateriels = (state = initialState, action) =>{

    switch (action.type) {
        case LIST_CATASTROPHE_SUCCESS:
            return {
                ...state, 
                catastrophes: action.payload
            };
        case LIST_CATASTROPHE_FAIL:
            return {
                ...state,
                error: action.payload
            };
        case LIST_DENRE_SUCCESS:
            return {
                ...state,
                denres: action.payload
            }; 
        case LIST_DENRE_FAIL:
            return {
                ...state, 
                error: action.payload
            };
        case LIST_MATERIEL_SUCCESS:
            return {
                ...state, 
                materiels: action.payload
            };
        case LIST_MATERIEL_FAIL:
            return {
                ...state, 
                error: action.payload
            };
        default:
            return state;
    }

}

export default typeDataMateriels