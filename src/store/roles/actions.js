
import { ADD_NEW_ROLE, ADD_ROLE_FAIL, ADD_ROLE_SUCCESS, DELETE_ROLE, DELETE_ROLE_FAIL, DELETE_ROLE_SUCCESS, GET_ROLE, GET_ROLES, GET_ROLES_FAIL, GET_ROLES_SUCCESS, GET_ROLE_FAIL, GET_ROLE_SUCCESS, UPDATE_ROLE, UPDATE_ROLE_FAIL, UPDATE_ROLE_SUCCESS } from "./actionType"

export const getRoles = () => ({
	type: GET_ROLES,
})

export const getRolesSuccess = roles => ({
	type: GET_ROLES_SUCCESS,
	payload: roles,
})

export const getRoleDetail = role => ({
	type: GET_ROLE,
	role,
})

export const getRoleDetailSuccess = role => ({
	type: GET_ROLE_SUCCESS,
	payload: role,
})

export const getRoleDetailFail = error => ({
	type: GET_ROLE_FAIL,
	payload: error,
})

export const getRolesFail = error => ({
	type: GET_ROLES_FAIL,
	payload: error,
})

export const addNewRole = (role, history) => ({
	type: ADD_NEW_ROLE,
	payload: { role, history },
})

export const addRoleSuccess = role => ({
	type: ADD_ROLE_SUCCESS,
	payload: role,
})

export const addRoleFail = error => ({
	type: ADD_ROLE_FAIL,
	payload: error,
})

export const updateRole = role => ({
	type: UPDATE_ROLE,
	payload: role,
})

export const updateRoleSuccess = role => ({
	type: UPDATE_ROLE_SUCCESS,
	payload: role,
})

export const updateRoleFail = error => ({
	type: UPDATE_ROLE_FAIL,
	payload: error,
})

export const deleteRole = role => ({
	type: DELETE_ROLE,
	payload: role,
})

export const deleteRoleSuccess = role => ({
	type: DELETE_ROLE_SUCCESS,
	payload: role,
})

export const deleteRoleFail = error => ({
	type: DELETE_ROLE_FAIL,
	payload: error,
})

