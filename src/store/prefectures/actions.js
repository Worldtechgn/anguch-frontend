
import { ADD_NEW_PREFECTURE, ADD_PREFECTURE_FAIL, ADD_PREFECTURE_SUCCESS, DELETE_PREFECTURE, DELETE_PREFECTURE_FAIL, DELETE_PREFECTURE_SUCCESS, GET_PREFECTURE, GET_PREFECTURES, GET_PREFECTURES_FAIL, GET_PREFECTURES_SUCCESS, GET_PREFECTURE_FAIL, GET_PREFECTURE_SUCCESS, UPDATE_PREFECTURE, UPDATE_PREFECTURE_FAIL, UPDATE_PREFECTURE_SUCCESS } from "./actionType"

export const getPrefectures = () => ({
	type: GET_PREFECTURES,
})

export const getPrefecturesSuccess = prefectures => ({
	type: GET_PREFECTURES_SUCCESS,
	payload: prefectures,
})

export const getPrefectureDetail = prefecture => ({
	type: GET_PREFECTURE,
	prefecture,
})

export const getPrefectureDetailSuccess = prefecture => ({
	type: GET_PREFECTURE_SUCCESS,
	payload: prefecture,
})

export const getPrefectureDetailFail = error => ({
	type: GET_PREFECTURE_FAIL,
	payload: error,
})

export const getPrefecturesFail = error => ({
	type: GET_PREFECTURES_FAIL,
	payload: error,
})

export const addNewPrefecture = (prefecture, history) => ({
	type: ADD_NEW_PREFECTURE,
	payload: { prefecture, history },
})

export const addPrefectureSuccess = prefecture => ({
	type: ADD_PREFECTURE_SUCCESS,
	payload: prefecture,
})

export const addPrefectureFail = error => ({
	type: ADD_PREFECTURE_FAIL,
	payload: error,
})

export const updatePrefecture = prefecture => ({
	type: UPDATE_PREFECTURE,
	payload: prefecture,
})

export const updatePrefectureSuccess = prefecture => ({
	type: UPDATE_PREFECTURE_SUCCESS,
	payload: prefecture,
})

export const updatePrefectureFail = error => ({
	type: UPDATE_PREFECTURE_FAIL,
	payload: error,
})

export const deletePrefecture = prefecture => ({
	type: DELETE_PREFECTURE,
	payload: prefecture,
})

export const deletePrefectureSuccess = prefecture => ({
	type: DELETE_PREFECTURE_SUCCESS,
	payload: prefecture,
})

export const deletePrefectureFail = error => ({
	type: DELETE_PREFECTURE_FAIL,
	payload: error,
})

export const getPrefectureRegion = prefecture => ({
	type: DELETE_PREFECTURE,
	payload: prefecture,
})
export const getPrefectureRegionSuccess = prefecture => ({
	type: DELETE_PREFECTURE_SUCCESS,
	payload: prefecture,
})
export const getPrefectureRegionFail = error => ({
	type: DELETE_PREFECTURE_FAIL,
	payload: error,
})