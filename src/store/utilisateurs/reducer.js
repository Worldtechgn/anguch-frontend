import {
	GET_UTILISATEURS_FAIL,
	GET_UTILISATEUR_FAIL,
	GET_UTILISATEURS_SUCCESS,
	GET_UTILISATEUR_SUCCESS,
	ADD_UTILISATEUR_SUCCESS,
	ADD_UTILISATEUR_FAIL,
	UPDATE_UTILISATEUR_SUCCESS,
	UPDATE_UTILISATEUR_FAIL,
	DELETE_UTILISATEUR_SUCCESS,
	DELETE_UTILISATEUR_FAIL,
	PROFILE_UTILISATEUR_SUCCESS,
	PROFILE_UTILISATEUR_FAIL,
	PASSWORD_UTILISATEUR_SUCCESS,
	PASSWORD_UTILISATEUR_FAIL,
} from "./actionType"

const INIT_STATE = {
	utilisateurs: [],
	utilisateur: {},
	error: {},
};

const utilisateurs = (state = INIT_STATE, action) => {
	switch (action.type) {
		case GET_UTILISATEURS_SUCCESS:
			return {
				...state,
				utilisateurs: action.payload,
			};

		case GET_UTILISATEURS_FAIL:
			return {
				...state,
				error: action.payload,
			};
		case GET_UTILISATEUR_SUCCESS:
			return {
				...state,
				utilisateur: action.payload,
			}

		case GET_UTILISATEUR_FAIL:
			return {
				...state,
				error: action.payload,
			}

		case ADD_UTILISATEUR_SUCCESS:
			return {
				...state,
				utilisateurs: [...state.utilisateurs, action.payload],
			};

		case ADD_UTILISATEUR_FAIL:
			return {
				...state,
				error: action.payload,
			};

		case PROFILE_UTILISATEUR_SUCCESS:
			return {
				...state,
				utilisateurs: [...state.utilisateurs, action.payload],
			};

		case PROFILE_UTILISATEUR_FAIL:
			return {
				...state,
				error: action.payload,
			};

		case PASSWORD_UTILISATEUR_SUCCESS:
			return {
				...state,
				utilisateurs: [...state.utilisateurs, action.payload],
			};

		case PASSWORD_UTILISATEUR_FAIL:
			return {
				...state,
				error: action.payload,
			};

		case UPDATE_UTILISATEUR_SUCCESS:
			return {
				...state,
				utilisateurs: state.utilisateurs.map(utilisateur =>
					utilisateur.id.toString() === action.payload.id.toString()
						? { utilisateur, ...action.payload }
						: utilisateur
				),
			};

		case UPDATE_UTILISATEUR_FAIL:
			return {
				...state,
				error: action.payload,
			};

		case DELETE_UTILISATEUR_SUCCESS:
			return {
				...state,
				utilisateurs: state.utilisateurs.filter(
					utilisateur => utilisateur.id.toString() !== action.payload.id.toString()
				),
			};

		case DELETE_UTILISATEUR_FAIL:
			return {
				...state,
				error: action.payload,
			};

		default:
			return state;
	}
};

export default utilisateurs;
