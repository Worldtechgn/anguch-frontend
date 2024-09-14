import { useEffect, useState } from "react"
import { getTypeEnquete } from "../../helpers/backend_type_enquete"
import { Button, Card, CardBody, Col, Row, Table } from "reactstrap"
import Modal from 'react-bootstrap/Modal';

import { withRouter } from 'react-router-dom';
import AddModal from "./components/addModal";
import EditModal from "./components/editModal";

const IndexTypeEnquetePage = () =>{

  const [type_enquetes, setType_enquetes] = useState([])
  useEffect(() => {
    loadData()
  },[])

  const loadData = () =>{
    getTypeEnquete().then(response => {
      setType_enquetes(response)
    })
  }

  const [showEdit, setShowEdit] = useState(false);
  const handleClose = () => setShowEdit(false);
  const handleShow = () => setShowEdit(true);

  const [typeEnquete, setTypeEnquete] = useState({});

  const handleEnqueteShow = (typeEnquete) => {
    setTypeEnquete(typeEnquete)
    handleShow()
  }

  return (
    <>
    <div className="page-content">
      <div className="container-fluid">
        <Row>
          <Col>
            <AddModal loadData={loadData} />
          </Col>
        </Row>
        <Row>
          <Col>
            <Card style={{ backgroundColor: '#fff', borderRadius: 4, }}>
              <CardBody>
                <Table className="table-striped table-hover">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Nom</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {type_enquetes.map((tq,index) => <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        {tq.name}
                      </td>
                      <td>
                        <Button color={'primary'} className="btn btn-sm" onClick={()=>handleEnqueteShow(tq)}>
                          <i className="fa fa-edit"></i>
                        </Button>
                      </td>
                    </tr>) }
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Modal 
          show={showEdit} 
          onHide={handleClose} 
          animation={true}
        >
          <EditModal 
            typeEnquete={typeEnquete} 
            show={handleShow}
            onHide={handleClose}
            loadData={loadData}
          />
        </Modal>
      </div>
    </div>
    </>
  )
}

export default withRouter(IndexTypeEnquetePage)