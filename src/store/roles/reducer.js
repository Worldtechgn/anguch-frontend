import { ADD_ROLE_FAIL, ADD_ROLE_SUCCESS, DELETE_ROLE_FAIL, DELETE_ROLE_SUCCESS, GET_ROLES_FAIL, GET_ROLES_SUCCESS, GET_ROLE_FAIL, GET_ROLE_SUCCESS, UPDATE_ROLE_FAIL, UPDATE_ROLE_SUCCESS } from "./actionType";

const INIT_STATE = {
	roles: [],
	role: {},
}
const roles = (state = INIT_STATE, action) => {
	switch (action.type) {
		case GET_ROLES_SUCCESS:
			return {
				...state,
				roles: action.payload,
			};

		case GET_ROLES_FAIL:
			return {
				...state,
				error: action.payload,
			};
		case GET_ROLE_SUCCESS:
			return {
				...state,
				role: action.payload,
			}

		case GET_ROLE_FAIL:
			return {
				...state,
				error: action.payload,
			}

		case ADD_ROLE_SUCCESS:
			return {
				...state,
				roles: [...state.roles, action.payload],
			};

		case ADD_ROLE_FAIL:
			return {
				...state,
				error: action.payload,
			};

		case UPDATE_ROLE_SUCCESS:
			return {
				...state,
				roles: state.roles.map(role =>
					role.id.toString() === action.payload.id.toString()
						? { role, ...action.payload }
						: role
				),
			};

		case UPDATE_ROLE_FAIL:
			return {
				...state,
				error: action.payload,
			};

		case DELETE_ROLE_SUCCESS:
			return {
				...state,
				roles: state.roles.filter(
					role => role.id.toString() !== action.payload.id.toString()
				),
			};

		case DELETE_ROLE_FAIL:
			return {
				...state,
				error: action.payload,
			};

		default:
			return state;
	}
}

export default roles;