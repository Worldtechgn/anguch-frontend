import { call, put, takeEvery } from "redux-saga/effects";

// Crypto Redux States
import { ADD_NEW_PREFECTURE, DELETE_PREFECTURE, GET_PREFECTURES, UPDATE_PREFECTURE } from "./actionType";

import { getPrefecturesSuccess, getPrefecturesFail, updatePrefectureSuccess, updatePrefectureFail, deletePrefectureSuccess, deletePrefectureFail, addPrefectureSuccess } from "./actions";

//Include Both Helper File with needed methods

import { deletePrefecture, getPrefectures, postPrefecture, putPrefecture } from "../../helpers/backend_prefecture";
import Swal from "sweetalert2";

function* fetchPrefectures() {
	try {
		const response = yield call(getPrefectures);
		yield put(getPrefecturesSuccess(response));
	} catch (error) {
		yield put(getPrefecturesFail(error));
	}
}


function* onUpdatePrefecture({ payload: prefecture }) {
	try {
		const response = yield call(putPrefecture, prefecture);
		yield put(updatePrefectureSuccess(response));
	} catch (error) {
		yield put(updatePrefectureFail(error));
	}
}

function* onDeletePrefecture({ payload: prefecture }) {
	try {
		const response = yield call(deletePrefecture, prefecture);
		yield put(deletePrefectureSuccess(response));
	} catch (error) {
		yield put(deletePrefectureFail(error));
	}
}

function* onAddNewPrefecture({ payload: data }) {
	try {
		const response = yield call(postPrefecture, data.prefecture);
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
			yield put(addPrefectureSuccess(response));
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

function* prefectureSaga() {
	yield takeEvery(GET_PREFECTURES, fetchPrefectures);
	yield takeEvery(ADD_NEW_PREFECTURE, onAddNewPrefecture);
	yield takeEvery(UPDATE_PREFECTURE, onUpdatePrefecture);
	yield takeEvery(DELETE_PREFECTURE, onDeletePrefecture);
}

export default prefectureSaga;