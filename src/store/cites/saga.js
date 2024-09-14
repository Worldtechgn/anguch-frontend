import { call, put, takeEvery } from "redux-saga/effects";

// Crypto Redux States
import {
    GET_SITES,
    GET_SITE,
    ADD_NEW_SITE,
    UPDATE_SITE,
    DELETE_SITE
} from "./typeAction";

import {
    getSitesSuccess,
    getSitesFail,
    addSiteSuccess,
    addSiteFail,
    updateSiteSuccess,
    updateSiteFail,
    deleteSiteSuccess,
    deleteSiteFail,
    getSiteDetailSuccess,
    getSiteDetailFail,
} from "./actions";

//Include Both Helper File with needed methods

import {
    addNewSite,
    deleteSite,
    getSiteDetail,
    getSites,
    updateSite
} from "../../helpers/backend_helper";

function* fetchSites() {
    try {
        const response = yield call(getSites);
        yield put(getSitesSuccess(response));
    } catch (error) {
        yield put(getSitesFail(error));
    }
}

function* fetchSiteDetail({ site }) {
    try {
        const response = yield call(getSiteDetail, site)
        yield put(getSiteDetailSuccess(response))
    } catch (error) {
        yield put(getSiteDetailFail(error))
    }
}

function* onUpdateSite({ payload: site }) {
    try {
        const response = yield call(updateSite, site);
        yield put(updateSiteSuccess(response));
    } catch (error) {
        yield put(updateSiteFail(error));
    }
}

function* onDeleteSite({ payload: site }) {
    try {
        const response = yield call(deleteSite, site);
        yield put(deleteSiteSuccess(response));
    } catch (error) {
        yield put(deleteSiteFail(error));
    }
}

function* onAddNewSite({ payload: data }) {
    try {
        const response = yield call(addNewSite, data.site);
        if (response.code) {
            yield put(addSiteSuccess(response));
            data.history.push("/site-inondable")
        } else {
            yield put(addSiteSuccess(response));
            data.history.push("/add-site-inondable")
        }

    } catch (error) {
        yield put(addSiteFail(error));
    }
}

function* sitesSaga() {
    yield takeEvery(GET_SITES, fetchSites);
    yield takeEvery(GET_SITE, fetchSiteDetail);
    yield takeEvery(ADD_NEW_SITE, onAddNewSite);
    yield takeEvery(UPDATE_SITE, onUpdateSite);
    yield takeEvery(DELETE_SITE, onDeleteSite);
}

export default sitesSaga;