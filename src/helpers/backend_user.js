import { del, get, post, put } from "./api_helper";
import * as url from "./url_helper";

// get utilisateurs
export const getUtilisateurs = () => get('/users');

export const updateUtilisateurd = (id, data) => put(`/users/${id}`, data)
export const updateUtilisateur = (id, data) => put(`${url.POST_USERS}/${id}`, data)

export const updateCustomer = (customer) => put(`${url.POST_USERS}`, customer);

export const updateProfile = (data) => post(`/users/me`, data);

export const updatePassword = (data) => post(`/auth/me/password`, data);
// add utilisateurs
export const addNewUtilisateur = (utilisateur) => post('/auth/register', utilisateur);

// delete utilisateurs
export const deleteUtilisateur = (utilisateur) => del(url.POST_USER, { headers: { utilisateur } });

