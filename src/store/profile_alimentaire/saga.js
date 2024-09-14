import { call, put, takeEvery } from "redux-saga/effects"
import { 
    deleteProfileAlimentaire, 
    getProfileAlimentaireBackend, 
    getShowProfileAlimentaire, 
    postProfileAlimentaire, 
    putProfileAlimentaire 
} from "../../helpers/backend_ profile_alimentaire"

import { 
    delProfileAlimentaireSuccess, 
    getProfileAlimentaireActionError, 
    getProfileAlimentaireActionSuccess, 
    getShowProfileAlimentaireError, 
    getShowProfileAlimentaireSuccess, 
    postProfileAlimentaireError, 
    postProfileAlimentaireSuccess, 
    putProfileAlimentaireError, 
    putProfileAlimentaireSuccess } from "./action"

import { 
    DEL_PROFILE_ALIMENTAIRES,
    GET_PROFILE_ALIMENTAIRES, 
    POST_PROFILE_ALIMENTAIRES, 
    PUT_PROFILE_ALIMENTAIRES, 
    SHOW_PROFILE_ALIMENTAIRE,
} from "./actionType"

function* getSagaAllProfileAlimentaires(){
    const profileAlimentaires = yield call(getProfileAlimentaireBackend)
    try {
        yield put(getProfileAlimentaireActionSuccess(profileAlimentaires))
    } catch (error) {
        yield put(getProfileAlimentaireActionError(error))
    }
}

function* postSagaProfileAlimentaires({payload:data}){
    const _profileAlimentaire = yield call(postProfileAlimentaire, data.profileAlimentaire)
    try {
        yield put(postProfileAlimentaireSuccess(_profileAlimentaire))
    } catch (error) {
        yield put(postProfileAlimentaireError(error))
    }
}

function* getSagaDetailProfileAlimentaire({payload:data}){
    const _profileAlimentaire = yield call(getShowProfileAlimentaire, data)
    try {
        yield put(getShowProfileAlimentaireSuccess(_profileAlimentaire))
    } catch (error) {
        yield put(getShowProfileAlimentaireError(error))
    }
}

function* putSagaProfileAlimentaires({payload:data}){
    const _profileAlimentaire = yield call(putProfileAlimentaire, data.ProfileAlimentaire)
    try {
        yield put(putProfileAlimentaireSuccess(_profileAlimentaire))
    } catch (error) {
        yield put(putProfileAlimentaireError(error))
    }
}

function* delSagaProfileAlimentaires({payload: data}){
    const profileAlimentaire = yield call(deleteProfileAlimentaire, data.ProfileAlimentaire)
    try {
        yield put(delProfileAlimentaireSuccess(profileAlimentaire))
    } catch (error) {
        yield put(delProfileAlimentaireSuccess(error))
    }
}

function* SagaProfileAlimentaire() {
    yield takeEvery(GET_PROFILE_ALIMENTAIRES, getSagaAllProfileAlimentaires)
    yield takeEvery(POST_PROFILE_ALIMENTAIRES, postSagaProfileAlimentaires)
    yield takeEvery(PUT_PROFILE_ALIMENTAIRES, putSagaProfileAlimentaires)
    yield takeEvery(DEL_PROFILE_ALIMENTAIRES, delSagaProfileAlimentaires)
    yield takeEvery(SHOW_PROFILE_ALIMENTAIRE, getSagaDetailProfileAlimentaire)
}

export default SagaProfileAlimentaire