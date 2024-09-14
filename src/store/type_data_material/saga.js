import { call, put, takeEvery } from "redux-saga/effects";
import { 
    getCatastrophes, 
    getDenres, 
    getMaterials 
} from "../../helpers/backend_type_data_catastrophe";

import { 
    getlisteCatastropheFail, 
    getListeCatastropheSucess, 
    getListeDenreFail, 
    getListeDenresSuccess,
    getListeMaterielsSuccess,
    getListeMaterielsFail
} from "./action";

import { 
    LIST_CATASTROPHES, 
    LIST_DENRES, 
    LIST_MATERIELS 
} from "./actionType";

function* fetchCatastrophe(){
    const catastrophes = yield call(getCatastrophes)
    try {
        yield put(getListeCatastropheSucess(catastrophes))
    } catch (error) {
        yield put(getlisteCatastropheFail(error))
    }
}

function* fetchDenre(){
    const denres = yield call(getDenres)
    try {
        yield put(getListeDenresSuccess(denres))
    } catch (error) {
        yield put(getListeDenreFail(error))
    }
}

function* fetchMateriel(){
    const materiels = yield call(getMaterials)
    try {
        yield put(getListeMaterielsSuccess(materiels))
    } catch (error) {
        yield put(getListeMaterielsFail(error))
    }
}

function* SagaTypeDataMateriel() {
    yield takeEvery(LIST_CATASTROPHES, fetchCatastrophe)
    yield takeEvery(LIST_MATERIELS, fetchDenre)
    yield takeEvery(LIST_DENRES, fetchMateriel)
}

export default SagaTypeDataMateriel