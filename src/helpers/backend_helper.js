import { del, get, post, put } from "./api_helper";
import * as url from "./url_helper";


// Gets the logged in user data from local session 
const getLoggedInUser = () => {
  // const user = localStorage.getItem("user");
  const user = localStorage.getItem("authUser");
  if (user) return JSON.parse(user);
  return null;
};


//https://github.com/gitdagray/react_redux_toolkit
//is user is logged in
const isUserAuthenticated = () => {
  return getLoggedInUser() !== null;
};

//post users
const addNewUser = (user) => post(url.POST_USER, user);

const postUser = (data) => post(url.POST_USER, data);
const getUsers = () => get(url.GET_USERS);
const getIdUsers = (id) => get(`${url.GET_USERS}/${id}`, { params: { id } })
const putUsers = (id, data) => put(`${url.GET_USERS}/${id}`, data, { params: { id } })
const deleteUsers = (id) => del(`${url.GET_USERS}/${id}`, { params: { id } })

//personnes
const postPersonne = (data) => post(url.POST_PERSONNES, data);
const getPersonne = () => get(url.POST_PERSONNES);
const getIdPersonne = (id) => get(`${url.POST_PERSONNES}/${id}`, { params: { id } })
const putPersonne = (id, data) => put(`${url.POST_PERSONNES}/${id}`, data, { params: { id } })
const deletePersonne = (id) => del(`${url.POST_PERSONNES}/${id}`, { params: { id } })

//deplaces
const postDeplace = (data) => post(url.GET_DEPLACE, data);
const getDeplace = () => get(url.GET_DEPLACE);
const getIdDeplace = (id) => get(`${url.GET_DEPLACE}/${id}`, { params: { id } })
const putDeplace = (id, data) => put(`${url.GET_DEPLACE}/${id}`, data, { params: { id } })
const deleteDeplace = (id) => del(`${url.GET_DEPLACE}/${id}`, { params: { id } })

//deplaces
const postSite = (data) => post(url.POST_SITE, data);
const getSite = () => get(url.GET_SITE);


// get cite
const getSites = () => get(url.GET_SITE);

// get site detail
const getSiteDetail = (id) => get(`${url.GET_SITE}/${id}`, { params: { id } });

const updateSited = (id, data) => put(`${url.POST_SITE}/${id}`, data, { params: { id } })
// add cite
const addNewSite = (site) => post(url.POST_SITE, site);

// update cite
const updateSite = (site) => put(url.UPDATE_SITE, site);

// delete cite
const deleteSite = (site) => del(url.DELETE_SITE, { headers: { site } });


// get utilisateurs
const getUtilisateurs = () => get(url.GET_USERS);

// get utilisateur detail
const getUtilisateurDetail = (id) => get(`${url.GET_USERS}/${id}`, { params: { id } });

const updateUtilisateurd = (id, data) => put(`${url.POST_USERS}/${id}`, data, { params: { id } })
// add utilisateurs
const addNewUtilisateur = (utilisateur) => post(url.POST_USER, utilisateur);

// update utilisateurs
const updateUtilisateur = (utilisateur) => put(url.POST_USER, utilisateur);

// delete utilisateurs
const deleteUtilisateur = (utilisateur) => del(url.POST_USER, { headers: { utilisateur } });



//get personnes
const getPersonnes = () => get(url.GET_PERSONNES);

//get refugies
const getRefugies = () => get(url.GET_REFUGIES);

//get deplace interne
const getDeplaceinterne = () => get(url.GET_DEPLACEINTERNE);

//get migrants
const getMigrants = () => get(url.GET_MIGRANTS);

// get personne detail
const getPersonneDetail = (id) =>
  get(`${url.GET_PERSONNE}/${id}`, { params: { id } });

// add personne
const addNewPersonne = (personne) => post(url.GET_PERSONNE, personne);


// update personne
const updatePersonne = (id, data) => put(`${url.POST_PERSONNES}/${id}`, data, { params: { id } })

// get regions
const getRegions = () => get(url.GET_REGIONS);
// get prefectures by region
const getPrefectureByRegion = (id) => get(`${url.GET_PREFECTURE}/${id}`, { params: { id } });
// get commune by prefecture
const getCommuneByPrefecture = (id) => get(`${url.GET_COMMUNES}/${id}`, { params: { id } });

// get Deplacant
const getDeplacants = () => get(url.GET_DEPLACE);

// get Deplacant detail
const getDeplacantDetail = (id) =>
  get(`${url.GET_DEPLACE}/${id}`, { params: { id } });

const updateDeplacant = (id, data) => put(`${url.GET_DEPLACE}/${id}`, data, { params: { id } })
// add Deplacant
const addNewDeplacant = (deplacant) => post(url.GET_DEPLACE, deplacant);


// delete Deplacant
const deleteDeplacant = (deplacant) => del(url.GET_DEPLACE, { headers: { deplacant } });

export {
  getUtilisateurs,
  getUtilisateurDetail,
  updateUtilisateurd,
  addNewUtilisateur,
  updateUtilisateur,
  deleteUtilisateur,
  getDeplaceinterne,
  addNewUser,
  getSite,
  postSite,
  postUser,
  getUsers,
  getIdUsers,
  putUsers,
  isUserAuthenticated,
  deleteUsers,
  postPersonne,
  getIdPersonne,
  getPersonne,
  putPersonne,
  deletePersonne,
  postDeplace,
  getDeplace,
  getIdDeplace,
  putDeplace,
  deleteDeplace,
  getSites,
  getSiteDetail,
  updateSited,
  addNewSite,
  updateSite,
  deleteSite,
  getPersonnes,
  getRefugies,
  getMigrants,
  getPersonneDetail,
  addNewPersonne,
  updatePersonne,
  getRegions,
  getPrefectureByRegion,
  getCommuneByPrefecture,
  getDeplacants,
  getDeplacantDetail,
  updateDeplacant,
  addNewDeplacant,
  deleteDeplacant
}