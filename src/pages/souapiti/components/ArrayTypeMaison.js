import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const ArrayTypeMaison = (props) => {

  const {register, useFieldArray, control, maisonTouches} = props;

  let type_maisons = [
    'Maison',
    'Case',
    'Maison en terre',
    'Maison de ville',
    'Château',
    'Pavillon',
    'Petit bien',
    'Grand bien',
    'Petit bien en château',
    'Grand bien en château',
    'Petit bien en pavillon',
    'Grand bien en pavillon',
  ]

  const handleAppend = (value) => {
    append(value);
  };

  const [_maisonTouches, setMaisonTouches] = useState([]);
  useEffect(() => {
    setMaisonTouches(maisonTouches.map(d => d.type));
  },[])

  const handleRemove = (index) => {
    Swal.fire({
      title: 'Vous êtes sur le point de supprimer ? ',
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

  // const [typeMaison, setTypeMaison] = useState([type_maisons])
  const onChange = (e) => {
    for (let i = 0; i < type_maisons.length; i++) {
      if(e.target.value !== type_maisons[i]){
        type_maisons.push(type_maisons[i])
      }
    }
    console.log(type_maisons);
    // setTypeMaison(type_maisons)    
  }

  const { fields, append, remove } = useFieldArray({
    control,
    name: "maison_touche",
  });

  return(
    <>
      {fields.map((item,index) => (
        <div className="row mb-3" key={index}>
          <div className={'col-md-6'}>
            <div className="form-group">
              <label>Type de maison</label> 
              <select className="form-control" placeholder="Type de maison"
                onChange={onChange}
                {...register(`maison_touche[${index}].type`)}
              >
                {type_maisons.map((d,index) =><option key={index} value={d}>{d}</option>)}
              </select>
            </div>
          </div>
          <div className={'col-md-5'}>
            <div className="form-group">
              <label>Type de maison</label> 
              <input className="form-control" 
              type={'number'} 
              {...register(`maison_touche[${index}].nombre`)} 
              placeholder={`Nombre`}/>
            </div>
          </div> 
          {fields.length > 1 && <div className={'col-md-1'}>
            <button type="button" className="btn btn-danger mt-4" onClick={() => handleRemove(index)}>
              Supprimer
            </button>
          </div>}
        </div>
      ))}
      <div className="row mt-3">
        <div className="col-md-12">
          <button type="button" className="btn btn-primary btn-sm" style={{ backgroundColor: '#192957' }}
            onClick={() => handleAppend({ type: "", nombre: ""})}
          >
            Ajouter
          </button>
        </div>
      </div>
    </>
  );
}

export default ArrayTypeMaison;