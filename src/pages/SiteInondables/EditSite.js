import React, { useEffect, useMemo, useState } from 'react';

import {
  Card,
  Col,
  Container,
  Row,
  CardBody,
  FormGroup,
  Label,
  Form,
  Input,
  FormFeedback,
} from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux"
import PropTypes from "prop-types"
import * as Yup from 'yup';
//Import actions
import {
  getSiteDetail
} from "../../store/actions"
import { useFormik } from 'formik';
import { updateSited } from '../../helpers/backend_helper';
import Swal from 'sweetalert2';
import axiosApi from '../../helpers/api_helper';

const EditSite = props => {
  const { site, match: { params }, onGetSite, history } = props;

  const [selectedRegion] = useState()
  const [selectedPref] = useState()

  const [listeRegions, setRegions] = useState([]);
  const [listePrefectures, setPrefecture] = useState([]);
  const [listeCommunes, setCommune] = useState([]);


  useEffect(() => {
    fetchAllRegions();
    fetchAllPrefectures();
    fetchAllCommune();
  }, []);

  const fetchAllRegions = () => {
    axiosApi.get('/region').then(res => {
      setRegions(res.data);
    })
  }

  const fetchAllPrefectures = () => {
    axiosApi.get('/prefecture').then(res => {
      setPrefecture(res.data);
    })
  }

  const fetchAllCommune = () => {
    axiosApi.get('/commune').then(res => {
      setCommune(res.data);
    })
  }

  function getFilteredList() {
    if (!selectedRegion) {
      return listePrefectures
    }
    return listePrefectures.filter(item => item.slug === selectedRegion)
  }

  function getFilterPrefList() {
    if (!selectedPref) {
      return listeCommunes
    }
    return listeCommunes.filter(item => item.slug === selectedPref)
  }

  var filteredList = useMemo(getFilteredList, [selectedRegion, listePrefectures])

  var filteredListCommune = useMemo(getFilterPrefList, [selectedPref, listeCommunes])

  const regions = listeRegions.map(region => {
    return (
      <option value={region.slug} key={region.slug}>
        {region.nom}
      </option>
    )
  })

  const prefectures = filteredList.map(pref => {
    return (
      <option value={pref.slug} key={pref.slug}>
        {pref.nom}
      </option>
    )
  })

  const communes = filteredListCommune.map(commune => {
    return (
      <option value={commune.slug} key={commune.slug}>
        {commune.nom}
      </option>
    )
  })

  useEffect(() => {
    if (params && params.id) {
      onGetSite(params.id)
    } else {
      onGetSite(1)
    }
  }, [onGetSite, params])

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      region: (site && site?.region?.slug) || "",
      prefecture: (site && site?.prefecture?.slug) || "",
      commune: (site && site?.commune?.slug) || "",
      quartier: (site && site.quartier) || "",
      secteur: (site && site.secteur) || "",
      menageImpacte: (site && site.menageImpacte) || "",
      cause: (site && site.cause) || "",
      solution: (site && site.solution) || "",
      traite: (site && site.traite) || "",
      observation: (site && site.observation) || "",
      date: (site && site.date) || "",
    },
    validationSchema: Yup.object({
      quartier: Yup
        .string("email should be a string")
        .required("quartier is required"),
      menageImpacte: Yup
        .number("Un nombre de menage impacté ne peut pas inclure de point décimal")
        .positive("Un nombre de menage impacté ne peut pas commencer par un moins")
        .min(1)
        .required("le nombre de menage impacte est obligatoire"),
      cause: Yup
        .string("email should be a string")
        .required("cause is required"),
      secteur: Yup
        .string("email should be a string")
        .required("secteur is required"),
      solution: Yup
        .string("email should be a string")
        .required("solution is required"),
      traite: Yup
        .string("email should be a string")
        .required("statut is required"),
      date: Yup
        .string("email should be a string")
        .required("date est obligatoire"),
      region: Yup
        .string("email should be a string")
        .required("region is required"),
      prefecture: Yup
        .string("email should be a string")
        .required("prefecture is required"),
      commune: Yup
        .string("email should be a string")
        .required("commune is required"),
    }),
    onSubmit: values => {
      console.log(values);
      const updateSite = {
        id: site ? site.id : 0,
        code: values.code,
        region: values.region,
        prefecture: values.prefecture,
        commune: values.commune,
        date: values.date,
        quartier: values.quartier,
        secteur: values.secteur,
        menageImpacte: values.menageImpacte,
        cause: values.cause,
        solution: values.solution,
        traite: values.traite,
        observation: values.observation,
      }
      updateSited(site.id, updateSite)
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        toast: true,
        title: 'Modification effectué avec success',
        showConfirmButton: false,
        timer: 3500
      })
      history.push("/site-inondable")

    },
  })

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Formulaire" breadcrumbItem="Gestion sites inondables" />
          <Row>
            <Col lg={12}>
              <Card style={{ backgroundColor: '#fff', borderRadius: 4, }}>
                <CardBody>
                  {/* <CardTitle className="mb-4">Formulaire d'enregistrement des sites inondables</CardTitle> */}
                  <Form className="needs-validation" onSubmit={e => {
                    e.preventDefault()
                    validation.handleSubmit()
                    return false
                  }}>

                    <Row>
                      <Col md={6}>
                        <FormGroup className="mb-3">
                          <div className="mb-3">
                            <Label className="form-label">Date d'inondation</Label>
                            <Input
                              name="date"
                              type="date"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.date || ""}
                            />
                            {validation.touched.date &&
                              validation.errors.date ? (
                              <FormFeedback type="invalid">
                                {validation.errors.date}
                              </FormFeedback>
                            ) : null}
                          </div>
                        </FormGroup>
                      </Col>

                      <Col md={6}>
                        <FormGroup className="mb-3">
                          <div className="mb-3">
                            <Label htmlFor="formrow-region-Input">region</Label>
                            <select
                              name="region"
                              onChange={(e) => { validation.handleChange(e); fetchAllPrefectures(e) }}
                              onBlur={validation.handleBlur}
                              value={validation.values.region || ""}
                              className="form-control">
                              <option value="">Selectionne une region</option>
                              {regions}
                            </select>
                            {validation.touched.region &&
                              validation.errors.region ? (
                              <FormFeedback type="invalid">
                                {validation.errors.region}
                              </FormFeedback>
                            ) : null}
                          </div>
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup className="mb-3">
                          <div className="mb-3">
                            <Label htmlFor="formrow-prefecture-Input">Prefecture</Label>
                            <select
                              name="prefecture"
                              id="prefecture"
                              onChange={(e) => { validation.handleChange(e); fetchAllCommune(e) }}
                              onBlur={validation.handleBlur}
                              value={validation.values.prefecture || ""}
                              className="form-control">
                              <option value="">selectionne une prefecture</option>
                              {prefectures}
                            </select>
                            {validation.touched.prefecture &&
                              validation.errors.prefecture ? (
                              <FormFeedback type="invalid">
                                {validation.errors.prefecture}
                              </FormFeedback>
                            ) : null}
                          </div>
                        </FormGroup>
                      </Col>

                      <Col md={6}>
                        <FormGroup className="mb-3">
                          <div className="mb-3">
                            <Label htmlFor="formrow-commune-Input">Commmune</Label>
                            <select
                              name="commune"
                              id="commune"
                              onChange={(e) => { validation.handleChange(e); }}
                              onBlur={validation.handleBlur}
                              value={validation.values.commune || ""}
                              className="form-control">
                              <option value="">selectionne une commune</option>
                              {communes}
                            </select>
                            {validation.touched.commune &&
                              validation.errors.commune ? (
                              <FormFeedback type="invalid">
                                {validation.errors.commune}
                              </FormFeedback>
                            ) : null}
                          </div>
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6}>
                        <FormGroup className="mb-3">
                          <div className="mb-3">
                            <Label className="form-label">Quartier</Label>
                            <Input
                              name="quartier"
                              type="type"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.quartier || ""}
                            />
                            {validation.touched.quartier &&
                              validation.errors.quartier ? (
                              <FormFeedback type="invalid">
                                {validation.errors.quartier}
                              </FormFeedback>
                            ) : null}
                          </div>
                        </FormGroup>
                      </Col>

                      <Col md={6}>
                        <FormGroup className="mb-3">
                          <div className="mb-3">
                            <Label className="form-label">Secteur</Label>
                            <Input
                              name="secteur"
                              type="type"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.secteur || ""}
                            />
                            {validation.touched.secteur &&
                              validation.errors.secteur ? (
                              <FormFeedback type="invalid">
                                {validation.errors.secteur}
                              </FormFeedback>
                            ) : null}
                          </div>
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6}>
                        <FormGroup className="mb-3">
                          <div className="mb-3">
                            <Label className="form-label">Menage Impacte</Label>
                            <Input
                              name="menageImpacte"
                              type="number"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.menageImpacte || ""}
                            />
                            {validation.touched.menageImpacte &&
                              validation.errors.menageImpacte ? (
                              <FormFeedback type="invalid">
                                {validation.errors.menageImpacte}
                              </FormFeedback>
                            ) : null}
                          </div>
                        </FormGroup>
                      </Col>

                      <Col md={6}>
                        <FormGroup className="mb-3">
                          <div className="mb-3">
                            <Label className="form-label">Cause</Label>
                            <Input
                              name="cause"
                              type="type"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.cause || ""}
                            />
                            {validation.touched.cause &&
                              validation.errors.cause ? (
                              <FormFeedback type="invalid">
                                {validation.errors.cause}
                              </FormFeedback>
                            ) : null}
                          </div>
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6}>
                        <FormGroup className="mb-3">
                          <div className="mb-3">
                            <Label className="form-label">Solution</Label>
                            <Input
                              name="solution"
                              type="type"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.solution || ""}
                            />
                            {validation.touched.solution &&
                              validation.errors.solution ? (
                              <FormFeedback type="invalid">
                                {validation.errors.solution}
                              </FormFeedback>
                            ) : null}
                          </div>
                        </FormGroup>
                      </Col>

                      <Col md={6}>
                        <FormGroup className="mb-3">
                          <div className="mb-3">
                            <Label className="form-label">Traite</Label>
                            <Input
                              name="traite"
                              type="type"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.traite || ""}
                            />
                            {validation.touched.traite &&
                              validation.errors.traite ? (
                              <FormFeedback type="invalid">
                                {validation.errors.traite}
                              </FormFeedback>
                            ) : null}
                          </div>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={12}>
                        <FormGroup className="mb-3">
                          <div className="mb-3">
                            <Label htmlFor="formrow-observation-Input">Observation</Label>
                            <textarea
                              type="textarea"
                              name="observation"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.observation || ""}
                              className="form-control"
                              placeholder="observation"
                            />
                            {validation.touched.observation &&
                              validation.errors.observation ? (
                              <FormFeedback type="invalid">
                                {validation.errors.observation}
                              </FormFeedback>
                            ) : null}
                          </div>
                        </FormGroup>
                      </Col>
                    </Row>

                    <div>
                      <button type="submit" className="btn btn-primary w-md float-rigth">
                        Modifier
                      </button>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
}
EditSite.propTypes = {
  site: PropTypes.object,
  onGetSite: PropTypes.func,
}

const mapStateToProps = ({ sites }) => ({
  site: sites.site,
})

const mapDispatchToProps = dispatch => ({
  onGetSite: id => dispatch(getSiteDetail(id)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(EditSite))