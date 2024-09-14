import PropTypes from 'prop-types'
import React, { useEffect } from "react"

import { Row, Col, CardBody, Alert, Container, Form, Input, FormFeedback, Label } from "reactstrap";

// Redux
import { withRouter } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";

// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";
import { loginUser } from '../../store/actions';
import logoLight from "../../assets/images/logo-light.png";
// actions
import "./styles.css";

const Login = (props) => {
  const dispatch = useDispatch();

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Veuillez saisir votre e-mail"),
      password: Yup.string().required("Veuillez saisir votre mot de passe"),
    }),

    onSubmit: (values) => {
      dispatch(loginUser(values, props.history));
    }
  });

  const { error } = useSelector(state => ({
    error: state.Login.error,
  }));

  useEffect(() => {
    document.body.className = "authentication-bg";
    return function cleanup() {
      document.body.className = "";
    };
  });

  return (
    <React.Fragment>
      <div className="account-pages my-5 pt-sm-5">
        <Container>

          <Row className="align-items-center justify-content-center">
            <Col md={8} lg={6} xl={5}>


              <CardBody className="p-4">
                <div className="p-2 mt-4">
                  <Form className="form-horizontal" onSubmit={(e) => {
                    e.preventDefault();
                    validation.handleSubmit();
                    return false;
                  }}>

                    {error ? <Alert color="danger">{error}</Alert> : null}
                    <div className="d-flex justify-content-center h-100">
                      <div className="user_card">
                        <div className="d-flex justify-content-center">
                          <div className="brand_logo_container">
                            <img src={logoLight} className="brand_logo" alt="Logo" />
                          </div>
                        </div>
                        <div className="form_container">
                          <div className="mb-3">
                            <Label className="form-label">Email </Label>
                            <Input
                              name="email"
                              className="form-control"
                              placeholder="Email"
                              type="email"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.email || ""}
                              invalid={
                                validation.touched.email && validation.errors.email ? true : false
                              }
                            />
                            {validation.touched.email && validation.errors.email ? (
                              <FormFeedback type="invalid">{validation.errors.email}</FormFeedback>
                            ) : null}
                          </div>

                          <div className="mb-3">
                            <Label className="form-label">Password</Label>
                            <Input
                              name="password"
                              value={validation.values.password || ""}
                              type="password"
                              placeholder="Mot de passe"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              invalid={
                                validation.touched.password && validation.errors.password ? true : false
                              }
                            />
                            {validation.touched.password && validation.errors.password ? (
                              <FormFeedback type="invalid">{validation.errors.password}</FormFeedback>
                            ) : null}
                          </div>
                          <div className="d-flex justify-content-center mt-3 login_container">
                            <button
                              className="btn w-100 waves-effect waves-light login_btn"
                              type="submit">
                              Connecter
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Form>

                </div>
              </CardBody>

            </Col>
          </Row>


        </Container>
      </div>
    </React.Fragment>
  )
}

export default withRouter(Login);

Login.propTypes = {
  error: PropTypes.any,
  history: PropTypes.object,
  loginUser: PropTypes.func,
  socialLogin: PropTypes.func
}