import { useEffect, useState } from "react"
import { Row } from "reactstrap"
import { useForm } from "react-hook-form";

export const AccessibiliteSaison = (props) => {
  const { accessibilite_saison, onHandleAccessibiliteSaison } = props

  const { register,setValue, formState: { errors } } = useForm({
    defaultValues:{
      seche: accessibilite_saison?.seche,
      pluie: accessibilite_saison?.pluie
    },
    mode: "onChange"
  });
  let data = {}
  const [secheOui, setSecheOui] = useState('')
  const [secheNon, setSecheNon] = useState('')

  const [pluieOui, setPluieOui] = useState('')
  const [pluieNon, setPluieNon] = useState('')

  useEffect(() => {

    setSecheOui(accessibilite_saison?.seche)
    setSecheNon(accessibilite_saison?.seche)

    setPluieOui(accessibilite_saison?.pluie)
    setPluieNon(accessibilite_saison?.pluie)

    setValue('pluie',accessibilite_saison?.pluie)
    setValue('seche',accessibilite_saison?.seche)

    let $secheOui = document.getElementById('inlineRadioSecheNon')
    let $secheNon = document.getElementById('inlineRadioMotoNon')
    accessibilite_saison?.seche === "OUI" ? $secheOui.checked = true : $secheOui.checked = false
    accessibilite_saison?.seche === "NON" ? $secheNon.checked = true : $secheNon.checked = false 
    // pluie
    let $pluieOui = document.getElementById('inlineRadioPluieNon')
    let $pluieNon = document.getElementById('inlineRadioPluieNon')
    accessibilite_saison?.pluie === "OUI" ? $pluieOui.checked = true : $pluieOui.checked = false
    accessibilite_saison?.pluie === "NON" ? $pluieNon.checked = true : $pluieNon.checked = false
   

  }, [accessibilite_saison,setValue])

  return (
    <>
      <Row>
      <div className={"form-group col-md-12"}>
          <label>Sélectionner</label>
          <div className="form-check">
            <p className="form-check-label" htmlFor="motoCheckout"><strong>Saison sèche:</strong></p>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="seche" id="inlineRadioSecheNon" value="OUI" defaultChecked={secheOui} {...register('seche')} />
              <label className="form-check-label" htmlFor="inlineRadioSecheNon">OUI</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="seche" id="inlineRadioSecheNon" value="NON" defaultChecked={secheNon} {...register('seche')} />
              <label className="form-check-label" htmlFor="inlineRadioSecheNon">NON</label>
            </div>
          </div>
          <hr/>
          <div className="form-check">
            <p className="form-check-label" htmlFor="motoCheckout"><strong>Saison des pluies:</strong></p>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="pluie" id="inlineRadioPluieOui" value="OUI" defaultChecked={pluieOui} {...register('pluie')} />
              <label className="form-check-label" htmlFor="inlineRadioPluieOui">OUI</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="pluie" id="inlineRadioPluieNon" value="NON" defaultChecked={pluieNon} {...register('pluie')} />
              <label className="form-check-label" htmlFor="inlineRadioPluieNon">NON</label>
            </div>
          </div>
          <hr/>
        </div>
      </Row>
    </>
  )
}