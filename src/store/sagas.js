import { all, fork } from "redux-saga/effects"
import AccountSaga from "./auth/register/saga"
import AuthSaga from "./auth/login/saga"
import sitesSaga from "./cites/saga"
import utilisateurSaga from "./utilisateurs/saga"
import personneSaga from "./personnes/saga"
import deplacantsSaga from "./deplacants/saga"
import SagaTypeDataMateriel from "./type_data_material/saga"
import SagaCatastrophe from "./catastrophes/saga"
import regionsSaga from "./regions/saga"
import prefectureSaga from "./prefectures/saga"
import communeSaga from "./communes/saga"
import roleSaga from "./roles/saga"
import SagaProfileAlimentaire from "./profile_alimentaire/saga"
import SagaPrixProduit from "./prix_produit/saga"
import SagaProduit from "./produit/saga"

export default function* rootSaga() {
  yield all([
    //public
    AccountSaga(),
    fork(AuthSaga),
    fork(utilisateurSaga),
    fork(sitesSaga),
    fork(personneSaga),
    fork(deplacantsSaga),
    fork(SagaTypeDataMateriel),
    fork(SagaCatastrophe),
    fork(regionsSaga),
    fork(prefectureSaga),
    fork(communeSaga),
    fork(roleSaga),
    fork(SagaProfileAlimentaire),
    fork(SagaPrixProduit),
    fork(SagaProduit),
  ])
}
