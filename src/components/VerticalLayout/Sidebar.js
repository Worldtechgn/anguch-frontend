import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

//i18n
import { withTranslation } from "react-i18next";
import SidebarContent from "./SidebarContent";

import logoSm from "../../assets/images/logo-sm.png";
import logoDark from "../../assets/images/logo-dark.png";
import logoLight from "../../assets/images/logo-light.png";

const Sidebar = props => {
  function tToggle() {
    var body = document.body;
    body.classList.toggle("vertical-collpsed");
    body.classList.toggle("sidebar-enable");
  }

  return (
    <React.Fragment>
      <div className="vertical-menu" style={{ backgroundColor: '#192957' }}>
        <div className="navbar-brand-box">
          <Link to="/" className="logo logo-dark">
            <span className="logo-sm">
              <img src={logoSm} alt="" height="30" />
            </span>
            <span className="logo-lg">
              <img src={logoDark} alt="" height="45" />
            </span>
          </Link>

          <Link to="/" className="logo logo-light">
            <span className="logo-sm">
              <img src={logoSm} alt="" height="30" />
            </span>
            <span className="logo-lg">
              <img src={logoLight} alt="" height="45" />
            </span>
          </Link>
        </div>
        <button
          onClick={() => {
            tToggle();
          }}
          type="button" className="btn btn-sm px-3 font-size-16 header-item waves-effect vertical-menu-btn">
          <i className="fa fa-fw fa-bars"></i>
        </button>
        <div className="sidebar-menu-scroll" style={{ backgroundColor: '#192957' }}>
          {props.type !== "condensed" ? <SidebarContent /> : <SidebarContent />}
        </div>
      </div>
    </React.Fragment>
  );
};

Sidebar.propTypes = {
  type: PropTypes.string,
};

const mapStatetoProps = state => {
  return {
    layout: state.Layout,
  };
};
export default connect(
  mapStatetoProps,
  {}
)(withRouter(withTranslation()(Sidebar)));