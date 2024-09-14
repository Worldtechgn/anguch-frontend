import { call, put, takeEvery } from "redux-saga/effects";

// Crypto Redux States
import {
  GET_PERSONNES,
  GET_MIGRANTS,
  GET_REFUGIES,
  GET_PERSONNE,
  ADD_NEW_PERSONNE,
  UPDATE_PERSONNE,
  DELETE_PERSONNE,
  GET_DEPLACEINTERNE
} from "./actionTypes";

import {
  getPersonnesSuccess,
  getPersonnesFail,
  getRefugiesSuccess,
  getRefugiesFail,
  getMigrantsSuccess,
  getMigrantsFail,
  addPersonneSuccess,
  addPersonneFail,
  updatePersonneSuccess,
  updatePersonneFail,
  deletePersonneSuccess,
  deletePersonneFail,
  getPersonneDetailSuccess,
  getPersonneDetailFail,
  getDeplaceinternesSuccess,
  getDeplaceinternesFail,
} from "./actions";
import {
  addNewPersonne,
  deletePersonne,
  getDeplaceinterne,
  getMigrants,
  getPersonneDetail,
  getPersonnes,
  getRefugies,
  updatePersonne
} from "../../helpers/backend_helper";
import Swal from "sweetalert2";


function* fetchPersonnes() {
  try {
    const response = yield call(getPersonnes);
    yield put(getPersonnesSuccess(response));
  } catch (error) {
    yield put(getPersonnesFail(error));
  }
}


function* fetchRefugies() {
  try {
    const response = yield call(getRefugies);
    yield put(getRefugiesSuccess(response));
  } catch (error) {
    yield put(getRefugiesFail(error));
  }
}

function* fetchDeplaceinternes() {
  try {
    const response = yield call(getDeplaceinterne);
    yield put(getDeplaceinternesSuccess(response));
  } catch (error) {
    yield put(getDeplaceinternesFail(error));
  }
}

function* fetchMigrants() {
  try {
    const response = yield call(getMigrants);
    yield put(getMigrantsSuccess(response));
  } catch (error) {
    yield put(getMigrantsFail(error));
  }
}

function* fetchPersonneDetail({ personne }) {
  try {
    const response = yield call(getPersonneDetail, personne)
    yield put(getPersonneDetailSuccess(response))
  } catch (error) {
    yield put(getPersonneDetailFail(error))
  }
}

function* onUpdatePersonne({ payload: data }) {
  try {
    const response = yield call(updatePersonne, data.personne);
    yield put(updatePersonneSuccess(response));
    data.history.push("/list-refugie");
  } catch (error) {
    yield put(updatePersonneFail(error));
    data.history.push("/list-refugie");
  }
}

function* onDeletePersonne({ payload: personne }) {
  try {
    const response = yield call(deletePersonne, personne);
    yield put(deletePersonneSuccess(response));
  } catch (error) {
    yield put(deletePersonneFail(error));
  }
}

function* onAddNewPersonne({ payload: data }) {
  try {
    const response = yield call(addNewPersonne, data.personne);
    if (response.id) {
      yield put(addPersonneSuccess(response));
      data.history.push("/list-info-personne");
      Swal.fire({
        toast: true,
        position: 'top-end',
        text: 'Enregistrement effectué avec success.',
        icon: 'success',
        showConfirmButton: false,
        timer: 5000
      })
    } else {
      yield put(addPersonneSuccess(response));
      data.history.push("/add-info-personne");
      Swal.fire({
        toast: true,
        position: 'top-end',
        text: 'Cette personne existe déjà',
        icon: 'error',
        showConfirmButton: false,
        timer: 5000
      })
    }

  } catch (error) {
    yield put(addPersonneFail(error));
    data.history.push("/add-info-personne");
  }
}

function* personneSaga() {

  yield takeEvery(GET_DEPLACEINTERNE, fetchDeplaceinternes);
  yield takeEvery(GET_PERSONNES, fetchPersonnes);
  yield takeEvery(GET_REFUGIES, fetchRefugies);
  yield takeEvery(GET_MIGRANTS, fetchMigrants);
  yield takeEvery(GET_PERSONNE, fetchPersonneDetail);
  yield takeEvery(ADD_NEW_PERSONNE, onAddNewPersonne);
  yield takeEvery(UPDATE_PERSONNE, onUpdatePersonne);
  yield takeEvery(DELETE_PERSONNE, onDeletePersonne);
}

export default personneSaga;