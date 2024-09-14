import React, { useEffect, useState } from 'react';
import { Row, Col, Card, CardBody, CardTitle, Table, Button } from "reactstrap"
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import "../Tables/datatables.scss"
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from "prop-types"

import { getDeplacants } from "../../store/deplacants/actions"
import { MDBIcon } from 'mdbreact';
import Pagination from '../../components/Pagination';

const ListeDeplacement = props => {
  const { deplacants, onGetDeplacants, history } = props;

  useEffect(() => {
    onGetDeplacants()
  }, [onGetDeplacants])

  //filtre
  const [search, setSearch] = useState("");
  const handSearch = (e) => {
    let value = e.target.value;
    value.length > 2 && setSearch(value);
  }

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = deplacants.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(deplacants.length / recordsPerPage)

  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs title="Tables" breadcrumbItem="Gestion des réfugies" />
          <Row>
            <Col className="col-12">
              <Card style={{ backgroundColor: '#fff', borderRadius: 4, }}>
                <CardBody>
                  <Row>
                    <Col className="col-8">
                      <Button style={{ backgroundColor: '#192957' }} onClick={() => {
                        history.push('/add-deplacement')
                      }} className="waves-effect waves-light">
                        <i className="uil uil-plus me-2"></i> Ajouter un deplacant
                      </Button>{" "}
                    </Col>
                    <Col className="col-4">
                      <div className="input-group md-form form-sm form-1 pl-0">
                        <div className="input-group-prepend">
                          <span className="input-group-text purple lighten-3" id="basic-text1">
                            <MDBIcon className="text-white" icon="search" />
                          </span>
                        </div>
                        <input className="form-control my-0 py-1" type="text" placeholder="Recherche" onChange={handSearch} aria-label="Recherche" />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            <Col className="col-12">
              <Card style={{ backgroundColor: '#fff', borderRadius: 4, }}>
                <CardBody>
                  <CardTitle>La liste des deplaçants </CardTitle>
                  <div className="table-responsive">
                    <Table className="table table-striped mb-0" id="datatable">
                      <thead>
                        <tr>
                          <th>Prénom</th>
                          <th>Nom</th>
                          <th>Telephone</th>
                          <th>Cause depart</th>
                          <th>Lieux de provenance</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          currentRecords.filter((val) => {
                            return val.personne.telephone.toLowerCase().includes(search.toLowerCase());
                          }).map((val, key) => (
                            <tr key={key}>
                              <td>{val?.personne?.prenom} </td>
                              <td>{val?.personne?.nom} </td>
                              <td>{val?.personne?.telephone} </td>
                              <td>{val?.cause} </td>
                              <td>{val?.lieuProvenance} </td>
                              <td>
                                {/* <Link to={`/edit-deplacement/${val.id}`}
                                                                    className='btn btn-info btn-sm'>
                                                                    <i className="uil uil-view me-2"></i>voir
                                                                </Link>{" "} */}
                                <Link to={`/edit-deplacement/${val.id}`}
                                  className='btn btn-success btn-sm'>
                                  <i className="uil uil-edit me-2"></i>edit
                                </Link>{" "}
                                <Link to={`/delete-migrant/${val.id}`}
                                  className='btn btn-danger btn-sm'>
                                  <i className="uil uil-edit me-2"></i> delete
                                </Link>
                              </td>
                            </tr>
                          ))
                        }
                      </tbody>
                    </Table>
                    {
                      deplacants.length > recordsPerPage ? <Pagination nPages={nPages} currentPage={currentPage} setCurrentPage={setCurrentPage} /> : ''
                    }
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </React.Fragment>
  );
};

ListeDeplacement.propTypes = {
  deplacants: PropTypes.array,
  onGetDeplacants: PropTypes.func,
}

const mapStateToProps = ({ deplacants }) => ({
  deplacants: deplacants.deplacants,
})

const mapDispatchToProps = dispatch => ({
  onGetDeplacants: () => dispatch(getDeplacants()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ListeDeplacement))
