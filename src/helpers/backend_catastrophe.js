import { del, get, post, put } from "./api_helper";

export const getCatastrophesBackend = () => get('/catastrophe/liste');
export const getCatastrophesWithPaginateBackend = (page = 1,limit = 20, q = null) => q === null ? get(`/catastrophe?page=${page}&limit=${limit}`): get(`/catastrophe?page=${page}&limit=${limit}&q=${q}`);
export const getCatastrophesDownloadBackend = (q) => q === null ? get(`/catastrophe/download-excels`,{responseType: 'blob'}): get(`/catastrophe/download-excels?q=${q}`,{responseType: 'blob'});
export const postCatastrophes = (catastrophe) => post('/catastrophe',catastrophe);
export const getShowCatastrophe = (id) => get(`/catastrophe/${id}`);
export const getShowCatastropheFiles = (id) => get(`/files/documents-objects/${id}/catastrophe`);
export const putCatastrophes = (id, catastrophe) => put(`/catastrophe/${id}`,catastrophe);
export const deleteCatastrophes = (id) => del(`/catastrophe/${id}`);
export const postTraitementCatastrophe = (data) => post(`/catastrophe/traitement`,data);
export const getTraitementCatastrophe = (id) => get(`/catastrophe/traitements/${id}`);
export const deleteTraitement = (id) => del(`/catastrophe/traitements/${id}/delete`);
export const putValidationTraitement = (catastrophe_id,data) => put(`/catastrophe/validation-etat-traitement/${catastrophe_id}`,data);