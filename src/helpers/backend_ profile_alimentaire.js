import { del, get, post, put } from "./api_helper";

export const getProfileAlimentaireBackend = (page = 1,limit = 20, q = null) => q === null ? get(`/reference?page=${page}&limit=${limit}`) : get(`/reference?page=${page}&limit=${limit}&q=${q}`);
export const postProfileAlimentaire = (profile_alimentaire) => post('/reference',profile_alimentaire);
export const getShowProfileAlimentaire = (id) => get(`/reference/${id}`);
export const putProfileAlimentaire = (id, profile_alimentaire) => put(`/reference/${id}`,profile_alimentaire);
export const deleteProfileAlimentaire = (id) => del(`/reference/${id}`);
export const getCatastrophesDownloadBackend = (q) => q === null ? get(`/reference/download-excels`,{responseType: 'blob'}): get(`/reference/download-excels?q=${q}`,{responseType: 'blob'});