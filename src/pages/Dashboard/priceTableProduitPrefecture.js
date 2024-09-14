import { Card, CardBody, CardHeader, CardTitle, Col, Row, Table } from "reactstrap"


const PriceTableProdduitPrefecture = (props) => {

  const {produitPrefectures} = props
  
  
  return (
    <>
    <Row>
      <Col>
        <Card style={{ backgroundColor: '#fff', borderRadius: 4, height: '55vh',overflow:'auto'}}>
          <CardHeader>
            <CardTitle><h4 className="card-title mb-4">Tableau de prix des denrés par regions et Préfectures </h4></CardTitle>
          </CardHeader>
          <CardBody>
            <Table className="table table-striped table-bordered table-hover">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Region</th>
                  <th>Produit</th>
                </tr>
              </thead>
              <tbody>
                {produitPrefectures.map((p,index)=>
                  <tr key={index}>
                    <td>{ index + 1 }</td>
                    {p.denre.length > 0 && <td rowSpan={p.denre.length + 1}>{ p.city }</td>}
                    <td>
                      <table className="table">
                        <tbody>
                            {p.denre.map((d,index) =>
                              <tr key={index}>
                                <td>{d.produit}</td>
                                <td className="text-rigth">{d.price}</td>
                              </tr>
                            )}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </Col>
    </Row>
    </>
  )

}

export default PriceTableProdduitPrefecture