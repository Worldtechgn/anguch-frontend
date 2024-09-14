import { combineReducers } from "redux"

// Front
import Layout from "./layout/reducer"

// Authentication
import Login from "./auth/login/reducer"
import Profile from "./auth/profile/reducer"
import sites from "./cites/reducer"
import personnes from "./personnes/reducer"
import deplacants from "./deplacants/reducer"
import utilisateurs from "./utilisateurs/reducer"
import typeDataMateriels from "./type_data_material/reducer"
import catastrophes from "./catastrophes/reducer"
import regions from "./regions/reducer"
import prefectures from "./prefectures/reducer"
import communes from "./communes/reducer"
import roles from "./roles/reducer"
import profile_alimentaires from "./profile_alimentaire/reducer"
import prix_produits from "./prix_produit/reducer"
import produits from "./produit/reducer"

const rootReducer = combineReducers({
  // public
  Layout,
  Login,
  Profile,
  sites,
  utilisateurs,
  personnes,
  deplacants,
  typeDataMateriels,
  catastrophes,
  regions,
  prefectures,
  communes,
  roles,
  profile_alimentaires,
  prix_produits,
  produits
})

export default rootReducer
