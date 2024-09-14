import { call, put, takeEvery } from "redux-saga/effects";

// Crypto Redux States
import { ADD_NEW_ROLE, DELETE_ROLE, GET_ROLE, GET_ROLES, UPDATE_ROLE } from "./actionType";

import { getRolesSuccess, getRolesFail, getRoleDetailSuccess, getRoleDetailFail, updateRoleSuccess, updateRoleFail, deleteRoleSuccess, deleteRoleFail, addRoleSuccess } from "./actions";

//Include Both Helper File with needed methods

import { deleteRole, getRoles, getShowRole, postRole, putRole } from "../../helpers/backend_role";

function* fetchRoles() {
	try {
		const response = yield call(getRoles);
		yield put(getRolesSuccess(response));
	} catch (error) {
		yield put(getRolesFail(error));
	}
}

function* fetchRoleDetail({ role }) {
	try {
		const response = yield call(getShowRole, role)
		yield put(getRoleDetailSuccess(response))
	} catch (error) {
		yield put(getRoleDetailFail(error))
	}
}

function* onUpdateRole({ payload: role }) {
	try {
		const response = yield call(putRole, role);
		yield put(updateRoleSuccess(response));
	} catch (error) {
		yield put(updateRoleFail(error));
	}
}

function* onDeleteRole({ payload: role }) {
	try {
		const response = yield call(deleteRole, role);
		yield put(deleteRoleSuccess(response));
	} catch (error) {
		yield put(deleteRoleFail(error));
	}
}

function* onAddNewRole({ payload: data }) {
	try {
		const response = yield call(postRole, data.role);
		yield put(addRoleSuccess(response));
		// if (response) {
		// 	data.history.push("/list-users");
		// 	Swal.fire({
		// 		toast: true,
		// 		position: 'top-end',
		// 		text: 'Enregistrement effectué avec success.',
		// 		icon: 'success',
		// 		showConfirmButton: false,
		// 		timer: 5000
		// 	})
		// } else {
		// 	Swal.fire({
		// 		toast: true,
		// 		position: 'top-end',
		// 		text: 'Enregistrement echoué.',
		// 		icon: 'error',
		// 		showConfirmButton: false,
		// 		timer: 5000
		// 	})
		// }

	} catch (error) {
		// yield put(addUtilisateurFail(error));
		// Swal.fire({
		// 	toast: true,
		// 	position: 'top-end',
		// 	text: 'Enregistrement echoué.',
		// 	icon: 'error',
		// 	showConfirmButton: false,
		// 	timer: 5000
		// })
	}
}

function* roleSaga() {
	yield takeEvery(GET_ROLES, fetchRoles);
	yield takeEvery(GET_ROLE, fetchRoleDetail);
	yield takeEvery(ADD_NEW_ROLE, onAddNewRole);
	yield takeEvery(UPDATE_ROLE, onUpdateRole);
	yield takeEvery(DELETE_ROLE, onDeleteRole);
}

export default roleSaga;