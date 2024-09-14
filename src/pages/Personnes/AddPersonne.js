import React, { useEffect, useState } from 'react';

import { Card, Col, Container, Row, CardBody, CardTitle, Button, } from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch } from 'react-redux';
import {
  addNewPersonne as onAddNewPersonne,
} from '../../store/actions';
import axiosApi from '../../helpers/api_helper';
import { MDBInput } from 'mdbreact';

const AddPersonne = ({ history }) => {
  const dispatch = useDispatch()

  const [listeRegions, setRegions] = useState([]);
  const [listePrefectures, setPrefecture] = useState([]);

  useEffect(() => {
    fetchAllRegions();
  }, []);

  const fetchAllRegions = () => {
    axiosApi.get('/region').then(res => {
      setRegions(res.data);
    })
  }

  const fetchPrefecture = (e) => {
    let region = e.target.value
    if (region) {
      axiosApi.get('/prefecture/region/' + region).then(res => {
        setPrefecture(res.data);
      })
    }
  }

  const regions = listeRegions.map((region, index) => {
    return (
      <option value={region.slug} key={index}>
        {region.nom}
      </option>
    )
  })

  const prefectures = listePrefectures.map((pref, index) => {
    return (
      <option value={pref.slug} key={index}>
        {pref.nom}
      </option>
    )
  })

  const initialValues = {
    nom: '',
    prenom: '',
    email: '',
    age: 0,
    telephone: '',
    vulnerabilite: '',
    situationMatrimonial: '',
    situationSanitaire: '',
    region: '',
    prefecture: '',
    isPersonne: 0,
    dateArrive: '',
    codeOim: '',
    observation: '',
    pointEntre: '',
    profession: '',
    paysProvenance: '',
    sexe: '',
    type: 'Migrant'
  };

  const validationSchema = Yup.object().shape({
    nom: Yup
      .string()
      .required("Le champ nom est obligatoire"),
    vulnerabilite: Yup
      .string()
      .required("Le champ vulnerabilite est obligatoire"),
    situationMatrimonial: Yup
      .string()
      .oneOf(["Marié", "Célibataire", "Divorcé", "Veuve"])
      .required("Le champ situation matrimonial est obligatoire"),
    situationSanitaire: Yup
      .string()
      .required("Le situation sanitaire est obligatoire"),
    dateArrive: Yup
      .string()
      .required("Date d'arrivé est obligatoire"),
    prenom: Yup
      .string()
      .required("Le champ prenom est obligatoire"),
    region: Yup
      .string()
      .required("Le champ region est obligatoire"),
    prefecture: Yup
      .string()
      .required("Le champ prefecture est obligatoire"),
    codeOim: Yup
      .string()
      .required("Le champ code oim est obligatoire"),
    pointEntre: Yup
      .string()
      .required("Le point d'entrée est obligatoire"),
    age: Yup
      .number()
      .min(18)
      .required("Le champ age est obligatoire"),
    telephone: Yup
      .string()
      .required("Le champ téléphone est obligatoire"),
    profession: Yup
      .string()
      .required("Le champ profession est obligatoire"),
    sexe: Yup
      .string()
      .oneOf(["Homme", "Femme"])
      .required("Le champ sexe est obligatoire"),
    paysProvenance: Yup
      .string()
      .required("Le champ pays provenace est obligatoire"),
    email: Yup
      .string("email should be a string")
      .email("Veuillez fournir une adresse email valide")
  });

  const onSubmit = (fields, { setStatus, setSubmitting }) => {
    setStatus();
    createPersonne(fields, setSubmitting);
  }

  function createPersonne(fields, setSubmitting) {
    dispatch(onAddNewPersonne(fields, history))
    setSubmitting(false);
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Formulaire" breadcrumbItem="Gestion migrants" />
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <CardTitle className="mb-4">Formulaire d'enregistrement des réfugiés</CardTitle>
                  <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                    {({ errors, touched, isSubmitting, handleChange }) => {
                      return (
                        <>
                          <Form>
                            <div className='row form-row'>
                              <div className='col-md-6'>
                                <label>Type de personne * </label>
                                <Field name="type" as="select" className={'form-control' + (errors.type && touched.type ? ' is-invalid' : '')} >
                                  <option value="Migrant">Migrant</option>
                                  <option value="Réfugie">Réfugie</option>
                                </Field>
                                <ErrorMessage name="type" component="div" className="invalid-feedback" />
                              </div>
                            </div>
                            <div className="row form-row">
                              <div className="form-group col-md-6">
                                <label>Nom *</label>
                                <Field name="nom" type="text" className={'form-control' + (errors.nom && touched.nom ? ' is-invalid' : '')} />
                                <ErrorMessage name="nom" component="div" className="invalid-feedback" />
                              </div>

                              <div className="form-group col-md-6">
                                <label>Prenom *</label>
                                <Field name="prenom" type="text" className={'form-control' + (errors.prenom && touched.prenom ? ' is-invalid' : '')} />
                                <ErrorMessage name="prenom" component="div" className="invalid-feedback" />
                              </div>

                              <div className="form-group col-md-6">
                                <label>Email</label>
                                <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                                <ErrorMessage name="email" component="div" className="invalid-feedback" />
                              </div>

                              <div className="form-group col-md-6">
                                <label>Telephone *</label>
                                <Field name="telephone" type="text" className={'form-control' + (errors.telephone && touched.telephone ? ' is-invalid' : '')} />
                                <ErrorMessage name="telephone" component="div" className="invalid-feedback" />
                              </div>

                              <div className="form-group col-md-6">
                                <label>Profession *</label>
                                <Field name="profession" type="text" className={'form-control' + (errors.profession && touched.profession ? ' is-invalid' : '')} />
                                <ErrorMessage name="profession" component="div" className="invalid-feedback" />
                              </div>

                              <div className="form-group col-md-6">
                                <label>Situation matrimonial *</label>
                                <Field name="situationMatrimonial" as="select" type="text" className={'form-control' + (errors.situationMatrimonial && touched.situationMatrimonial ? ' is-invalid' : '')} >
                                  <option value="">selectionne </option>
                                  <option value="Marié">Marié</option>
                                  <option value="Célibataire">Célibataire</option>
                                  <option value="Divorcé">Divorcé</option>
                                  <option value="Veuve">Veuve</option>
                                </Field>
                                <ErrorMessage name="situationMatrimonial" component="div" className="invalid-feedback" />
                              </div>

                              <div className="form-group col-md-6">
                                <label>Situation sanitaire *</label>
                                <Field name="situationSanitaire" type="text" className={'form-control' + (errors.situationSanitaire && touched.situationSanitaire ? ' is-invalid' : '')} />
                                <ErrorMessage name="situationSanitaire" component="div" className="invalid-feedback" />
                              </div>

                              <div className="form-group col-md-6">
                                <label>Age *</label>
                                <Field name="age" type="number" className={'form-control' + (errors.age && touched.age ? ' is-invalid' : '')} />
                                <ErrorMessage name="age" component="div" className="invalid-feedback" />
                              </div>

                              <div className="form-group col-md-6">
                                <label>Sexe *</label>
                                <Field name="sexe" as="select" type="text" className={'form-control' + (errors.sexe && touched.sexe ? ' is-invalid' : '')} >
                                  <option value="">selectionne </option>
                                  <option value="Homme">Homme</option>
                                  <option value="Femme">Femme</option>
                                </Field>
                                <ErrorMessage name="sexe" component="div" className="invalid-feedback" />
                              </div>

                              <div className="form-group col-md-6">
                                <label>vulnerabilite *</label>
                                <Field name="vulnerabilite" type="text" className={'form-control' + (errors.vulnerabilite && touched.vulnerabilite ? ' is-invalid' : '')} />
                                <ErrorMessage name="vulnerabilite" component="div" className="invalid-feedback" />
                              </div>

                              <div className="form-group col-md-6">
                                <label>Pays provenance *</label>
                                <Field name="paysProvenance" type="text" className={'form-control' + (errors.paysProvenance && touched.paysProvenance ? ' is-invalid' : '')} />
                                <ErrorMessage name="paysProvenance" component="div" className="invalid-feedback" />
                              </div>

                              <div className="form-group col-md-6">
                                <label>Date arrive *</label>
                                <Field name="dateArrive" type="date" className={'form-control' + (errors.dateArrive && touched.dateArrive ? ' is-invalid' : '')} />
                                <ErrorMessage name="dateArrive" component="div" className="invalid-feedback" />
                              </div>

                              <div className="form-group col-md-6">
                                <label>Region</label>
                                <Field name="region" as="select"
                                  onChange={(e) => { handleChange(e); fetchPrefecture(e) }}
                                  className={'form-control' + (errors.region && touched.region ? ' is-invalid' : '')} >
                                  <option value="">Selectionne une region</option>
                                  {regions}
                                </Field>
                                <ErrorMessage name="region" component="div" className="invalid-feedback" />
                              </div>
                              <div className="form-group col-md-6">
                                <label>Préfecture</label>
                                <Field name="prefecture" as="select" className={'form-control' + (errors.prefecture && touched.region ? ' is-invalid' : '')} >
                                  <option value="">Selectionne une prefecture</option>
                                  {prefectures}
                                </Field>
                                <ErrorMessage name="prefecture" component="div" className="invalid-feedback" />
                              </div>

                              <div className="form-group col-md-6">
                                <label>Point d'entrée *</label>
                                <Field name="pointEntre" type="text" className={'form-control' + (errors.pointEntre && touched.pointEntre ? ' is-invalid' : '')} />
                                <ErrorMessage name="pointEntre" component="div" className="invalid-feedback" />
                              </div>

                              <div className="form-group col-md-6">
                                <label>Code de l'oim *</label>
                                <Field name="codeOim" type="text" className={'form-control' + (errors.codeOim && touched.codeOim ? ' is-invalid' : '')} />
                                <ErrorMessage name="codeOim" component="div" className="invalid-feedback" />
                              </div>

                              <div className="form-group col-md-12">
                                <label>Observation</label>
                                <Field as={MDBInput} name="observation" type="textarea" className={'form-control' + (errors.observation && touched.region ? ' is-invalid' : '')} />
                                <ErrorMessage name="observation" component="div" className="invalid-feedback" />
                              </div>
                            </div>

                            <div className="form-group mt-2">
                              <button type="submit" disabled={isSubmitting} className="btn btn-success m-1 float-right">
                                {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                <i className='fa fa-save'></i> Enregister
                              </button>

                              <Button color="danger" onClick={() => {
                                history.push('/list-migrant')
                              }} className="waves-effect waves-light">
                                <i className="uil uil-plus me-2"></i> annulle
                              </Button>{" "}
                            </div>
                          </Form>
                        </>
                      );
                    }}
                  </Formik>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment >
  );
};

export default AddPersonne;