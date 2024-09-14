import PropTypes from "prop-types"
import React, { useCallback, useEffect, useRef } from "react"

// //Import Scrollbar
import SimpleBar from "simplebar-react"

// MetisMenu
import MetisMenu from "metismenujs"
import { withRouter } from "react-router-dom"
import { Link } from "react-router-dom"
import './style.css'
//i18n
import { withTranslation } from "react-i18next"
import permissionHelper from "../../common/permission_helper"

const SidebarContent = props => {
  const ref = useRef();

  const activateParentDropdown = useCallback((item) => {
    item.classList.add("active")
    const parent = item.parentElement
    const parent2El = parent.childNodes[1]
    if (parent2El && parent2El.id !== "side-menu") {
      parent2El.classList.add("mm-show")
    }

    if (parent) {
      parent.classList.add("mm-active")
      const parent2 = parent.parentElement

      if (parent2) {
        parent2.classList.add("mm-show") // ul tag

        const parent3 = parent2.parentElement // li tag

        if (parent3) {
          parent3.classList.add("mm-active") // li
          parent3.childNodes[0].classList.add("mm-active") //a
          const parent4 = parent3.parentElement // ul
          if (parent4) {
            parent4.classList.add("mm-show") // ul
            const parent5 = parent4.parentElement
            if (parent5) {
              parent5.classList.add("mm-show") // li
              parent5.childNodes[0].classList.add("mm-active") // a tag
            }
          }
        }
      }
      scrollElement(item);
      return false
    }
    scrollElement(item);
    return false
  }, []);

  // Use ComponentDidMount and ComponentDidUpdate method symultaniously backgroundColor: '#fff',
  useEffect(() => {
    const pathName = props.location.pathname

    new MetisMenu("#side-menu")
    let matchingMenuItem = null
    const ul = document.getElementById("side-menu")
    const items = ul.getElementsByTagName("a")
    for (let i = 0; i < items.length; ++i) {
      if (pathName === items[i].pathname) {
        matchingMenuItem = items[i]
        break
      }
    }
    if (matchingMenuItem) {
      activateParentDropdown(matchingMenuItem);
    }

  }, [props.location.pathname, activateParentDropdown])

  useEffect(() => {
    ref.current.recalculate()
  })

  function scrollElement(item) {
    if (item) {
      const currentPosition = item.offsetTop
      if (currentPosition > window.innerHeight) {
        ref.current.getScrollElement().scrollTop = currentPosition - 300
      }
    }
  }

  return (
    <React.Fragment>
      <SimpleBar style={{ maxHeight: "100%", }} ref={ref}>
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
            <li className="menu-title">{props.t("Menu")} </li>
            <li >
              <Link to="/#" className="waves-effect">
                <i className="uil-home-alt txtColor"></i>
                <span className="txtColor">{props.t("Dashboard")}</span>
              </Link>
            </li>

            {permissionHelper('catastrophe','view_catastrophe') && <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="uil-store"></i>
                <span className="txtColor">{props.t("Gestion catastrophes")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/liste-catastrophe" className="txtColor">{props.t("Liste catastrophes")}</Link>
                </li>
                {permissionHelper('catastrophe','add_catastrophe') && <li>
                  <Link to="/add-catastrophe" className="txtColor">
                    {props.t("Ajoute des catastrophes")}
                  </Link>
                </li>}
              </ul>
            </li>}

            {permissionHelper('personne','view_personne') && <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="uil-user"></i>
                <span className="txtColor">{props.t("Gestion Personnes")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/list-info-personne" className="txtColor">{props.t("Liste des personnes")}</Link>
                </li>
              </ul>
            </li>}

            {permissionHelper('migrants','view_migrant') && <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="uil-user"></i>
                <span className="txtColor">{props.t("Gestion Migrants")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/list-migrant" className="txtColor">{props.t("Liste des migrants")}</Link>
                </li>
               {permissionHelper('migrants','add_migrant') && <li>
                  <Link to="/add-migrant" className="txtColor">{props.t("Ajouter des migrants")}</Link>
                </li>}
              </ul>
            </li>}

            {permissionHelper('refusie','view_refusie') && <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="uil-user"></i>
                <span className="txtColor">{props.t("Gestion Réfugiés")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/list-refugie" className="txtColor">{props.t("Liste des réfugiés")}</Link>
                </li>
                {permissionHelper('refusie','add_refusie') && <li>
                  <Link to="/add-refugie" className="txtColor">{props.t("Ajouter des réfugiés")}</Link>
                </li>}
              </ul>
            </li>}

            {permissionHelper('deplaceInterne','view_deplaceInterne') && <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="uil-user"></i>
                <span className="txtColor">{props.t("Deplaces internes")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/list-deplace-interne" className="txtColor">{props.t("Liste des deplaces")}</Link>
                </li>
                {permissionHelper('deplaceInterne','view_deplaceInterne') &&  <li>
                  <Link to="/add-deplace-interne" className="txtColor">{props.t("Ajouter des deplaces")}</Link>
                </li>}
              </ul>
            </li>}

            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <iconify-icon icon="game-icons:corn"></iconify-icon>{" "}
                <span className="txtColor">{props.t("Sécurité alimentaire")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/formulaire/references" className="txtColor">{props.t("Profil alimentaire")}</Link>
                </li>
                <li>
                  <Link to="/formulaire/collect" className="txtColor">{props.t("Prix des produits")}</Link>
                </li>
              </ul>
            </li>

            {permissionHelper('enqueteDeplaceInterne','view_enqueteDeplaceInterne') && <li>
              <Link to="/#" className="has-arrow waves-effect">
                <iconify-icon icon="game-icons:corn"></iconify-icon>{" "}
                <span className="txtColor">{props.t("Enquete deplaces internes")}</span>
              </Link>
              <ul className="sub-menu">
                {permissionHelper('enqueteDeplaceInterne','add_enqueteDeplaceInterne') &&  <li>
                  <Link to="/souapiti/add" className="txtColor">{props.t("Ajouter")}</Link>
                </li>}
                {permissionHelper('enqueteDeplaceInterne','view_enqueteDeplaceInterne') && <li>
                  <Link to="/souapiti/liste" className="txtColor">{props.t("Liste")}</Link>
                </li>}
              </ul>
            </li>}
            {permissionHelper('configuration','view_region') || permissionHelper('configuration','view_prefecture') || permissionHelper('configuration','view_commune') || permissionHelper('configuration','view_enquete')  && <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="fa fa-map"></i>
                <span className="txtColor">{props.t("Configurations")}</span>
              </Link>
              <ul className="sub-menu">
               {permissionHelper('configuration','view_region') && <li>
                  <Link to="/liste-regions" className="txtColor">{props.t("Regions")}</Link>
                </li>}
                {permissionHelper('configuration','view_prefecture') && <li>
                  <Link to="/liste-prefectures" className="txtColor">{props.t("Prefectures")}</Link>
                </li>}
                {permissionHelper('configuration','view_commune') && <li>
                  <Link to="/liste-communes" className="txtColor">{props.t("Communes")}</Link>
                </li>}
                {permissionHelper('configuration','type_enquete') && <li>
                  <Link to="/type-enquetes" className="txtColor">{props.t("Types d'enquête")}</Link>
                </li>}
              </ul>
            </li>}

            {permissionHelper('statistique','view_statistique') && <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="uil-store"></i>
                <span className="txtColor">{props.t("Statistique")}</span>
              </Link>
              <ul className="sub-menu">
                {permissionHelper('statistique','view_carte') && <li>
                  <Link to="/statistiques/map" className="txtColor">{props.t("Carte")}</Link>
                </li>}
                {permissionHelper('statistique','view_statistique') && <li>
                  <Link to="/statistiques/all/statistique" className="txtColor">{props.t("Statistique")}</Link>
                </li>}
                {permissionHelper('statistique','view_prix_produit') && <li>
                  <Link to="/statistiques/liste-des-prix-produits" className="txtColor">{props.t("Liste des Prix")}</Link>
                </li>}
                {/* <li>
                  <Link to="/statistiques/rapport-price" className="txtColor">{props.t("Rapport")}</Link>
                </li> */}
              </ul>
            </li>}

            {permissionHelper('utilisateur','view_utilisateur') && <li className="">
              <Link to="/#" className="has-arrow">
                <i className="fa fa-users"></i>
                <span className="txtColor">{props.t("Utilisateurs")}</span>
              </Link>
              <ul className="sub-menu">
                {permissionHelper('utilisateur','view_utilisateur') && <li>
                  <Link to="/list-users" className="txtColor">{props.t("Liste Utilisateurs")}</Link>
                </li>}
                {permissionHelper('role','view_role') &&  <li>
                  <Link to="/liste-role" className="txtColor"> {props.t("Les roles")} </Link>
                </li>}
              </ul>
            </li>}

          </ul>
        </div>
      </SimpleBar>
    </React.Fragment>
  )
}

SidebarContent.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
}

export default withRouter(withTranslation()(SidebarContent))