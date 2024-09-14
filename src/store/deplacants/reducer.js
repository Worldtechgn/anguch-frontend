import {
	GET_DEPLACANTS_FAIL,
	GET_DEPLACANT_FAIL,
	GET_DEPLACANTS_SUCCESS,
	GET_DEPLACANT_SUCCESS,
	ADD_DEPLACANT_SUCCESS,
	ADD_DEPLACANT_FAIL,
	UPDATE_DEPLACANT_SUCCESS,
	UPDATE_DEPLACANT_FAIL,
	DELETE_DEPLACANT_SUCCESS,
	DELETE_DEPLACANT_FAIL,
} from "./actionType"

const INIT_STATE = {
	deplacants: [],
	deplacant: {},
	error: {},
};

const deplacants = (state = INIT_STATE, action) => {
	switch (action.type) {
		case GET_DEPLACANTS_SUCCESS:
			return {
				...state,
				deplacants: action.payload,
			};

		case GET_DEPLACANTS_FAIL:
			return {
				...state,
				error: action.payload,
			};
		case GET_DEPLACANT_SUCCESS:
			return {
				...state,
				deplacant: action.payload,
			}

		case GET_DEPLACANT_FAIL:
			return {
				...state,
				error: action.payload,
			}

		case ADD_DEPLACANT_SUCCESS:
			return {
				...state,
				deplacants: [...state.deplacants, action.payload],
			};

		case ADD_DEPLACANT_FAIL:
			return {
				...state,
				error: action.payload,
			};

		case UPDATE_DEPLACANT_SUCCESS:
			return {
				...state,
				deplacants: state.deplacants.map(deplacant =>
					deplacant.id.toString() === action.payload.id.toString()
						? { deplacant, ...action.payload }
						: deplacant
				),
			};

		case UPDATE_DEPLACANT_FAIL:
			return {
				...state,
				error: action.payload,
			};

		case DELETE_DEPLACANT_SUCCESS:
			return {
				...state,
				deplacants: state.deplacants.filter(
					deplacant => deplacant.id.toString() !== action.payload.id.toString()
				),
			};

		case DELETE_DEPLACANT_FAIL:
			return {
				...state,
				error: action.payload,
			};

		default:
			return state;
	}
};

export default deplacants;
