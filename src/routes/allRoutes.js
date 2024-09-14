import { Redirect } from "react-router-dom"

// Dashboard
import Dashboard from "../pages/Dashboard/index"

// Authentication related pages
import Login from "../pages/Authentication/Login"
import Logout from "../pages/Authentication/Logout"

// Profile
import ListSiteInondable from "../pages/SiteInondables/ListSiteInondable"
import AddSiteInondable from "../pages/SiteInondables/AddSiteInondable"
import ListeRefugie from "../pages/Refugies/ListeRefugie"
import AddRefugie from "../pages/Refugies/AddRefugie"
import ListeInfoPersonne from "../pages/Personnes/ListeInfoPersonne"
import AddInfoPersonne from "../pages/Personnes/AddInfoPersonne"
import ListeMigrant from "../pages/Migrants/ListeMigrant"
import AddMigrant from "../pages/Migrants/AddMigrant"
import ListeDeplacement from "../pages/Deplaces/ListeDeplacement"
import AddDeplacement from "../pages/Deplaces/AddDeplacement"
import EditSite from "../pages/SiteInondables/EditSite"
import EditRefugie from "../pages/Refugies/EditRefugie"
import EditMigrant from "../pages/Migrants/EditMigrant"
import EditInfoPersonne from "../pages/Personnes/EditInfoPersonne"
import ListUser from "../pages/users/ListUser"
import ListeRole from "../pages/roles/ListeRole"
import AssignRole from "../pages/roles/AssignRole"
import ListeCatastrophe from "../pages/catastrophes/ListeCatastrophe"
import AddCatastrophe from "../pages/catastrophes/AddCatastrophe"
import IconBoxicons from "../pages/Icons/IconBoxicons"
import ViewCatastrophe from "../pages/catastrophes/ViewCatastrophe"
import ListeDeplaceInterne from "../pages/DeplaceInternes/ListeDeplaceInterne"
import AddDeplaceInterne from "../pages/DeplaceInternes/AddDeplaceInterne"
import MapStatistique from "../pages/statistiques/map/mapStatistique"
import EditPersonneDeplaceinterne from "../pages/DeplaceInternes/EditPersonneDeplaceinterne"
import ViewPersonneDeplace from "../pages/DeplaceInternes/ViewPersonneDeplace"
import CguPage from "../pages/cgu/CguPage"
import AddEditPage from "../pages/pamFormulaire/addEditPage"
import ListReferencePam from "../pages/pamFormulaire/listReferencePam"
import RapportPage from "../pages/statistiques/rapportComponent"
import ProfileUser from "../pages/users/ProfileUser"
import ListeRegion from "../pages/localites/regions/ListeRegion"
import ListePrefecture from "../pages/localites/prefectures/ListePrefecture"
import ListeCommune from "../pages/localites/communes/ListeCommune"
import PrixProduit from "../pages/pamFormulaire/prixProduit"
import { ViewProfileAlimentaire } from "../pages/pamFormulaire/viewProfileAlementaire"
import ViewTraitement from "../pages/catastrophes/viewTraitement"
import EditRole from "../pages/roles/EditRole"
import ListProduits from "../pages/statistiques/listProduits"
import AddUpdatePage from "../pages/souapiti/addUpdate"
import ListeEnqueteDeplaceInterne from "../pages/souapiti/indexPage"
import viewEnqueteDeplaceInterne from "../pages/souapiti/viewEnqueteDeplaceInterne"
import IndexTypeEnquetePage from "../pages/type_enquetes/indexTypeEnquete"

const userRoutes = [
  { path: "/dashboard", component: Dashboard },

  { path: "/icon-boxicon", component: IconBoxicons },

  // //profile
  { path: "/profile", component: ProfileUser },

  // Utilisateurs
  { path: "/list-users", component: ListUser },
  { path: "/liste-regions", component: ListeRegion },
  { path: "/liste-prefectures", component: ListePrefecture },
  { path: "/liste-communes", component: ListeCommune },
  { path: "/liste-role", component: ListeRole },
  { path: "/roles/:id/edit", component: EditRole },

  // Point focal
  { path: "/liste-catastrophe", component: ListeCatastrophe },
  { path: "/add-catastrophe", component: AddCatastrophe },
  { path: "/edit-catastrophe/:id", component: AddCatastrophe },
  { path: "/view-catastrophe/:id", component: ViewCatastrophe },
  { path: "/catastrophe/traitement/:id", component: ViewTraitement },

  //site inondable
  { path: "/site-inondable", component: ListSiteInondable },
  { path: "/add-site-inondable", component: AddSiteInondable },
  { path: "/add-site-inondable/:id", component: AddSiteInondable },
  { path: "/edit-site-inondable/:id", component: EditSite },

  //refugies
  { path: "/list-refugie", component: ListeRefugie },
  { path: "/add-refugie", component: AddRefugie },
  { path: "/edit-refugie/:id", component: EditRefugie },

  //Les personnes
  { path: "/list-info-personne", component: ListeInfoPersonne },
  { path: "/add-info-personne", component: AddInfoPersonne },
  { path: "/edit-info-personne/:id", component: EditInfoPersonne },

  //Les migrant de retour
  { path: "/list-migrant", component: ListeMigrant },
  { path: "/add-migrant", component: AddMigrant },
  { path: "/edit-migrant/:id", component: EditMigrant },

  { path: "/list-deplace-interne", component: ListeDeplaceInterne },
  { path: "/add-deplace-interne", component: AddDeplaceInterne },
  { path: "/edit-deplace-interne/:id", component: EditPersonneDeplaceinterne },
  { path: "/view-deplace-interne/:id", component: ViewPersonneDeplace },

  //Les migrant de retour
  { path: "/list-deplacement", component: ListeDeplacement },
  { path: "/add-deplacement", component: AddDeplacement },
  { path: "/edit-deplacement/:id", component: AddDeplacement },

  // statistiques
  { path: "/statistiques/map", component: MapStatistique },
  { path: "/statistiques/liste-des-prix-produits", component: ListProduits },
  { path: "/statistiques/all/:statistique", component: Dashboard },
  { path: "/statistiques/rapport-price", component: RapportPage },

  { path: "/formulaire/pam", component: AddEditPage },
  { path: "/profile-alimentaires/:id", component: ViewProfileAlimentaire },
  { path: "/formulaire/references/:id/:edit", component: AddEditPage },
  { path: "/formulaire/references", component: ListReferencePam },
  { path: "/formulaire/collect", component: PrixProduit },
  //Formulaire souapiti
  {path: "/souapiti/add",component: AddUpdatePage},
  {path: "/souapiti/edit/:id",component: AddUpdatePage},
  {path: "/souapiti/liste",component: ListeEnqueteDeplaceInterne},
  {path: "/souapiti/view/:id",component: viewEnqueteDeplaceInterne},
  // type enquete
  {path:"/type-enquetes", component: IndexTypeEnquetePage},
  {
    path: "/",
    exact: true,
    component: () => <Redirect to="/dashboard" />
  },

 
];

const authRoutes = [

  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
  { path: "/cgu", component: CguPage },
]

export { userRoutes, authRoutes }