import { call, put, takeEvery } from "redux-saga/effects"
import { deleteProduitBackend, getProduitBackend, getShowProduitBackend, postProduitBackend, putProduitBackend } from "../../helpers/backend_produit"


import { 
    delProduitError, 
    delProduitSuccess, 
    getProduitError, 
    getProduitSuccess, 
    getShowProduitError, 
    getShowProduitSuccess, 
    postProduitError, 
    postProduitSuccess, 
    putProduitError, 
    putProduitSuccess 
} from "./action"

import { 
    DEL_PRODUIT, 
    GET_PRODUIT, 
    POST_PRODUIT, 
    PUT_PRODUIT, 
    SHOW_PRODUIT 
} from "./actionType"

function* getSagaAllProduits(){
    const produits = yield call(getProduitBackend)
    try {
        yield put(getProduitSuccess(produits))
    } catch (error) {
        yield put(getProduitError(error))
    }
}

function* postSagaProduit({payload:data}){
    const _produit = yield call(postProduitBackend, data.produit)
    try {
        yield put(postProduitSuccess(_produit))
    } catch (error) {
        yield put(postProduitError(error))
    }
}

function* getSagaDetailProduit({payload:data}){
    const _produit = yield call(getShowProduitBackend, data)
    try {
        yield put(getShowProduitSuccess(_produit))
    } catch (error) {
        yield put(getShowProduitError(error))
    }
}

function* putSagaProduit({payload:data}){
    const _produit = yield call(putProduitBackend, data.prixProduit)
    try {
        yield put(putProduitSuccess(_produit))
    } catch (error) {
        yield put(putProduitError(error))
    }
}

function* delSagaProduits({payload: data}){
    const produit = yield call(deleteProduitBackend, data.produit)
    try {
        yield put(delProduitSuccess(produit))
    } catch (error) {
        yield put(delProduitError(error))
    }
}

function* SagaProduit() {
    yield takeEvery(GET_PRODUIT, getSagaAllProduits)
    yield takeEvery(POST_PRODUIT, postSagaProduit)
    yield takeEvery(PUT_PRODUIT, putSagaProduit)
    yield takeEvery(DEL_PRODUIT, delSagaProduits)
    yield takeEvery(SHOW_PRODUIT,getSagaDetailProduit)
}

export default SagaProduit