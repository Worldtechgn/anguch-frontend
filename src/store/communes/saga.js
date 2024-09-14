import { call, put, takeEvery } from "redux-saga/effects";

// Crypto Redux States
import { ADD_NEW_COMMUNE, DELETE_COMMUNE, GET_COMMUNES, UPDATE_COMMUNE } from "./actionType";

import { getCommunesSuccess, getCommunesFail, updateCommuneSuccess, updateCommuneFail, deleteCommuneSuccess, deleteCommuneFail, addCommuneSuccess } from "./actions";

//Include Both Helper File with needed methods

import { deleteCommune, getCommunes, postCommune, putCommune } from "../../helpers/backend_commune";
import Swal from "sweetalert2";

function* fetchCommunes() {
	try {
		const response = yield call(getCommunes);
		yield put(getCommunesSuccess(response));
	} catch (error) {
		yield put(getCommunesFail(error));
	}
}


function* onUpdateCommune({ payload: commune }) {
	try {
		const response = yield call(putCommune, commune);
		yield put(updateCommuneSuccess(response));
	} catch (error) {
		yield put(updateCommuneFail(error));
	}
}

function* onDeleteCommune({ payload: commune }) {
	try {
		const response = yield call(deleteCommune, commune);
		yield put(deleteCommuneSuccess(response));
	} catch (error) {
		yield put(deleteCommuneFail(error));
	}
}

function* onAddNewCommune({ payload: data }) {
	try {
		const response = yield call(postCommune, data.commune);
		if (response.status === 204) {
			Swal.fire({
				toast: true,
				position: 'top-end',
				text: response.message,
				icon: 'info',
				showConfirmButton: false,
				timer: 5000
			});
		} else {
			yield put(addCommuneSuccess(response));
			Swal.fire({
				toast: true,
				position: 'top-end',
				text: "Enregistrement effectué avec success.",
				icon: 'success',
				showConfirmButton: false,
				timer: 5000
			});
		}

	} catch (error) {
		Swal.fire({
			toast: true,
			position: 'top-end',
			text: "Echec de l'Enregistrement.",
			icon: 'error',
			showConfirmButton: false,
			timer: 5000
		})
	}
}

function* communeSaga() {
	yield takeEvery(GET_COMMUNES, fetchCommunes);
	yield takeEvery(ADD_NEW_COMMUNE, onAddNewCommune);
	yield takeEvery(UPDATE_COMMUNE, onUpdateCommune);
	yield takeEvery(DELETE_COMMUNE, onDeleteCommune);
}

export default communeSaga;