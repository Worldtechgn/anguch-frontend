import { del, get, post, put } from "./api_helper";

export const getEnqueteTypeData = () => get('/enquete/type-data-enquetes');
export const getEnqueteDeplaceInternes = (page = 1,limit = 20, q = null) => q === null ? get(`/enquete/find-enquete-deplace-internes?page=${page}&limit=${limit}`): get(`/enquete/find-enquete-deplace-internes?page=${page}&limit=${limit}&q=${q}`);
export const postEnqueteDeplaceInternes = (data) => post('/enquete/store-enquete-deplace-internes',data);
export const putEnqueteDeplaceInternes = (id,data) => put(`/enquete/update-enquete-deplace-internes/${id}`,data);
export const getShowEnqueteDeplaceInternes = (id) => get(`/enquete/find-enquete-deplace-internes/${id}`);
export const deleteEnqueteDeplaceInternes = (id) => del(`/enquete/delete-enquete-deplace-internes/${id}`);
export const getEnqueteDeplaceInternesDownload = (q) => q === null ? get(`/enquete/download-excels`,{responseType: 'blob'}): get(`/enquete/download-excels?q=${q}`,{responseType: 'blob'});
// export const getExportEnqueteDeplaceInternes = (id) => get(`/enquete/find-enquete-deplace-internes/${id}`);


