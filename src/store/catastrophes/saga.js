import { call, put, takeEvery } from "redux-saga/effects"
import Swal from "sweetalert2"
import { 
    getShowCatastrophe,
    getCatastrophesBackend,
    postCatastrophes,
    putCatastrophes,
    deleteCatastrophes,
    getCatastrophesWithPaginateBackend,
 } from "../../helpers/backend_catastrophe"

import { 
    delCatastropheSuccess,
    getCatastropheActionError,
    getCatastropheActionSuccess,
    getShowCatastropheError,
    getShowCatastropheSuccess,
    getWithPaginateCatastropheActionError,
    getWithPaginateCatastropheActionSuccess,
    postCatastropheError, 
    postCatastropheSuccess, 
    putCatastropheError, 
    putCatastropheSuccess 
} from "./action"

import { 
    DEL_CATASTROPHES,  
    GET_CATASTROPHES, 
    GET_WITH_PAGINATE_CATASTROPHES, 
    POST_CATASTROPHES, 
    PUT_CATASTROPHES, 
    SHOW_CATASTROPHE
} from "./actionType"

function* getSagaAllCatastrophes(){
    const catastrophes = yield call(getCatastrophesBackend)
    try {
        yield put(getCatastropheActionSuccess(catastrophes))
    } catch (error) {
        yield put(getCatastropheActionError(error))
    }
}

function* getSagaAllCatastrophesWithPagination({payload: data}){
    const catastrophes = yield call(getCatastrophesWithPaginateBackend,data.page, data.limit)
    try {
        yield put(getWithPaginateCatastropheActionSuccess(catastrophes))
    } catch (error) {
        yield put(getWithPaginateCatastropheActionError(error))
    }
}

function* postSagaCatastrophes({payload:data}){
    const _catastrophe = yield call(postCatastrophes, data.catastrophe)
    try {
        yield put(postCatastropheSuccess(_catastrophe))
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            toast: true,
            title: 'Operation effectuée avec success',
            showConfirmButton: false,
            timer: 3500
        })
        data.history.push('/liste-catastrophe')
    } catch (error) {
        yield put(postCatastropheError(error))
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            toast: true,
            title: 'Opération echoué',
            showConfirmButton: false,
            timer: 3500
        })
    }
}

function* getSagaDetailCatastrophe({payload:data}){
    const _catastrophe = yield call(getShowCatastrophe, data)
    try {
        yield put(getShowCatastropheSuccess(_catastrophe))
    } catch (error) {
        yield put(getShowCatastropheError(error))
    }
}

function* putSagaCatastrophes({payload:data}){
    const _catastrophe = yield call(putCatastrophes,data.id, data.catastrophe)
    try {
        yield put(putCatastropheSuccess(_catastrophe))
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            toast: true,
            title: 'Operation effectuée avec success',
            showConfirmButton: false,
            timer: 3500
        })
        data.history.push('/liste-catastrophe')
    } catch (error) {

        yield put(putCatastropheError(error))
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            toast: true,
            title: 'Opération echoué',
            showConfirmButton: false,
            timer: 3500
        })
    }
}

function* delSagaCatastrophes({payload: data}){
    const catastrophe = yield call(deleteCatastrophes, data.catastrophe)
    try {
        yield put(delCatastropheSuccess(catastrophe))
    } catch (error) {
        yield put(delCatastropheSuccess(error))
    }
}

function* SagaCatastrophe() {
    yield takeEvery(GET_CATASTROPHES, getSagaAllCatastrophes)
    yield takeEvery(POST_CATASTROPHES, postSagaCatastrophes)
    yield takeEvery(PUT_CATASTROPHES, putSagaCatastrophes)
    yield takeEvery(DEL_CATASTROPHES, delSagaCatastrophes)
    yield takeEvery(SHOW_CATASTROPHE, getSagaDetailCatastrophe)
    yield takeEvery(GET_WITH_PAGINATE_CATASTROPHES, getSagaAllCatastrophesWithPagination)
}

export default SagaCatastrophe