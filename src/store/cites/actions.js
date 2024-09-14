import {
    GET_SITES,
    GET_SITE,
    GET_SITES_FAIL,
    GET_SITES_SUCCESS,
    ADD_NEW_SITE,
    ADD_SITE_SUCCESS,
    ADD_SITE_FAIL,
    UPDATE_SITE,
    UPDATE_SITE_SUCCESS,
    UPDATE_SITE_FAIL,
    DELETE_SITE,
    DELETE_SITE_SUCCESS,
    DELETE_SITE_FAIL,
    GET_SITE_SUCCESS,
    GET_SITE_FAIL,
} from "./typeAction"

export const getSites = () => ({
    type: GET_SITES,
})

export const getSitesSuccess = sites => ({
    type: GET_SITES_SUCCESS,
    payload: sites,
})

export const getSiteDetail = site => ({
    type: GET_SITE,
    site,
})
  
export const getSiteDetailSuccess = site => ({
    type: GET_SITE_SUCCESS,
    payload: site,
  })
  
export const getSiteDetailFail = error => ({
    type: GET_SITE_FAIL,
    payload: error,
})

export const getSitesFail = error => ({
    type: GET_SITES_FAIL,
    payload: error,
})

export const addNewSite = (site,history) => ({
    type: ADD_NEW_SITE,
    payload: {site, history},
})

export const addSiteSuccess = site => ({
    type: ADD_SITE_SUCCESS,
    payload: site,
})

export const addSiteFail = error => ({
    type: ADD_SITE_FAIL,
    payload: error,
})

export const updateSite = site => ({
    type: UPDATE_SITE,
    payload: site,
})

export const updateSiteSuccess = site => ({
    type: UPDATE_SITE_SUCCESS,
    payload: site,
})

export const updateSiteFail = error => ({
    type: UPDATE_SITE_FAIL,
    payload: error,
})

export const deleteSite = site => ({
    type: DELETE_SITE,
    payload: site,
})

export const deleteSiteSuccess = site => ({
    type: DELETE_SITE_SUCCESS,
    payload: site,
})

export const deleteSiteFail = error => ({
    type: DELETE_SITE_FAIL,
    payload: error,
})

