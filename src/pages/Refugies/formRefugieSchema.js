import React, { useEffect, useMemo, useState } from 'react';

import { Card, Col, Container, Row, CardBody, CardTitle, FormGroup, Label, } from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import REGIONS from '../../data/regionData.json';
import PREFECTURES from '../../data/prefectureData.json';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { withRouter, useHistory } from 'react-router-dom';
import { connect, useDispatch } from "react-redux"
import PropTypes from "prop-types"
import {
    getPersonneDetail
} from "../../store/actions"

import SweetAlert from 'react-bootstrap-sweetalert';

const EditRefugie = props => {
    const [sweetA, setSweetAlert] = useState(false);
    const dispatch = useDispatch()
    const history = useHistory();
    const { personne, match: { params }, onGetPersonne } = props;

    useEffect(() => {
        if (params && params.id) {
            onGetPersonne(params.id)
        } else {
            onGetPersonne(1)
        }
    }, [onGetPersonne, params])

    const initialValues = {
        nom: (personne && personne.nom) || "",
        prenom: (personne && personne.prenom) || "",
        email: (personne && personne.email) || "",
        age: (personne && personne.age) || 0,
        telephone: (personne && personne.telephone) || "",
        vulnerabilite: (personne && personne.vulnerabilite) || "",
        situationMatrimonial: (personne && personne.situationMatrimonial) || "",
        situationSanitaire: (personne && personne.situationSanitaire) || "",
        region: (personne && personne?.region?.id) || "",
        prefecture: (personne && personne?.prefecture?.id) || "",
        dateArrive: (personne && personne.dateArrive) || "",
        codeOim: (personne && personne.codeOim) || "",
        observation: (personne && personne.observation) || "",
        pointEntre: (personne && personne.pointEntre) || "",
        profession: (personne && personne.profession) || "",
        paysProvenance: (personne && personne.paysProvenance) || "",
        sexe: (personne && personne.sexe) || "",
        type: (personne && personne.type) || "Réfugie"
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
        observation: Yup
            .string()
            .required("Le champ d'observation est obligatoire"),
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

    const [prefecturetList, setPrefectureList] = useState([]);
    const [selectedRegion, setSelectedRegion] = useState();
    useEffect(() => {
        setPrefectureList(PREFECTURES);
    }, []);

    function getFilteredList() {
        if (!selectedRegion) {
            return prefecturetList;
        }
        return prefecturetList.filter((item) => item.id_region == selectedRegion);
    }

    var filteredList = useMemo(getFilteredList, [selectedRegion, prefecturetList]);

    const regions = REGIONS.map(region => {
        return (
            <option value={region.id_region} key={region.id_region}>
                {region.fields.name}
            </option>
        )
    })

    const prefectures = filteredList.map(pref => {
        return (
            <option value={pref.id_prefecture} key={pref.id_prefecture}>
                {pref.name}
            </option>
        )
    })

    const onSubmit = (fields, { setStatus, setSubmitting }) => {
        console.log(fields);
        setStatus();
        onUpdatePersonne(fields, setSubmitting);
        setSweetAlert(true)
    }

    function onUpdatePersonne(fields, setSubmitting) {
        //dispatch(updatePersonne(fields))
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
                                    <CardTitle className="mb-4">Formulaire de modification des réfugiés</CardTitle>
                                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                                        {({ errors, touched, isSubmitting }) => {
                                            return (
                                                <>
                                                    <Form>
                                                        {
                                                            sweetA ? (
                                                                <SweetAlert
                                                                    title="Enregistrement effectué avec success."
                                                                    timeout={2000}
                                                                    style={{
                                                                        position: "absolute",
                                                                        top: "0px",
                                                                        right: "0px",
                                                                    }}
                                                                    showCloseButton={false}
                                                                    showConfirm={false}
                                                                    success
                                                                    onConfirm={() => {
                                                                        setSweetAlert(false);
                                                                    }}
                                                                ></SweetAlert>
                                                            ) : null
                                                        }
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
                                                                <Field name="region" as="select" className={'form-control' + (errors.region && touched.region ? ' is-invalid' : '')} >
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
                                                                <label>Observation *</label>
                                                                <Field name="observation" type="text" className={'form-control' + (errors.observation && touched.observation ? ' is-invalid' : '')} />
                                                                <ErrorMessage name="observation" component="div" className="invalid-feedback" />
                                                            </div>
                                                        </div>

                                                        <div className="form-group mt-2">
                                                            <button type="submit" disabled={isSubmitting} className="btn btn-success m-1 float-right">
                                                                {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                                                <i className='fa fa-check'></i> Enregister
                                                            </button>
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

EditRefugie.propTypes = {
    personne: PropTypes.object,
    onGetPersonne: PropTypes.func,
}

const mapStateToProps = ({ personnes }) => ({
    personne: personnes.personne,
})

const mapDispatchToProps = dispatch => ({
    onGetPersonne: id => dispatch(getPersonneDetail(id)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(EditRefugie))