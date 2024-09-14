import { call, put, takeEvery } from "redux-saga/effects";

// Crypto Redux States
import { ADD_NEW_REGION, DELETE_REGION, GET_REGIONS, UPDATE_REGION } from "./actionType";

import { addRegionFail, addRegionSuccess, deleteRegionFail, deleteRegionSuccess, getRegionsFail, getRegionsSuccess, updateRegionFail } from "./actions";

//Include Both Helper File with needed methods

import { deleteRegion, getRegions, postRegion, putRegion } from "../../helpers/backend_region";
import Swal from "sweetalert2";

function* fetchRegion() {
	try {
		const response = yield call(getRegions);
		yield put(getRegionsSuccess(response));
	} catch (error) {
		yield put(getRegionsFail(error));
	}
}


function* onUpdateRegion({ payload: region }) {
	try {
		const response = yield call(putRegion, region);
		yield put(getRegionsSuccess(response));

	} catch (error) {
		yield put(updateRegionFail(error));
	}
}

function* onDeleteRegion({ payload: region }) {
	try {
		const response = yield call(deleteRegion, region);
		yield put(deleteRegionSuccess(response));
	} catch (error) {
		yield put(deleteRegionFail(error));
	}
}

function* onAddNewRegion({ payload: data }) {
	try {
		const response = yield call(postRegion, data.region);
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
			yield put(addRegionSuccess(response));
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
		yield put(addRegionFail(error));
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

function* regionsSaga() {
	yield takeEvery(GET_REGIONS, fetchRegion);
	yield takeEvery(ADD_NEW_REGION, onAddNewRegion);
	yield takeEvery(UPDATE_REGION, onUpdateRegion);
	yield takeEvery(DELETE_REGION, onDeleteRegion);
}

export default regionsSaga;