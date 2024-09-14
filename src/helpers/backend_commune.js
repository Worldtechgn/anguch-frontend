import { del, get, post, put } from "./api_helper";

export const getCommunes = () => get('/commune');
export const getCommunesByPrefectures = (prefecture_id) => get(`/commune/prefecture/${prefecture_id}`);
export const postCommune = (data) => post('/commune', data);
export const putCommune = (data) => put(`/commune`, data);
export const deleteCommune = (id) => del(`/commune/${id}`);
