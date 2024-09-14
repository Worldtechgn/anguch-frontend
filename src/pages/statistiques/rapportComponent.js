import { useEffect, useState } from "react";
import { Card, CardBody, CardHeader, CardTitle, Col, Container, Row } from "reactstrap";
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import axiosApi from "../../helpers/api_helper";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { MDBDataTable } from "mdbreact";

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
const RapportPage = () => {
  useEffect(() => {
    initProduitPrefecture()
  },[])

  const [produits,setProduits] = useState([])
  const [data, setData] = useState([])
  const initProduitPrefecture = () => {
    axiosApi.get('/dashboard/statistique/produit-prefecture-price-by-region').then((res)=>{
      const _values = Object.values(res.data)
      setProduits(_values)
      setData(res.data)
    })
  }
  return (
    <>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="ANGUCH" breadcrumbItem="Rapport de prix region et prefecture" />
          {/* <Row>
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
          </Row> */}
          <Row>
            <Col className="col-12">
              <Card style={{ backgroundColor: '#fff', borderRadius: 4, }}>
                <CardHeader>
                  <CardTitle>Repartion des catastrophes</CardTitle>
                </CardHeader>
                <CardBody className="table-responsive">
                <MDBDataTable
                  striped
                  bordered
                  hover
                  data={data}
                />
                  {/* <Table className="table table-bordered table-sm" id="table-to-xls">
                    <thead>
                      <tr>
                        <th rowSpan={2} className="text-center">#</th>
                        <th rowSpan={2} className="text-center">Région</th>
                        <th rowSpan={2} className="text-center">Prefecture</th>
                        <th colSpan={produits.length} className="text-center">Denrées</th>
                      </tr>
                      <tr>
                        {Object.entries(produitPrefectures).map(([p,values]) => <th key={p}>{p}</th>)}
                      </tr>
                    </thead>
                    <tbody>
                      <tr></tr>
                        {Object.entries(produitPrefectures).map(([_p,v],index) => <tr key={index}>
                          <td>{(index + 1)}</td>
                          <td>{Object.keys(v[0])[0]}</td>
                          <td>{Object.values(v[0])[0].prefecture}</td>
                          {produits.map(([e,v],index) =><td key={index} className="text-end">{Object.values(e)[0].prix}</td>)}
                          </tr> )
                        }
                    </tbody>
                  </Table> */}
                  
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}

export default RapportPage;