import { useEffect, useState } from "react";
import { Button, Table } from "reactstrap";
import Swal from "sweetalert2";

export const OngComponent = (props) => {
  const { ongs } = props;

  const [arr_ongs, setOngs] = useState([])
  useEffect(() => {
    setOngs(ongs)
  }, [ongs])

  const handleRemove = (index) => {
    Swal.fire({
      title: 'Suppression du produit',
      text: 'Etes-vous sûre de supprimer ce produit',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'OUI'
    }).then((result) => {
      if (result.isConfirmed) {
        arr_ongs.splice(index, 1);
        setOngs(arr_ongs)
      }
    })

  }

  return (
    <Table className="table table-striped table-hover">
      <thead>
        <tr>
          <th>#</th>
          <th>Nom de l'ong</th>
          <th>Type de l'ong</th>
          <th>Resident</th>
          <th>Intervient</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {arr_ongs.map((ong, index) => <tr key={index}>
          <td>{index + 1}</td>
          <td>{ong.nom}</td>
          <td>{ong.type}</td>
          <td>{ong.resident}</td>
          <td>{ong.intervient}</td>
          <td>
            <Button type="button" className={'btn btn-sm btn-danger'} onClick={() => handleRemove(index)}>Supp</Button>
          </td>
        </tr>)}

      </tbody>
    </Table>
  );
};
