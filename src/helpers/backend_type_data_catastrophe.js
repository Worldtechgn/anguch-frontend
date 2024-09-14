import { get } from "./api_helper";

export const getCatastrophes = () => get('/type-data-materiel/catastrophes');
export const getActiviteProfessionnelles = () => get('/type-data-materiel/activite-professionnelles');
export const getDenres = () => get('/type-data-materiel/denres');
export const getMaterials = () => get('/type-data-materiel/materiels');