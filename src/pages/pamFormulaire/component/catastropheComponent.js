import { useEffect, useState } from 'react';
import Select from 'react-select';
import { getCatastrophes } from '../../../helpers/backend_type_data_catastrophe';


const CatastropheComponent = (props) => {


  const [type_catastrophes,setType_catastrophes] = useState([])

  const initCatastrophe = () => {
    getCatastrophes().then(typeCatastrophe => setType_catastrophes(
      typeCatastrophe.map(cat => ({label: cat.name, value: cat.name }))
    ));
  }

  const { idReferenceMemo, catastrophes, onHandleCatastrophe } = props

  const [catastropheOptions, setCatastropheOption] = useState([])

  useEffect(() => {
    let _catastrophes = catastrophes.map(e=>{return {label:e, value:e}})    
    setCatastropheOption(_catastrophes)
    initCatastrophe();
  }, [catastrophes])

  const handleChangeTypeCatastrophe = (event) => {
    setCatastropheOption(event)
    onHandleCatastrophe(event.map(e=>e.value))
  }

  return (
    <>
      <div className={"form-group"} style={{ marginBottom: '10px' }}>
        <label>Sélectionner</label>
        {idReferenceMemo ?
          <Select name="type_catastrophe"
            placeholder="Selectionne type"
            isMulti={true}
            className="select"
            isClearable={false}
            isSearchable={true}
            isDisabled={false}
            isLoading={false}
            isRtl={false}
            closeMenuOnSelect={false}
            onChange={handleChangeTypeCatastrophe}
            value={catastropheOptions}
            selected={catastropheOptions}
            options={type_catastrophes}
          >
          </Select> :
          <Select name="type_catastrophe"
            placeholder="Selectionne type"
            isMulti={true}
            className="select"
            isClearable={true}
            isSearchable={true}
            isDisabled={false}
            isLoading={false}
            isRtl={false}
            closeMenuOnSelect={false}
            selected={catastropheOptions}
            onChange={handleChangeTypeCatastrophe}
            options={type_catastrophes}
          >
          </Select>
        }
      </div>
    </>
  )

}

export default CatastropheComponent