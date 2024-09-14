import {
	GET_DEPLACANTS,
	GET_DEPLACANT,
	GET_DEPLACANTS_FAIL,
	GET_DEPLACANTS_SUCCESS,
	ADD_NEW_DEPLACANT,
	ADD_DEPLACANT_SUCCESS,
	ADD_DEPLACANT_FAIL,
	UPDATE_DEPLACANT,
	UPDATE_DEPLACANT_SUCCESS,
	UPDATE_DEPLACANT_FAIL,
	DELETE_DEPLACANT,
	DELETE_DEPLACANT_SUCCESS,
	DELETE_DEPLACANT_FAIL,
	GET_DEPLACANT_SUCCESS,
	GET_DEPLACANT_FAIL,
} from "./actionType"

export const getDeplacants = () => ({
	type: GET_DEPLACANTS,
})

export const getDeplacantsSuccess = deplacants => ({
	type: GET_DEPLACANTS_SUCCESS,
	payload: deplacants,
})

export const getDeplacantDetail = deplacant => ({
	type: GET_DEPLACANT,
	deplacant,
})

export const getDeplacantDetailSuccess = deplacant => ({
	type: GET_DEPLACANT_SUCCESS,
	payload: deplacant,
})

export const getDeplacantDetailFail = error => ({
	type: GET_DEPLACANT_FAIL,
	payload: error,
})

export const getDeplacantsFail = error => ({
	type: GET_DEPLACANTS_FAIL,
	payload: error,
})

export const addNewDeplacant = (deplacant,history) => ({
	type: ADD_NEW_DEPLACANT,
	payload: {deplacant,history},
})

export const addDeplacantSuccess = deplacant => ({
	type: ADD_DEPLACANT_SUCCESS,
	payload: deplacant,
})

export const addDeplacantFail = error => ({
	type: ADD_DEPLACANT_FAIL,
	payload: error,
})

export const updateDeplacant = deplacant => ({
	type: UPDATE_DEPLACANT,
	payload: deplacant,
})

export const updateDeplacantSuccess = deplacant => ({
	type: UPDATE_DEPLACANT_SUCCESS,
	payload: deplacant,
})

export const updateDeplacantFail = error => ({
	type: UPDATE_DEPLACANT_FAIL,
	payload: error,
})

export const deleteDeplacant = deplacant => ({
	type: DELETE_DEPLACANT,
	payload: deplacant,
})

export const deleteDeplacantSuccess = deplacant => ({
	type: DELETE_DEPLACANT_SUCCESS,
	payload: deplacant,
})

export const deleteDeplacantFail = error => ({
	type: DELETE_DEPLACANT_FAIL,
	payload: error,
})

