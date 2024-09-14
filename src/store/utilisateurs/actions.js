import { ADD_NEW_UTILISATEUR, ADD_UTILISATEUR_FAIL, ADD_UTILISATEUR_SUCCESS, DELETE_UTILISATEUR, DELETE_UTILISATEUR_FAIL, DELETE_UTILISATEUR_SUCCESS, GET_UTILISATEUR, GET_UTILISATEURS, GET_UTILISATEURS_FAIL, GET_UTILISATEURS_SUCCESS, GET_UTILISATEUR_FAIL, GET_UTILISATEUR_SUCCESS, PASSWORD_NEW_UTILISATEUR, PASSWORD_UTILISATEUR_FAIL, PROFILE_NEW_UTILISATEUR, PROFILE_UTILISATEUR_FAIL, PROFILE_UTILISATEUR_SUCCESS, UPDATE_UTILISATEUR, UPDATE_UTILISATEUR_FAIL, UPDATE_UTILISATEUR_SUCCESS } from "./actionType"

export const getUtilisateurs = () => ({
	type: GET_UTILISATEURS,
})

export const getUtilisateursSuccess = utilisateurs => ({
	type: GET_UTILISATEURS_SUCCESS,
	payload: utilisateurs,
})

export const getUtilisateurDetail = utilisateur => ({
	type: GET_UTILISATEUR,
	utilisateur,
})

export const getUtilisateurDetailSuccess = utilisateur => ({
	type: GET_UTILISATEUR_SUCCESS,
	payload: utilisateur,
})

export const getUtilisateurDetailFail = error => ({
	type: GET_UTILISATEUR_FAIL,
	payload: error,
})

export const getUtilisateursFail = error => ({
	type: GET_UTILISATEURS_FAIL,
	payload: error,
})

export const addNewUtilisateur = (utilisateur, history) => ({
	type: ADD_NEW_UTILISATEUR,
	payload: { utilisateur, history },
})

export const addUtilisateurSuccess = utilisateur => ({
	type: ADD_UTILISATEUR_SUCCESS,
	payload: utilisateur,
})

export const addUtilisateurFail = error => ({
	type: ADD_UTILISATEUR_FAIL,
	payload: error,
})

export const profileNewUtilisateur = (utilisateur) => ({
	type: PROFILE_NEW_UTILISATEUR,
	payload: utilisateur,
})

export const profileUtilisateurSuccess = utilisateur => ({
	type: PROFILE_UTILISATEUR_SUCCESS,
	payload: utilisateur,
})

export const profileUtilisateurFail = error => ({
	type: PROFILE_UTILISATEUR_FAIL,
	payload: error,
})

export const passwordNewUtilisateur = utilisateur => ({
	type: PASSWORD_NEW_UTILISATEUR,
	payload: utilisateur,
})

export const passwordUtilisateurSuccess = utilisateur => ({
	type: PROFILE_UTILISATEUR_SUCCESS,
	payload: utilisateur,
})

export const passwordUtilisateurFail = error => ({
	type: PASSWORD_UTILISATEUR_FAIL,
	payload: error,
})

export const updateUtilisateur = utilisateur => ({
	type: UPDATE_UTILISATEUR,
	payload: utilisateur,
})

export const updateUtilisateurSuccess = utilisateur => ({
	type: UPDATE_UTILISATEUR_SUCCESS,
	payload: utilisateur,
})

export const updateUtilisateurFail = error => ({
	type: UPDATE_UTILISATEUR_FAIL,
	payload: error,
})

export const deleteUtilisateur = utilisateur => ({
	type: DELETE_UTILISATEUR,
	payload: utilisateur,
})

export const deleteUtilisateurSuccess = utilisateur => ({
	type: DELETE_UTILISATEUR_SUCCESS,
	payload: utilisateur,
})

export const deleteUtilisateurFail = error => ({
	type: DELETE_UTILISATEUR_FAIL,
	payload: error,
})

