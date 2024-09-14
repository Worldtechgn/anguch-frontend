import { call, put, takeEvery } from "redux-saga/effects";

// Crypto Redux States
import {
	GET_UTILISATEURS,
	ADD_NEW_UTILISATEUR,
	UPDATE_UTILISATEUR,
	DELETE_UTILISATEUR,
	PROFILE_NEW_UTILISATEUR,
	PASSWORD_NEW_UTILISATEUR
} from "./actionType";

import {
	getUtilisateursSuccess,
	getUtilisateursFail,
	addUtilisateurSuccess,
	addUtilisateurFail,
	updateUtilisateurFail,
	deleteUtilisateurSuccess,
	deleteUtilisateurFail,
	profileUtilisateurSuccess,
	profileUtilisateurFail,
	passwordUtilisateurSuccess,
	passwordUtilisateurFail,
} from "./actions";

//Include Both Helper File with needed methods

import {
	addNewUtilisateur,
	deleteUtilisateur,
	getUtilisateurs,
	updateCustomer,
	updatePassword,
	updateProfile,
} from "../../helpers/backend_user";
import Swal from "sweetalert2";

function* fetchUtilisateur() {
	try {
		const response = yield call(getUtilisateurs);
		yield put(getUtilisateursSuccess(response));
	} catch (error) {
		yield put(getUtilisateursFail(error));
	}
}


function* onUpdateUtilisateur({ payload: utilisateur }) {
	try {
		const response = yield call(updateCustomer, utilisateur);
		yield put(getUtilisateursSuccess(response));
		Swal.fire({
			toast: true,
			position: 'top-end',
			text: 'Modification effectué avec success.',
			icon: 'success',
			showConfirmButton: false,
			timer: 5000
		})

	} catch (error) {
		yield put(updateUtilisateurFail(error));
		Swal.fire({
			toast: true,
			position: 'top-end',
			text: 'Échec de la modification',
			icon: 'error',
			showConfirmButton: false,
			timer: 5000
		})
	}
}

function* onUpdateProfileUtilisateur({ payload: utilisateur }) {
	try {
		const response = yield call(updateProfile, utilisateur);
		yield put(profileUtilisateurSuccess(response));
		Swal.fire({
			toast: true,
			position: 'top-end',
			text: 'Modification effectué avec succès.',
			icon: 'success',
			showConfirmButton: false,
			timer: 5000
		})

	} catch (error) {
		yield put(profileUtilisateurFail(error));
		Swal.fire({
			toast: true,
			position: 'top-end',
			text: 'Échec de la modification',
			icon: 'error',
			showConfirmButton: false,
			timer: 5000
		})
	}
}

function* onUpdatePasswordUtilisateur({ payload: utilisateur }) {
	try {
		const response = yield call(updatePassword, utilisateur);
		if (response.status === 422) {
			Swal.fire({
				toast: true,
				position: 'top-end',
				text: response.message,
				icon: 'info',
				showConfirmButton: false,
				timer: 5000
			})
		} else {
			yield put(passwordUtilisateurSuccess(response));
			Swal.fire({
				toast: true,
				position: 'top-end',
				text: 'Votre mot de passe à été changé avec succès.',
				icon: 'success',
				showConfirmButton: false,
				timer: 5000
			})
		}


	} catch (error) {
		yield put(passwordUtilisateurFail(error));
		Swal.fire({
			toast: true,
			position: 'top-end',
			text: 'ancien mot de passe incorrect',
			icon: 'error',
			showConfirmButton: false,
			timer: 5000
		})
	}
}

function* onDeleteUtilisateur({ payload: utilisateur }) {
	try {
		const response = yield call(deleteUtilisateur, utilisateur);
		yield put(deleteUtilisateurSuccess(response));
	} catch (error) {
		yield put(deleteUtilisateurFail(error));
	}
}

function* onAddNewUtilisateur({ payload: data }) {
	try {
		const response = yield call(addNewUtilisateur, data.utilisateur);
		if (response.status !== 204) {
			yield put(addUtilisateurSuccess(response));
			Swal.fire({
				toast: true,
				position: 'top-end',
				text: 'Enregistrement effectué avec success.',
				icon: 'success',
				showConfirmButton: false,
				timer: 5000
			})
		}

	} catch (error) {
		yield put(addUtilisateurFail(error));
		Swal.fire({
			toast: true,
			position: 'top-end',
			text: "Échec de l'enregistrement",
			icon: 'error',
			showConfirmButton: false,
			timer: 5000
		})
	}
}

function* utilisateurSaga() {
	yield takeEvery(GET_UTILISATEURS, fetchUtilisateur);
	yield takeEvery(PROFILE_NEW_UTILISATEUR, onUpdateProfileUtilisateur);
	yield takeEvery(PASSWORD_NEW_UTILISATEUR, onUpdatePasswordUtilisateur);
	yield takeEvery(ADD_NEW_UTILISATEUR, onAddNewUtilisateur);
	yield takeEvery(UPDATE_UTILISATEUR, onUpdateUtilisateur);
	yield takeEvery(DELETE_UTILISATEUR, onDeleteUtilisateur);
}

export default utilisateurSaga;