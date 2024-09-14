import React, { useState, useEffect } from "react"
import PropTypes from 'prop-types'
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu
} from "reactstrap"

//i18n
import { withTranslation } from "react-i18next"
// Redux
import { connect } from "react-redux"
import { withRouter, Link } from "react-router-dom"
import axiosApi from "../../../helpers/api_helper"

// users

const ProfileMenu = props => {
  // Declare a new state variable, which we'll call "menu"

  const [menu, setMenu] = useState(false)

  const [username, setusername] = useState("Admin")

  useEffect(() => {
    if (localStorage.getItem("authUser")) {
      if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
        const obj = JSON.parse(localStorage.getItem("authUser"))
        setusername(obj.displayName)
      } else if (
        process.env.REACT_APP_DEFAULTAUTH === "fake" ||
        process.env.REACT_APP_DEFAULTAUTH === "jwt"
      ) {
        const obj = JSON.parse(localStorage.getItem("user"))
        if (obj.username) {
          setusername(obj.first_name + ' ' + obj.last_name)
        } else {
          setusername(obj.first_name + ' ' + obj.last_name)
        }
      }
    }
  }, [props.success])

  return (
    <React.Fragment>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="d-inline-block"
      >
        <DropdownToggle
          className="btn header-item waves-effect"
          id="page-header-user-dropdown"
          tag="button"
        >
          {/* <img
            className="rounded-circle header-profile-user"
            src={user4}
            alt="Header Avatar"
          /> */}
          <span className="d-none d-xl-inline-block ms-1 fw-medium font-size-15">{username}</span>{" "}
          <i className="uil-angle-down d-none d-xl-inline-block font-size-15"></i>
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-end" style={{ backgroundColor: '#fff', borderRadius: 4, }}>

          <Link to='#' onClick={() => {
            props.history.push('/profile')
          }} className="dropdown-item">
            <i className="uil uil-user-circle font-size-18 align-middle text-muted me-1"></i>
            <span>{props.t("Mon Profile")}</span>
          </Link>

          <div className="dropdown-divider" />
          <Link to='#' onClick={() => {
            axiosApi.post('/auth/logout').then(resp=>{
              localStorage.clear();
              props.history.push('/login')
            })
          }} className="dropdown-item">
            <i className="uil uil-sign-out-alt font-size-18 align-middle me-1 text-muted"></i>
            <span>{props.t("Deconnexion")}</span>
          </Link>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  )
}

ProfileMenu.propTypes = {
  success: PropTypes.any,
  t: PropTypes.any
}

const mapStatetoProps = state => {
  const { error, success } = state.Profile
  return { error, success }
}

export default withRouter(
  connect(mapStatetoProps, {})(withTranslation()(ProfileMenu))
)
