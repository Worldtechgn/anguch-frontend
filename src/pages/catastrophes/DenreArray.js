import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const DenreArray = (props) => {

  const {register, useFieldArray, control, denres,denresInit} = props;
  const unites = [
    "Kg",
    "Tonne",
    "Sac",
    "Grenier"
  ]

  const handleAppend = (value) => {
    append(value);
  };

  const [_denres, setDenres] = useState([]);
  useEffect(() => {
    setDenres(denres.map(d => d.nom));
  },[])

  const handleRemove = (index) => {
    Swal.fire({
      title: 'Vous êtes sur le point de supprimer cette denre',
      text: 'Êtes-vous sûr de continuer ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'OUI'
    }).then((result) =>{
      if (result.isConfirmed){
        remove(index);
      }
    })
  };

  const onChange = (e) => {
    console.log(e.target.value);
  }

  const { fields, append, remove } = useFieldArray({
    control,
    name: "typeDenre",
  });

  return(
    <>
      {fields.map((item,index) => (
        <div className="row mb-3" key={index}>
          <div className={'col-md-4'}>
            <div className="form-group input-group-sm">
              <span style={{'display':'none'}}>label {item.nom}</span> 
              <select className="form-control"
                onChange={onChange}
                {...register(`typeDenre[${index}].nom`)}
              >
                <option>--Sélectionner--</option>
                {denres.map((d,index) =><option key={index} value={d.name}>{d.name}</option>)}
              </select>
            </div>
          </div>
          <div className={'col-md-3'}>
            <div className="form-group input-group-sm">
              <input className="form-control" 
              type={'number'} 
              {...register(`typeDenre[${index}].quantite`)} 
              placeholder={`produit`}/>
            </div>
          </div> 
          <div className={'col-md-4'}>
            <div className="form-group input-group-sm">
              <select className="form-control input-group-sm" 
                {...register(`typeDenre[${index}].unite`)}>
                <option>--Sélectionner--</option>
                {unites.map((u,index) =><option key={index} value={u}>{u}</option>)}
              </select>
            </div>
          </div>
          {fields.length > 1 && <div className={'col-md-1'}>
            <button type="button" className="btn btn-danger btn-sm" onClick={() => handleRemove(index)}>
              Supprimer
            </button>
          </div>}
        </div>
      ))}
      <div className="row mt-3">
        <div className="col-md-12">
          <button type="button" className="btn btn-primary btn-sm" style={{ backgroundColor: '#192957' }}
            onClick={() => handleAppend({ nom: "", quantite: "", unite:""})}
          >
            Ajouter
          </button>
        </div>
      </div>
    </>
  );
}

export default DenreArray;