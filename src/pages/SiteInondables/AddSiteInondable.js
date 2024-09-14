import React, { useEffect, useState } from 'react';

import {
    Card,
    Col,
    Container,
    Row,
    CardBody,
    Button,
} from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { useDispatch } from 'react-redux';
//SweetAlert
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axiosApi from '../../helpers/api_helper';
import {
    addNewSite as onAddNewSite,
} from '../../store/actions';
import { MDBInput } from 'mdbreact';
import Swal from 'sweetalert2';

const AddSiteInondable = ({ history }) => {
    const dispatch = useDispatch()

    const [listeRegions, setRegions] = useState([]);
    const [listePrefectures, setPrefecture] = useState([]);
    const [listeCommune, setCommune] = useState([]);

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

    const fetchCommune = (e) => {
        let prefecture = e.target.value
        if (prefecture) {
            axiosApi.get('/commune/prefecture/' + prefecture).then(res => {
                setCommune(res.data);
            })
        }
    }

    // const isAddMode = true;
    const initialValues = {
        quartier: '',
        section: '',
        menageImpacte: 0,
        cause: '',
        solution: '',
        traite: '',
        observation: '',
        region: '',
        prefecture: '',
        commune: '',
        secteur: '',
        date: ''
    };


    const validationSchema = Yup.object().shape({
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
        date: Yup
            .string("email should be a string")
            .required("le champ date est obligatoire"),
        traite: Yup
            .string("email should be a string")
            .required("veuillez selectionner etat de traitement"),
        region: Yup
            .string("email should be a string")
            .required("veuillez selectionner une region"),
        prefecture: Yup
            .string("email should be a string")
            .required("veuillez selectionner une prefecture"),
        commune: Yup
            .string("email should be a string")
            .required("veuillez selectionner une commune"),
    });

    const regions = listeRegions.map(region => {
        return (
            <option value={region.slug} key={region.slug}>
                {region.nom}
            </option>
        )
    })

    const prefectures = listePrefectures.map(pref => {
        return (
            <option value={pref.slug} key={pref.slug}>
                {pref.nom}
            </option>
        )
    })

    const communes = listeCommune.map(commune => {
        return (
            <option value={commune.slug} key={commune.slug}>
                {commune.nom}
            </option>
        )
    })

    const onSubmit = (fields, { setStatus, setSubmitting }) => {
        setStatus();
        createSite(fields, setSubmitting);
        Swal.fire({
            toast: true,
            position: 'top-end',
            text: 'Enregistrement effectué avec success.',
            icon: 'success',
            showConfirmButton: false,
            timer: 2000
        })
    }

    function createSite(fields, setSubmitting) {
        dispatch(onAddNewSite(fields, history))
        setSubmitting(false);
    }
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid={true}>
                    <Breadcrumbs title="Formulaire" breadcrumbItem="Gestion sites inondables" />
                    <Row>
                        <Col lg={12}>
                            <Card style={{ backgroundColor: '#fff', borderRadius: 4, }}>
                                <CardBody>
                                    <Formik onChange={() => {
                                        console.log('changing');
                                    }} initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                                        {({ errors, touched, isSubmitting, setFieldValue, values, handleChange }) => {
                                            return (
                                                <>
                                                    <Form>
                                                        <div className="row form-row">
                                                            <div className="form-group col-md-6">
                                                                <label>Date d'inondation</label>
                                                                <Field name="date" type="date" className={'form-control' + (errors.date && touched.date ? ' is-invalid' : '')} />
                                                                <ErrorMessage name="date" component="div" className="invalid-feedback" />
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
                                                                <Field name="prefecture" as="select" onChange={(e) => { handleChange(e); fetchCommune(e) }} className={'form-control' + (errors.prefecture && touched.prefecture ? ' is-invalid' : '')} >
                                                                    <option value="">Selectionne une prefecture</option>
                                                                    {prefectures}
                                                                </Field>
                                                                <ErrorMessage name="prefecture" component="div" className="invalid-feedback" />
                                                            </div>

                                                            <div className="form-group col-md-6">
                                                                <label>Commune</label>
                                                                <Field name="commune" as="select" className={'form-control' + (errors.commune && touched.commune ? ' is-invalid' : '')} >
                                                                    <option value="">Selectionne une commune</option>
                                                                    {communes}
                                                                </Field>
                                                                <ErrorMessage name="commune" component="div" className="invalid-feedback" />
                                                            </div>

                                                            <div className="form-group col-md-6">
                                                                <label>Quartier</label>
                                                                <Field name="quartier" type="text" className={'form-control' + (errors.quartier && touched.quartier ? ' is-invalid' : '')} />
                                                                <ErrorMessage name="quartier" component="div" className="invalid-feedback" />
                                                            </div>
                                                            <div className="form-group col-md-6">
                                                                <label>Secteur</label>
                                                                <Field name="secteur" type="text" className={'form-control' + (errors.secteur && touched.secteur ? ' is-invalid' : '')} />
                                                                <ErrorMessage name="secteur" component="div" className="invalid-feedback" />
                                                            </div>

                                                            <div className="form-group col-md-6">
                                                                <label>Menage impacté</label>
                                                                <Field name="menageImpacte" type="number" className={'form-control' + (errors.menageImpacte && touched.menageImpacte ? ' is-invalid' : '')} />
                                                                <ErrorMessage name="menageImpacte" component="div" className="invalid-feedback" />
                                                            </div>

                                                            <div className="form-group col-md-6">
                                                                <label>Cause</label>
                                                                <Field name="cause" type="text" className={'form-control' + (errors.cause && touched.cause ? ' is-invalid' : '')} />
                                                                <ErrorMessage name="cause" component="div" className="invalid-feedback" />
                                                            </div>
                                                            <div className="form-group col-md-6">
                                                                <label>Solution</label>
                                                                <Field name="solution" type="text" className={'form-control' + (errors.solution && touched.solution ? ' is-invalid' : '')} />
                                                                <ErrorMessage name="solution" component="div" className="invalid-feedback" />
                                                            </div>
                                                            <div className="form-group col-md-6">
                                                                <label>Traite</label>
                                                                <Field name="traite" as="select" type="text" className={'form-control' + (errors.traite && touched.traite ? ' is-invalid' : '')} >
                                                                    <option value="">selectionne </option>
                                                                    <option value="Encours">Encours</option>
                                                                    <option value="NON">NON</option>
                                                                    <option value="OUI">OUI</option>
                                                                </Field>
                                                                <ErrorMessage name="traite" component="div" className="invalid-feedback" />
                                                            </div>

                                                            <div className="form-group col-md-12">
                                                                <label>Observation</label>
                                                                <Field as={MDBInput} name="observation" type="textarea" className={'form-control' + (errors.observation && touched.region ? ' is-invalid' : '')} />
                                                                <ErrorMessage name="observation" component="div" className="invalid-feedback" />
                                                            </div>
                                                        </div>

                                                        <div className="form-group mt-2">
                                                            <button type="submit" disabled={isSubmitting} className="btn btn-success m-1">
                                                                {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                                                <i className='fa fa-check'></i> Enregister
                                                            </button>
                                                            <Button color="danger" onClick={() => {
                                                                history.push('/site-inondable')
                                                            }} className="waves-effect waves-light">
                                                                <i className="uil uil-remove me-2"></i> fermer
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
        </React.Fragment>
    );
}

export default AddSiteInondable;
