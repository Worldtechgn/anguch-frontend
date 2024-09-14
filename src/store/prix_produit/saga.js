import { call, put, takeEvery } from "redux-saga/effects"
import { 
    deletePrixProduitBackend, 
    getPrixProduitBackend, 
    getShowPrixProduitBackend, 
    postPrixProduitBackend, 
    putPrixProduitBackend 
} from "../../helpers/backend_prix_produit"

import { 
    delPrixProduitError, 
    delPrixProduitSuccess, 
    getPrixProduitError, 
    getPrixProduitSuccess, 
    getShowPrixProduitError, 
    getShowPrixProduitSuccess, 
    postPrixProduitError, 
    postPrixProduitSuccess, 
    putPrixProduitError, 
    putPrixProduitSuccess 
} from "./action"

import { 
    DEL_PRIX_PRODUIT, 
    GET_PRIX_PRODUIT, 
    POST_PRIX_PRODUIT, 
    PUT_PRIX_PRODUIT, 
    SHOW_PRIX_PRODUIT 
} from "./actionType"

function* getSagaAllPrixProduits(){
    const prixProduits = yield call(getPrixProduitBackend)
    try {
        yield put(getPrixProduitSuccess(prixProduits))
    } catch (error) {
        yield put(getPrixProduitError(error))
    }
}

function* postSagaPrixProduit({payload:data}){
    const _prix_produit = yield call(postPrixProduitBackend, data.prixProduit)
    try {
        yield put(postPrixProduitSuccess(_prix_produit))
    } catch (error) {
        yield put(postPrixProduitError(error))
    }
}

function* getSagaDetailPrixProduit({payload:data}){
    const _prix_produit = yield call(getShowPrixProduitBackend, data)
    try {
        yield put(getShowPrixProduitSuccess(_prix_produit))
    } catch (error) {
        yield put(getShowPrixProduitError(error))
    }
}

function* putSagaPrixProduit({payload:data}){
    const _prix_produit = yield call(putPrixProduitBackend, data.prixProduit)
    try {
        yield put(putPrixProduitSuccess(_prix_produit))
    } catch (error) {
        yield put(putPrixProduitError(error))
    }
}

function* delSagaPrixProduits({payload: data}){
    const prixProduit = yield call(deletePrixProduitBackend, data.prixProduit)
    try {
        yield put(delPrixProduitSuccess(prixProduit))
    } catch (error) {
        yield put(delPrixProduitError(error))
    }
}

function* SagaPrixProduit() {
    yield takeEvery(GET_PRIX_PRODUIT, getSagaAllPrixProduits)
    yield takeEvery(POST_PRIX_PRODUIT, postSagaPrixProduit)
    yield takeEvery(PUT_PRIX_PRODUIT, putSagaPrixProduit)
    yield takeEvery(DEL_PRIX_PRODUIT, delSagaPrixProduits)
    yield takeEvery(SHOW_PRIX_PRODUIT,getSagaDetailPrixProduit)
}

export default SagaPrixProduit