import React, { useEffect, useState } from 'react';
import { Row, Col, Card, CardBody, CardTitle, Table, Button } from "reactstrap"
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import "../Tables/datatables.scss"
import { Link } from 'react-router-dom';
import { MDBIcon } from 'mdbreact';
import Pagination from '../../components/Pagination';
import { GET_REFUGIES } from '../../helpers/url_helper';
import axiosApi from '../../helpers/api_helper';
import ReactHTMLTableToExcel from "react-html-table-to-excel";

ReactHTMLTableToExcel.format = (s, c) => {
  if (c && c['table']) {
    const html = c.table;
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const rows = doc.querySelectorAll('tr');

    for (const row of rows) row.removeChild(row.firstChild);

    c.table = doc.querySelector('table').outerHTML;
  }
  return s.replace(/{(\w+)}/g, (m, p) => c[p]);
};

const ListeRefugie = props => {
  const { history } = props;
  const [personnes, setPersonnes] = useState([]);
  useEffect(() => {
    fetchAllPointfocal();
  }, [])


  const fetchAllPointfocal = () => {
    axiosApi.get(GET_REFUGIES).then(res => {
      setPersonnes(res.data);
    })
  }

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
  const currentRecords = personnes.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(personnes.length / recordsPerPage)

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
                    <Col className="col-4">
                      <Button style={{ backgroundColor: '#192957' }} onClick={() => {
                        history.push('/add-refugie')
                      }} className="waves-effect waves-light">
                        <i className="uil uil-plus me-2"></i> Ajouter un refugie
                      </Button>{" "}
                    </Col>
                    <div className="card-tools d-flex align-items-center col-lg-4">
                      <ReactHTMLTableToExcel
                        id="test-table-xls-button"
                        className="button btn btn-success"
                        table="table-to-xls"
                        filename="liste-des-refugies"
                        sheet="tablexls"
                        buttonText="Exporter"
                      />
                    </div>
                    <Col className="col-4">
                      <div className="input-group md-form form-sm form-1 pl-0">
                        <div className="input-group-prepend">
                          <span className="input-group-text purple lighten-3" id="basic-text1">
                            <MDBIcon className="text-dart" icon="search" />
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
                  <CardTitle>La liste des refugies </CardTitle>
                  <div className="table-responsive">
                    <Table className="table table-striped mb-0" id="table-to-xls">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Prenom</th>
                          <th>Nom</th>
                          <th>Profession</th>
                          <th>Telephone</th>
                          <th className='d-none'>Email</th>
                          <th className='d-none'>Pays provenace</th>
                          <th className='d-none'>Age</th>
                          <th className='d-none'>Sexe</th>
                          <th className='d-none'>Situation matrimonial</th>
                          <th className='d-none'>Vulnerabilite</th>
                          <th className='d-none'>situationSanitaire</th>
                          <th className='d-none'>Point entre</th>
                          <th className='d-none'>Date arrive</th>
                          <th className='d-none'>Code OIM</th>
                          <th className='d-none'>Date arrive</th>
                          <th>Type</th>
                          <th>Région</th>
                          <th>Prefecture</th>
                          <th className='d-none'>Commune</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          currentRecords.filter((val) => {
                            return (
                              val.nom.toLowerCase().indexOf(search.toLowerCase()) >= 0
                              || val.prenom.toLowerCase().indexOf(search.toLowerCase()) >= 0
                              || val.email.toLowerCase().indexOf(search.toLowerCase()) >= 0
                              || val?.region?.nom.toLowerCase().indexOf(search.toLowerCase()) >= 0
                              || val?.prefecture?.nom.toLowerCase().indexOf(search.toLowerCase()) >= 0
                              || val?.commune?.nom.toLowerCase().indexOf(search.toLowerCase()) >= 0
                              || val?.codeOim.toLowerCase().indexOf(search.toLowerCase()) >= 0
                              || val.telephone.toLowerCase().indexOf(search.toLowerCase()) >= 0
                            );
                          }).map((val, key) => (
                            <tr key={key}>
                              <td scope="row">{val?.codeOim ? val?.codeOim : val?.code} </td>
                              <td>{val?.prenom} </td>
                              <td>{val?.nom} </td>
                              <td>{val?.profession} </td>
                              <td>{val?.telephone} </td>
                              <td className='d-none'>{val?.email} </td>
                              <td className='d-none'>{val?.paysProvenance} </td>
                              <td className='d-none'>{val?.age} </td>
                              <td className='d-none'>{val?.sexe} </td>
                              <td className='d-none'>{val?.situationMatrimonial} </td>
                              <td className='d-none'>{val?.vulnerabilite} </td>
                              <td className='d-none'>{val?.situationSanitaire} </td>
                              <td className='d-none'>{val?.pointEntre} </td>
                              <td className='d-none'>{val?.dateArrive} </td>
                              <td className='d-none'>{val?.codeOim} </td>
                              <td>{val?.type} </td>
                              <td>{val?.region?.nom} </td>
                              <td>{val?.prefecture?.nom} </td>
                              <td className='d-none'>{val?.commune?.nom} </td>
                              <td>
                                <Link to={`/edit-info-personne/${val.id}`}
                                  className='btn btn-success btn-sm'>
                                  <i className="uil uil-edit me-2"></i>
                                </Link>{" "}
                                <Link to={`/delete-personne/${val.id}`}
                                  className='btn btn-danger btn-sm'>
                                  <i className="uil uil-trash me-2"></i>
                                </Link>
                              </td>
                            </tr>
                          ))
                        }
                      </tbody>
                    </Table>
                    {
                      personnes.length > recordsPerPage ? <Pagination nPages={nPages} currentPage={currentPage} setCurrentPage={setCurrentPage} /> : ''
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

export default ListeRefugie
