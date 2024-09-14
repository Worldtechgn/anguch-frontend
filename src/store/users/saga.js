import { call, put, takeEvery } from "redux-saga/effects"
import Swal from "sweetalert2";
import {
  getUsers, postUser, addNewUser
} from "../../helpers/backend_helper";
import {
  addUserFail,
  addUserSuccess,
  getUsersFail,
  getUsersSuccess
} from "./actions";

import {
  ADD_NEW_USER,
  GET_USERS,
} from "./actionTypes";


function* fetchUsers() {
  try {
    const response = yield call(getUsers);
    yield put(getUsersSuccess(response));
  } catch (error) {
    yield put(getUsersFail(error));
  }
}

function* onAddNewUser({ payload: data }) {
  try {
    const response = yield call(addNewUser, data.user);
    yield put(addUserSuccess(response));
    data.history.push("/list-users");
    Swal.fire({
      toast: true,
      position: 'top-end',
      text: 'Enregistrement effectué avec success.',
      icon: 'success',
      showConfirmButton: false,
      timer: 5000
    })


  } catch (error) {
    // console.log(response.statusCode, response.status, response.ok, response.message);
    console.log(error);
    yield put(addUserFail(error));
    Swal.fire({
      toast: true,
      position: 'top-end',
      text: 'Enregistrement echoué.',
      icon: 'error',
      showConfirmButton: false,
      timer: 5000
    })
  }
}

function* fetchPostUser({ payload: { user, history } }) {
  try {
    const response = yield call(postUser, {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      phone: user.phone,
      role: user.role,
    })
    yield put(addUserSuccess(response))
  } catch (error) {
    yield put(addUserFail(error))
  }
}


function* userSaga() {
  yield takeEvery(GET_USERS, fetchUsers);
  yield takeEvery(ADD_NEW_USER, onAddNewUser);
}

export default userSaga