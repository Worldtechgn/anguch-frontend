import { del, get, post, put } from "./api_helper";

export const getRoles = () => get('/role');
export const postRole = (data) => post('/role', data);
export const getShowRole = (id) => get(`/role/${id}`, { params: { id } });
export const putRole = (id,data) => put(`/role/${id}`,data);
export const deleteRole = (id) => del(`/role/${id}`);
