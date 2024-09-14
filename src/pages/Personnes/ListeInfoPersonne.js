import React, { useEffect, useState } from 'react';
import { Row, Col, Card, CardBody, CardTitle, Table } from "reactstrap"
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import "../Tables/datatables.scss"
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from "prop-types"

import { getPersonnes } from "../../store/personnes/actions"
import { MDBIcon } from 'mdbreact';
import Pagination from '../../components/Pagination';
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
const ListeInfoPersonne = props => {
    const { personnes, onGetPersonnes, history } = props;


    useEffect(() => {
        onGetPersonnes()
    }, [onGetPersonnes])

    //filtre
    const [search, setSearch] = useState("");
    const [filterType, setFilterType] = useState("");
    const handSearch = (e) => {
        let value = e.target.value;
        value.length > 2 && setSearch(value);
    }

    const handFilterType = (e) => {
        let type = e.target.value;
        setFilterType(type)
    }

    const handPaginate = (e) => {
        let showPage = e.target.value;
        setRecordsPerPage(showPage)
    }

    //pagination de
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(30);

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = personnes.slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(personnes.length / recordsPerPage)

    return (
        <React.Fragment>
            <div className="page-content">
                <div className="container-fluid">
                    <Breadcrumbs title="Tables" breadcrumbItem="Gestion des personnes" />
                    <Row>
                        <Col className="col-12">
                            <Card style={{ backgroundColor: '#fff', borderRadius: 4, }}>
                                <CardBody>
                                    <Row>
                                        <div className="card-tools d-flex align-items-center col-lg-4">
                                            <ReactHTMLTableToExcel
                                                id="test-table-xls-button"
                                                className="button btn btn-success"
                                                table="table-to-xls"
                                                filename="liste-des-personnes"
                                                sheet="tablexls"
                                                buttonText="Exporter"
                                            />
                                        </div>
                                        <div className="card-tools d-flex align-items-center col-lg-4">
                                            <div className="input-group input-group-sm">
                                                <select className="form-control my-0 py-1" onChange={handFilterType}>
                                                    <option value="">Filtrer les types</option>
                                                    <option value="Migrant">Migrant</option>
                                                    <option value="Réfugie">Réfugie</option>
                                                </select>
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text purple lighten-3" id="basic-text1">
                                                        <MDBIcon className="text-write" icon="filter" />
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="card-tools d-flex align-items-center col-lg-3">
                                            <div className="input-group input-group-sm">
                                                <input className="form-control my-0 py-1" type="text" onChange={handSearch} placeholder="Recherche"
                                                    aria-label="Recherche" />
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text purple lighten-3" id="basic-text1">
                                                        <MDBIcon className="text-write" icon="search" />
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col className="col-12">
                            <Card style={{ backgroundColor: '#fff', borderRadius: 4, }}>
                                <CardBody>
                                    <CardTitle>
                                        <div className="row">
                                            <div className="card-tools d-flex align-items-center col-lg-6">
                                                <div className="input-group input-group-sm">
                                                    La liste des personnes
                                                </div>
                                            </div>
                                            <div className="card-tools d-flex align-items-center col-lg-3">
                                            </div>
                                            <div className="card-tools d-flex align-items-center col-lg-3">
                                                <div className="input-group input-group-sm float-end">
                                                    <select className="form-control input-group-addon" onChange={handPaginate}>
                                                        <option value={10}>10</option>
                                                        <option value={30}>30</option>
                                                        <option value={50}>50</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                    </CardTitle>
                                    <div className="table-responsive">
                                        <Table className="table table-striped mb-0" id="table-to-xls">
                                            <thead>
                                                <tr>
                                                    <th>Code de l'OMI</th>
                                                    <th>Prenom</th>
                                                    <th>Nom</th>
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
                                                    <th className='text-center'>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    currentRecords
                                                        .filter((val) => {
                                                            return val.type.toLowerCase().includes(filterType.toLowerCase());
                                                        })
                                                        .filter((val) => {
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
                                                        })
                                                        .map((val, key) => (
                                                            <tr key={key}>
                                                                <td scope="row">{val?.codeOim ? val?.codeOim : val?.code}  </td>
                                                                <td>{val?.prenom} </td>
                                                                <td>{val?.nom} </td>
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
                                                                <td className='text-center'>
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

ListeInfoPersonne.propTypes = {
    personnes: PropTypes.array,
    onGetPersonnes: PropTypes.func,
}

const mapStateToProps = ({ personnes }) => ({
    personnes: personnes.personnes,
})

const mapDispatchToProps = dispatch => ({
    onGetPersonnes: () => dispatch(getPersonnes()),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(ListeInfoPersonne))
