
import { ADD_NEW_COMMUNE, ADD_COMMUNE_FAIL, ADD_COMMUNE_SUCCESS, DELETE_COMMUNE, DELETE_COMMUNE_FAIL, DELETE_COMMUNE_SUCCESS, GET_COMMUNE, GET_COMMUNES, GET_COMMUNES_FAIL, GET_COMMUNES_SUCCESS, GET_COMMUNE_FAIL, GET_COMMUNE_SUCCESS, UPDATE_COMMUNE, UPDATE_COMMUNE_FAIL, UPDATE_COMMUNE_SUCCESS, GET_COMMUNE_PREFECTURE, GET_COMMUNE_PREFECTURE_SUCCESS, GET_COMMUNE_PREFECTURE_FAIL } from "./actionType"

export const getCommunes = () => ({
	type: GET_COMMUNES,
})

export const getCommunesSuccess = communes => ({
	type: GET_COMMUNES_SUCCESS,
	payload: communes,
})

export const getCommuneDetail = commune => ({
	type: GET_COMMUNE,
	commune,
})

export const getCommuneDetailSuccess = commune => ({
	type: GET_COMMUNE_SUCCESS,
	payload: commune,
})

export const getCommuneDetailFail = error => ({
	type: GET_COMMUNE_FAIL,
	payload: error,
})

export const getCommunesFail = error => ({
	type: GET_COMMUNES_FAIL,
	payload: error,
})

export const addNewCommune = (commune, history) => ({
	type: ADD_NEW_COMMUNE,
	payload: { commune, history },
})

export const addCommuneSuccess = commune => ({
	type: ADD_COMMUNE_SUCCESS,
	payload: commune,
})

export const addCommuneFail = error => ({
	type: ADD_COMMUNE_FAIL,
	payload: error,
})

export const updateCommune = commune => ({
	type: UPDATE_COMMUNE,
	payload: commune,
})

export const updateCommuneSuccess = commune => ({
	type: UPDATE_COMMUNE_SUCCESS,
	payload: commune,
})

export const updateCommuneFail = error => ({
	type: UPDATE_COMMUNE_FAIL,
	payload: error,
})

export const deleteCommune = commune => ({
	type: DELETE_COMMUNE,
	payload: commune,
})

export const deleteCommuneSuccess = commune => ({
	type: DELETE_COMMUNE_SUCCESS,
	payload: commune,
})

export const deleteCommuneFail = error => ({
	type: DELETE_COMMUNE_FAIL,
	payload: error,
})

export const getCommunePrefecture = prefectures => ({
	type: GET_COMMUNE_PREFECTURE,
	payload: prefectures
})
export const getCommunePrefectureSuccess = prefectures => ({
	type: GET_COMMUNE_PREFECTURE_SUCCESS,
	payload: prefectures
})
export const getCommunePrefectureError = prefectures => ({
	type: GET_COMMUNE_PREFECTURE_FAIL,
	payload: prefectures
})
