export default function authHeader() {
  const token = JSON.parse(localStorage.getItem("authUser"))
  if (token) {
    return { authorization: token }
  } else {
    return {}
  }
}
