import { del, get, post, put } from "./api_helper";

export const getTypeEnquete = () => get('/type-enquete');
export const postTypeEnquete = (data) => post('/type-enquete', data);
export const getShowTypeEnquete = (id) => get(`/type-enquete/${id}`, { params: { id } });
export const putTypeEnquete = (id,data) => put(`/type-enquete/${id}`,data);
export const deleteTypeEnquete = (id) => del(`/type-enquete/${id}`);
