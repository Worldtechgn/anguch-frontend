import { del, get, post, put } from "./api_helper";

export const getRegions = () => get('/region');
export const postRegion = (data) => post('/region', data);
export const putRegion = (data) => put(`/region`, data);
export const deleteRegion = (id) => del(`/region/${id}`);
