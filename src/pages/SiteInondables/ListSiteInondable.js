import React, { useEffect, useState } from 'react';
import { Row, Col, Card, CardBody, CardTitle, Table, Button } from "reactstrap"
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import "../Tables/datatables.scss"
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from "prop-types"

import { getSites } from "../../store/cites/actions"
import { MDBIcon } from 'mdbreact';
// import Pagination from '../../components/Pagination';
import Swal from 'sweetalert2';
import axiosApi from '../../helpers/api_helper';
import Pagination from '../../components/Pagination';

const ListSiteInondable = props => {
    const { sites, onGetSites, history } = props;

    useEffect(() => {
        onGetSites()
    }, [onGetSites])

    //filtre
    //const [sites, setRegions] = useState([]);
    const [search, setSearch] = useState("");

    const [onDate, setOnDate] = useState("");
    const [twoDate, setTwoDate] = useState("");

    const handSearch = (e) => {
        let value = e.target.value;
        value.length > 2 && setSearch(value);
    }

    const handOnDate = (e) => {
        let value = e.target.value;
        setOnDate(value)
    }

    const handTwoDate = (e) => {
        let value = e.target.value;
        setTwoDate(value)
    }

    //pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = sites.slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(sites.length / recordsPerPage)

    return (
        <React.Fragment>
            <div className="page-content">
                <div className="container-fluid">
                    <Breadcrumbs title="Tables" breadcrumbItem="Gestion des sites inondables" />
                    <Row>
                        <Col className="col-12">
                            <Card style={{ backgroundColor: '#fff', borderRadius: 4, }}>
                                <CardBody>
                                    <Row>
                                        <Col className="col-4">
                                            <Button color="dark" onClick={() => {
                                                history.push('/add-site-inondable')
                                            }} className="waves-effect waves-light">
                                                <i className="uil uil-plus me-2"></i> Ajouter un site
                                            </Button>{" "}

                                            {/* <Button color="success" onClick={() => {
                                                history.push('/add-site-inondable')
                                            }} className="waves-effect waves-light">
                                                <i className="uil uil-plus me-2"></i> Export
                                            </Button>{" "} */}
                                        </Col>
                                        <div className="card-tools d-flex align-items-center col-lg-4">
                                            <div className="input-group input-group-sm">
                                                <input className="form-control my-0 py-1" onChange={handOnDate} type="date" placeholder="Recherche"
                                                    aria-label="Recherche" />
                                                <input className="form-control my-0 py-1" onChange={handTwoDate} type="date" placeholder="Recherche"
                                                    aria-label="Recherche" />
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text purple lighten-3" id="basic-text1">
                                                        <MDBIcon className="text-dark" icon="filter" />
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="card-tools d-flex align-items-center col-lg-3">
                                            <div className="input-group input-group-sm">
                                                <input className="form-control my-0 py-1 float-right" type="text" placeholder="Recherche"
                                                    onChange={handSearch}
                                                    aria-label="Recherche" />
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text purple lighten-2" id="basic-text1">
                                                        <MDBIcon className="text-dark" icon="search" />
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
                                    <CardTitle>La liste des sites Inondables</CardTitle>
                                    <div className="table-responsive">
                                        <Table className="table table-striped mb-0" id="datatable">
                                            <thead>
                                                <tr>
                                                    <th>Code</th>
                                                    <th>Date</th>
                                                    <th>Région</th>
                                                    <th>Prefecture</th>
                                                    <th>Commune</th>
                                                    <th>Quartier</th>
                                                    <th>Secteur</th>
                                                    <th>Solution</th>
                                                    <th>Traité</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    currentRecords.filter((val) => {
                                                        if (onDate !== '' && twoDate !== '') {
                                                            return (val.date) >= onDate && (val.date) <= twoDate
                                                        } else {
                                                            return search.toLowerCase() === ''
                                                                ? val : val?.code.toLowerCase().includes(search.toLowerCase());
                                                        }
                                                    }).map((val, key) => (
                                                        <tr key={key}>
                                                            <td>{val?.code} </td>
                                                            <td>{val?.date} </td>
                                                            <td>{val?.region?.nom} </td>
                                                            <td>{val?.prefecture?.nom} </td>
                                                            <td>{val?.commune?.nom} </td>
                                                            <td>{val?.quartier} </td>
                                                            <td>{val?.secteur} </td>
                                                            <td>{val?.solution} </td>
                                                            <td>{val?.traite} </td>
                                                            <td>
                                                                <Link to={`/edit-site-inondable/${val.id}`}
                                                                    className='btn btn-success btn-sm'>
                                                                    <i className="uil uil-edit me-2"></i>
                                                                </Link>{" "}

                                                                <Button onClick={() => {
                                                                    Swal.fire({
                                                                        title: 'Vous êtes sur le point ce site',
                                                                        text: 'Êtes-vous sûr de continuer ?',
                                                                        icon: 'warning',
                                                                        showCancelButton: true,
                                                                        confirmButtonColor: '#3085d6',
                                                                        cancelButtonColor: '#d33',
                                                                        confirmButtonText: 'OUI'
                                                                    }).then((result) => {
                                                                        if (result.isConfirmed) {
                                                                            axiosApi.delete('site/' + val.id).then(res => {
                                                                                if (res.data) {
                                                                                    Swal.fire({
                                                                                        toast: true,
                                                                                        position: 'top-end',
                                                                                        text: 'Suppression effectué avec success.',
                                                                                        icon: 'success',
                                                                                        showConfirmButton: false,
                                                                                        timer: 2000
                                                                                    })
                                                                                } else {
                                                                                    Swal.fire({
                                                                                        toast: true,
                                                                                        position: 'top-end',
                                                                                        text: 'Suppression a echoué.',
                                                                                        icon: 'error',
                                                                                        showConfirmButton: false,
                                                                                        timer: 2000
                                                                                    })
                                                                                }
                                                                            })

                                                                        }
                                                                    })
                                                                }} className='btn btn-danger btn-sm'>
                                                                    <i className="uil uil-trash me-2"></i>
                                                                </Button>
                                                            </td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </Table>
                                        <Pagination nPages={nPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
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

ListSiteInondable.propTypes = {
    sites: PropTypes.array,
    onGetSites: PropTypes.func,
}

const mapStateToProps = ({ sites }) => ({
    sites: sites.sites,
})

const mapDispatchToProps = dispatch => ({
    onGetSites: () => dispatch(getSites()),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(ListSiteInondable))
