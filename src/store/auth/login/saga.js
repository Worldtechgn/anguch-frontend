import { call, put, takeEvery } from "redux-saga/effects"

// Login Redux States
import { LOGIN_USER } from "./actionTypes"
import { apiError, loginFailure, loginSuccess } from "./actions"
import {
  postJwtLogin,
} from "../../../helpers/fakebackend_helper"
import { alertMessage } from "../../../helpers/alertMessage"

function* loginUser({ payload: { user, history } }) {

  try {
    // if (process.env.REACT_APP_DEFAULTAUTH === "jwt") {
      const response = yield call(postJwtLogin, {
        email: user.email,
        password: user.password,
      })

      if (response.token) {
        localStorage.setItem("authUser", JSON.stringify(response.token))
        localStorage.setItem("user", JSON.stringify(response.user))
        yield put(loginSuccess(response))
        history.push("/dashboard")
      }
      else {
        alertMessage.error('Votre identifiant ou mot de passe est incorrect.', { keepAfterRouteChange: true });
        yield put(loginFailure(response))
        history.push("/login")
      }
    // }
  } catch (error) {
    yield put(apiError(error))
  }
}


function* authSaga() {
  yield takeEvery(LOGIN_USER, loginUser)
}

export default authSaga
