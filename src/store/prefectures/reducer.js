import { ADD_PREFECTURE_FAIL, ADD_PREFECTURE_SUCCESS, DELETE_PREFECTURE_FAIL, DELETE_PREFECTURE_SUCCESS, GET_PREFECTURES_FAIL, GET_PREFECTURES_SUCCESS, GET_PREFECTURE_FAIL, GET_PREFECTURE_SUCCESS, UPDATE_PREFECTURE_FAIL, UPDATE_PREFECTURE_SUCCESS } from "./actionType";

const INIT_STATE = {
	prefectures: [],
	prefecture: {},
}
const prefectures = (state = INIT_STATE, action) => {
	switch (action.type) {
		case GET_PREFECTURES_SUCCESS:
			return {
				...state,
				prefectures: action.payload,
			};

		case GET_PREFECTURES_FAIL:
			return {
				...state,
				error: action.payload,
			};
		case GET_PREFECTURE_SUCCESS:
			return {
				...state,
				prefecture: action.payload,
			}

		case GET_PREFECTURE_FAIL:
			return {
				...state,
				error: action.payload,
			}

		case ADD_PREFECTURE_SUCCESS:
			return {
				...state,
				prefectures: [...state.prefectures, action.payload],
			};

		case ADD_PREFECTURE_FAIL:
			return {
				...state,
				error: action.payload,
			};

		case UPDATE_PREFECTURE_SUCCESS:
			return {
				...state,
				prefectures: state.prefectures.map(prefecture =>
					prefecture.id.toString() === action.payload.id.toString()
						? { prefecture, ...action.payload }
						: prefecture
				),
			};

		case UPDATE_PREFECTURE_FAIL:
			return {
				...state,
				error: action.payload,
			};

		case DELETE_PREFECTURE_SUCCESS:
			return {
				...state,
				prefectures: state.prefectures.filter(
					prefecture => prefecture.id.toString() !== action.payload.id.toString()
				),
			};

		case DELETE_PREFECTURE_FAIL:
			return {
				...state,
				error: action.payload,
			};

		default:
			return state;
	}
}

export default prefectures;