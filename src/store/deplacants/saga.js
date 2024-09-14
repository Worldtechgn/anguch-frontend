import { call, put, takeEvery } from "redux-saga/effects";

// Crypto Redux States
import {
	GET_DEPLACANTS,
	GET_DEPLACANT,
	ADD_NEW_DEPLACANT,
	DELETE_DEPLACANT
} from "./actionType";

import {
	getDeplacantsSuccess,
	getDeplacantsFail,
	addDeplacantSuccess,
	addDeplacantFail,
	deleteDeplacantSuccess,
	deleteDeplacantFail,
	getDeplacantDetailSuccess,
	getDeplacantDetailFail,
} from "./actions";

//Include Both Helper File with needed methods
import {
	getDeplacants,
	deleteDeplacant,
	getDeplacantDetail,
	addNewDeplacant,
} from "../../helpers/backend_helper";
import Swal from "sweetalert2";

function* fetchDeplacants() {
	try {
		const response = yield call(getDeplacants);
		yield put(getDeplacantsSuccess(response));
	} catch (error) {
		yield put(getDeplacantsFail(error));
	}
}

function* fetchDeplacantDetail({ deplacant }) {
	try {
		const response = yield call(getDeplacantDetail, deplacant)
		yield put(getDeplacantDetailSuccess(response))
	} catch (error) {
		yield put(getDeplacantDetailFail(error))
	}
}
function* onDeleteDeplacant({ payload: deplacant }) {
	try {
		const response = yield call(deleteDeplacant, deplacant);
		yield put(deleteDeplacantSuccess(response));
	} catch (error) {
		yield put(deleteDeplacantFail(error));
	}
}

function* onAddNewDeplacant({ payload: data }) {

	try {
		const response = yield call(addNewDeplacant, data.deplacant);
		if (response.uuid) {
			yield put(addDeplacantSuccess(response));
			data.history.push("/list-deplacement")
			Swal.fire({
				toast: true,
				position: 'top-end',
				text: 'Enregistrement effectué avec success.',
				icon: 'success',
				showConfirmButton: false,
				timer: 5000
			})
		} else {
			yield put(addDeplacantSuccess(response));
			data.history.push("/add-deplacement")
			Swal.fire({
				toast: true,
				position: 'top-end',
				text: 'Enregistrement echoué avec success.',
				icon: 'error',
				showConfirmButton: false,
				timer: 5000
			})
		}

	} catch (error) {
		yield put(addDeplacantFail(error));
	}
}

function* deplacantsSaga() {
	yield takeEvery(GET_DEPLACANTS, fetchDeplacants);
	yield takeEvery(GET_DEPLACANT, fetchDeplacantDetail);
	yield takeEvery(ADD_NEW_DEPLACANT, onAddNewDeplacant);
	yield takeEvery(DELETE_DEPLACANT, onDeleteDeplacant);
}

export default deplacantsSaga;