import React, { useEffect } from 'react';
import { Row, Col, Card, CardBody, Button } from "reactstrap"
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from "prop-types"
import { getPersonneDetail } from '../../store/actions';

const ShowPersonne = props => {
  const { personne, match: { params }, onGetPersonne, history} = props;

  useEffect(() => {
		if (params && params.id) {
			onGetPersonne(params.id)
		} else {
			history.push('/list-info-personne')
		}
	}, [onGetPersonne, params])


  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs title="Personne" breadcrumbItem={`${personne.nom} ${personne.prenom}` } />
          <Row>
            <Col className='col-md-12'>
              <Card>
                <CardBody>
                  <Button color="success" onClick={() => { history.push('/add-personne') }} className="waves-effect waves-light">
                    <i className="uil uil-plus me-2"></i> Ajouter comme un deplacé
                  </Button>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col className="col-12">
              <Card>
                <CardBody>
                  <div className="row form-row">
                    <div className="col-md-6">
                      <label>Code de l'OIM</label> 
                      <div className='form-control'><strong>{personne.codeOim}</strong></div>
                    </div> 
                  </div>
                  <div className="row form-row">
                    <div className="col-md-6">
                      <label>Nom</label> 
                      <div className='form-control'><strong>{personne.nom}</strong></div>
                    </div> 
                    <div className="col-md-6">
                      <label>Prénoms</label> 
                      <div className='form-control'><strong>{personne.prenom}</strong></div>
                    </div>
                    <div className="col-md-6">
                      <label>Sexe</label> 
                      <div className='form-control'><strong>{personne?.sexe}</strong></div>
                    </div>
                    <div className="col-md-6">
                      <label>Profession</label> 
                      <div className='form-control'><strong>{personne?.profession}</strong></div>
                    </div> 
                    <div className="col-md-6">
                      <label>Contact</label> 
                      <div className='form-control'><strong>{personne?.telephone}</strong></div>
                    </div>
                    <div className="col-md-6">
                      <label>Région</label> 
                      <div className='form-control'><strong>{personne?.region?.nom}</strong></div>
                    </div> 
                    <div className="col-md-6">
                      <label>Préfecture</label> 
                      <div className='form-control'><strong>{personne?.prefecture?.nom}</strong></div>
                    </div> 
                    <div className="col-md-6">
                      <label>Point d'entré</label> 
                      <div className='form-control'><strong>{personne?.pointEntre}</strong></div>
                    </div> 
                    <div className="col-md-6">
                      <label>Observation</label> 
                      <div className='form-control'><strong>{personne?.observation}</strong></div>
                    </div> 
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </React.Fragment>
  )
}

ShowPersonne.propTypes = {
  personne : PropTypes.object,
  onGetPersonne: PropTypes.func
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
)(withRouter(ShowPersonne))