import { del, get, post, put } from "./api_helper";

export const getPrefectures = () => get('/prefecture');
export const getPrefecturesByRegions = (regionId) => get(`/prefecture/region/${regionId}`);
export const postPrefecture = (data) => post('/prefecture', data);
export const putPrefecture = (data) => put(`/prefecture`, data);
export const deletePrefecture = (id) => del(`/prefecture/${id}`);
