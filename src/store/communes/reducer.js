import { ADD_COMMUNE_FAIL, ADD_COMMUNE_SUCCESS, DELETE_COMMUNE_FAIL, DELETE_COMMUNE_SUCCESS, GET_COMMUNES_FAIL, GET_COMMUNES_SUCCESS, GET_COMMUNE_FAIL, GET_COMMUNE_SUCCESS, UPDATE_COMMUNE_FAIL, UPDATE_COMMUNE_SUCCESS } from "./actionType";

const INIT_STATE = {
	communes: [],
	commune: {},
}
const communes = (state = INIT_STATE, action) => {
	switch (action.type) {
		case GET_COMMUNES_SUCCESS:
			return {
				...state,
				communes: action.payload,
			};

		case GET_COMMUNES_FAIL:
			return {
				...state,
				error: action.payload,
			};
		case GET_COMMUNE_SUCCESS:
			return {
				...state,
				commune: action.payload,
			}

		case GET_COMMUNE_FAIL:
			return {
				...state,
				error: action.payload,
			}

		case ADD_COMMUNE_SUCCESS:
			return {
				...state,
				communes: [...state.communes, action.payload],
			};

		case ADD_COMMUNE_FAIL:
			return {
				...state,
				error: action.payload,
			};

		case UPDATE_COMMUNE_SUCCESS:
			return {
				...state,
				communes: state.communes.map(commune =>
					commune.id.toString() === action.payload.id.toString()
						? { commune, ...action.payload }
						: commune
				),
			};

		case UPDATE_COMMUNE_FAIL:
			return {
				...state,
				error: action.payload,
			};

		case DELETE_COMMUNE_SUCCESS:
			return {
				...state,
				communes: state.communes.filter(
					commune => commune.id.toString() !== action.payload.id.toString()
				),
			};

		case DELETE_COMMUNE_FAIL:
			return {
				...state,
				error: action.payload,
			};

		default:
			return state;
	}
}

export default communes;