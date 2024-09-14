import { ADD_REGION_FAIL, ADD_REGION_SUCCESS, DELETE_REGION_FAIL, DELETE_REGION_SUCCESS, GET_REGIONS_FAIL, GET_REGIONS_SUCCESS, GET_REGION_FAIL, GET_REGION_SUCCESS, UPDATE_REGION_FAIL, UPDATE_REGION_SUCCESS } from "./actionType";

const INIT_STATE = {
	regions: [],
	region: {},
}
const regions = (state = INIT_STATE, action) => {
	switch (action.type) {
		case GET_REGIONS_SUCCESS:
			return {
				...state,
				regions: action.payload,
			};

		case GET_REGIONS_FAIL:
			return {
				...state,
				error: action.payload,
			};
		case GET_REGION_SUCCESS:
			return {
				...state,
				region: action.payload,
			}

		case GET_REGION_FAIL:
			return {
				...state,
				error: action.payload,
			}

		case ADD_REGION_SUCCESS:
			return {
				...state,
				regions: [...state.regions, action.payload],
			};

		case ADD_REGION_FAIL:
			return {
				...state,
				error: action.payload,
			};

		case UPDATE_REGION_SUCCESS:
			return {
				...state,
				regions: state.regions.map(region =>
					region.id.toString() === action.payload.id.toString()
						? { region, ...action.payload }
						: region
				),
			};

		case UPDATE_REGION_FAIL:
			return {
				...state,
				error: action.payload,
			};

		case DELETE_REGION_SUCCESS:
			return {
				...state,
				regions: state.regions.filter(
					region => region.id.toString() !== action.payload.id.toString()
				),
			};

		case DELETE_REGION_FAIL:
			return {
				...state,
				error: action.payload,
			};

		default:
			return state;
	}
}

export default regions;