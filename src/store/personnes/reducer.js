import {
  GET_PERSONNES_SUCCESS,
  GET_PERSONNES_FAIL,

  GET_REFUGIES_SUCCESS,
  GET_REFUGIES_FAIL,

  GET_DEPLACEINTERNE_SUCCESS,
  GET_DEPLACEINTERNE_FAIL,

  GET_MIGRANTS_SUCCESS,
  GET_MIGRANTS_FAIL,

  GET_PERSONNE_SUCCESS,
  GET_PERSONNE_FAIL,

  ADD_PERSONNE_SUCCESS,
  ADD_PERSONNE_FAIL,

  UPDATE_PERSONNE_SUCCESS,
  UPDATE_PERSONNE_FAIL,

  DELETE_PERSONNE_SUCCESS,
  DELETE_PERSONNE_FAIL,


} from "./actionTypes";

const INIT_STATE = {
  personnes: [],
  personne: {},
  error: {},
};

const personnes = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_PERSONNES_SUCCESS:
      return {
        ...state,
        personnes: action.payload,
      };

    case GET_PERSONNES_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_MIGRANTS_SUCCESS:
      return {
        ...state,
        personnes: action.payload,
      };

    case GET_MIGRANTS_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_DEPLACEINTERNE_SUCCESS:
      return {
        ...state,
        personnes: action.payload,
      };

    case GET_DEPLACEINTERNE_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_REFUGIES_SUCCESS:
      return {
        ...state,
        personnes: action.payload,
      };

    case GET_REFUGIES_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_PERSONNE_SUCCESS:
      return {
        ...state,
        personne: action.payload,
      };

    case GET_PERSONNE_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case ADD_PERSONNE_SUCCESS:
      return {
        ...state,
        personnes: [...state.personnes, action.payload],
      };

    case ADD_PERSONNE_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case UPDATE_PERSONNE_SUCCESS:
      return {
        ...state,
        personnes: state.personnes.map(personne =>
          personne.id.toString() === action.payload.id.toString()
            ? { personne, ...action.payload }
            : personne
        ),
      };

    case UPDATE_PERSONNE_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case DELETE_PERSONNE_SUCCESS:
      return {
        ...state,
        personnes: state.personnes.filter(
          personne => personne.id.toString() !== action.payload.id.toString()
        ),
      };

    case DELETE_PERSONNE_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default personnes;
