import { ADD_NEW_REGION, ADD_REGION_FAIL, ADD_REGION_SUCCESS, DELETE_REGION, DELETE_REGION_FAIL, DELETE_REGION_SUCCESS, GET_REGION, GET_REGIONS, GET_REGIONS_FAIL, GET_REGIONS_SUCCESS, GET_REGION_FAIL, GET_REGION_SUCCESS, UPDATE_REGION, UPDATE_REGION_FAIL, UPDATE_REGION_SUCCESS } from "./actionType"

export const getRegions = () => ({
	type: GET_REGIONS,
})

export const getRegionsSuccess = regions => ({
	type: GET_REGIONS_SUCCESS,
	payload: regions,
})

export const getRegionDetail = region => ({
	type: GET_REGION,
	region,
})

export const getRegionDetailSuccess = region => ({
	type: GET_REGION_SUCCESS,
	payload: region,
})

export const getRegionDetailFail = error => ({
	type: GET_REGION_FAIL,
	payload: error,
})

export const getRegionsFail = error => ({
	type: GET_REGIONS_FAIL,
	payload: error,
})

export const addNewRegion = (region, history) => ({
	type: ADD_NEW_REGION,
	payload: { region, history },
})

export const addRegionSuccess = region => ({
	type: ADD_REGION_SUCCESS,
	payload: region,
})

export const addRegionFail = error => ({
	type: ADD_REGION_FAIL,
	payload: error,
})

export const updateRegion = region => ({
	type: UPDATE_REGION,
	payload: region,
})

export const updateRegionSuccess = region => ({
	type: UPDATE_REGION_SUCCESS,
	payload: region,
})

export const updateRegionFail = error => ({
	type: UPDATE_REGION_FAIL,
	payload: error,
})

export const deleteRegion = region => ({
	type: DELETE_REGION,
	payload: region,
})

export const deleteRegionSuccess = region => ({
	type: DELETE_REGION_SUCCESS,
	payload: region,
})

export const deleteRegionFail = error => ({
	type: DELETE_REGION_FAIL,
	payload: error,
})

