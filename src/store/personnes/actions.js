import {
  GET_PERSONNES_SUCCESS,
  GET_PERSONNES,
  GET_PERSONNES_FAIL,

  GET_MIGRANTS_SUCCESS,
  GET_MIGRANTS,
  GET_MIGRANTS_FAIL,

  GET_REFUGIES_SUCCESS,
  GET_REFUGIES,
  GET_REFUGIES_FAIL,

  ADD_NEW_PERSONNE,
  ADD_PERSONNE_SUCCESS,
  ADD_PERSONNE_FAIL,
  UPDATE_PERSONNE_SUCCESS,
  UPDATE_PERSONNE_FAIL,
  DELETE_PERSONNE_SUCCESS,
  DELETE_PERSONNE_FAIL,
  DELETE_PERSONNE,
  UPDATE_PERSONNE,
  GET_PERSONNE,
  GET_PERSONNE_SUCCESS,
  GET_PERSONNE_FAIL,

  GET_DEPLACEINTERNE,
  GET_DEPLACEINTERNE_SUCCESS,
  GET_DEPLACEINTERNE_FAIL
} from "./actionTypes"

// Personnes
export const getPersonnes = () => ({
  type: GET_PERSONNES,
})

export const getPersonnesSuccess = personnes => ({
  type: GET_PERSONNES_SUCCESS,
  payload: personnes,
})

export const getPersonnesFail = error => ({
  type: GET_PERSONNES_FAIL,
  payload: error,
})

// DEPLACEINTERNE
export const getDeplaceinternes = () => ({
  type: GET_DEPLACEINTERNE,
})

export const getDeplaceinternesSuccess = personnes => ({
  type: GET_DEPLACEINTERNE_SUCCESS,
  payload: personnes,
})

export const getDeplaceinternesFail = error => ({
  type: GET_DEPLACEINTERNE_FAIL,
  payload: error,
})

//MIGRANTS
export const getMigrants = () => ({
  type: GET_MIGRANTS,
})

export const getMigrantsSuccess = personnes => ({
  type: GET_MIGRANTS_SUCCESS,
  payload: personnes,
})

export const getMigrantsFail = error => ({
  type: GET_MIGRANTS_FAIL,
  payload: error,
})

//REFUGIES
export const getRefugies = () => ({
  type: GET_REFUGIES,
})

export const getRefugiesSuccess = personnes => ({
  type: GET_REFUGIES_SUCCESS,
  payload: personnes,
})

export const getRefugiesFail = error => ({
  type: GET_REFUGIES_FAIL,
  payload: error,
})

export const getPersonneDetail = personne => ({
  type: GET_PERSONNE,
  personne,
})

export const getPersonneDetailSuccess = personne => ({
  type: GET_PERSONNE_SUCCESS,
  payload: personne,
})

export const getPersonneDetailFail = error => ({
  type: GET_PERSONNE_FAIL,
  payload: error,
})

export const addNewPersonne = (personne, history) => ({
  type: ADD_NEW_PERSONNE,
  payload: { personne, history },
})

export const addPersonneSuccess = personne => ({
  type: ADD_PERSONNE_SUCCESS,
  payload: personne,
})

export const addPersonneFail = error => ({
  type: ADD_PERSONNE_FAIL,
  payload: error,
})

export const updatePersonne = personne => ({
  type: UPDATE_PERSONNE,
  payload: personne,
})

export const updatePersonneSuccess = personne => ({
  type: UPDATE_PERSONNE_SUCCESS,
  payload: personne,
})

export const updatePersonneFail = error => ({
  type: UPDATE_PERSONNE_FAIL,
  payload: error,
})

export const deletePersonne = personne => ({
  type: DELETE_PERSONNE,
  payload: personne,
})

export const deletePersonneSuccess = personne => ({
  type: DELETE_PERSONNE_SUCCESS,
  payload: personne,
})

export const deletePersonneFail = error => ({
  type: DELETE_PERSONNE_FAIL,
  payload: error,
})
