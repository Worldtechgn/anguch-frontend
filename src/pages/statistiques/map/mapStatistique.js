import { useEffect } from "react";
import * as L from 'leaflet';
import 'leaflet.markercluster';
import 'leaflet/dist/leaflet.css';
import '../../../assets/cluster.css'
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from "reactstrap";
import axiosApi from "../../../helpers/api_helper";
import  "leaflet.awesome-markers";

// import { Select } from "@material-ui/core";
// 623592380
import guineaMap from './guinea_sub.json';

const MapStatistique = () => {

  useEffect(() => {
    var container = L.DomUtil.get("map_statistique");
    if (container != null) {
      container._leaflet_id = null;
    }

    const map = L.map('map_statistique').setView([10.755987983909058, -11.062657121625131], 7);
		initMap(map,'init')
    mapDecoupage(map)
    return () => map.remove();
  }, [])

  const OSM_Url = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  const ESRI_WI_Attribution = 'Map data &copy; <a href="http://www.esri.com/">Esri</a>, ' + 'ANGUCH';

  // const elementRegion = document.getElementById('idRegion')

	const initMap = (map) => {
		axiosApi.get('/dashboard/statistique/map').then(res => {
			initialMap(res.data, map,'init', groupByRegion(res.data))
		})
	}

  const initialMap = (pointCatastrophe, map, init = "init",regions) =>{
    // setPointCatastrophes(pointCatastrophe)
    if(init !== "init"){
      map.remove();
    }
    L.tileLayer(OSM_Url, {attribution: ESRI_WI_Attribution, minZoom: 0,maxZoom: 20,ext: 'png'}).addTo(map);
    //On crée un controle 'mycontrol' pour la carte 'map' et on y ajoute le tableau des trois(3) fonds de carte
    let markers = L.markerClusterGroup({
      iconCreateFunction: function (cluster) {
        let markers = cluster.getAllChildMarkers();
        let digits = (cluster.getChildCount() + '').length;
        return L.divIcon({
          html: markers.length,
          className: 'cluster digits-' + digits,
          iconSize: L.point(40, 40)
        });
      }
    });

    var redMarker = L.AwesomeMarkers.icon({
      prefix: 'fa', //font awesome rather than bootstrap
      markerColor: 'purple', // see colors above
      icon: 'fa-map-marker',
      iconColor: '#192957'
    })

    for (let i = 0; i < pointCatastrophe.length; i++) {
      var latLng = new L.LatLng(pointCatastrophe[i]['ltlgn'][0], pointCatastrophe[i]['ltlgn'][1]);
      var marker = new L.marker(latLng,{icon: redMarker});
      let _html = `
        <b>${pointCatastrophe[i]?.typeCatastrophe}</b>
        <div>${pointCatastrophe[i]?.region_nom} - ${pointCatastrophe[i]?.prefecture_nom} - ${pointCatastrophe[i]?.commune_nom} </div>
        <ul>
          <li>Nombre de menage : <b> ${pointCatastrophe[i].nbreTotalMenage} </b> </li>
          <li>Nombre d'enfants -10ans: <b> ${pointCatastrophe[i].nbreEnfant} </b> </li>
          <li>Nombre de femmes: <b> ${pointCatastrophe[i].nbreFemme} </b> </li>
          <li>Nombre d'hommes: <b> ${pointCatastrophe[i].nbreHomme} </b> </li>
        </ul>
      `
      marker.bindPopup(_html).openPopup();
      markers.addLayer(marker);
    }
    map.addLayer(markers);
    // legendMap(map,regions)
  }

  const mapDecoupage = (map) => {
    let jsonObj = L.geoJSON(guineaMap,{
      stroke:true,
      color:'#FF7F2A', 
      opacity: 0.5, 
      fill: true, 
      fillColor:'#fff',
      fillOpacity: 0.2,
      onEachFeature: function (feature, layer) {
        layer.on({
          mouseover: function(e) {
            const layer = e.target;
            layer.setStyle({
              weight: 5,
              color: '#FF7F2A',
              dashArray: '',
              fillOpacity: 0.7
            });
            if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
              layer.bringToFront(); // Permet de garantir que le pays est au-dessus des autres couches de données
            }
          },
          mouseout: function(e) {
            jsonObj.resetStyle(e.target);
          }
        });
      }
    }).addTo(map);
  }

  const groupByRegion = (catastrophes) => {
    const groups = catastrophes.reduce((groups, item) => ({
      ...groups,
      [item?.region_nom]: [...(groups[item?.region_nom] || []), item]
    }), {});
    let by_region = []
    for (const [key, value] of Object.entries(groups)) {
      by_region.push({
        city: key,
        value: Object.entries(value)[0][1]?.region_nom
      })
    }
    return by_region;
  }

  // const legendMap = (map,regions) => {

  //   let htmlOption = '';
  //   for (let i = 0; i < regions.length; i++) {
  //     htmlOption += '<option value="' + regions[i].city + '">' + regions[i].city + '</option>'      
  //   }

  //   var legend = L.control({position: 'topright'});
  //   legend.onAdd = function (map) {
  //   var div = L.DomUtil.create('div', 'info legend');
  //   div.innerHTML = `
  //     <div class="row">
  //       <div class="col-12">
  //         <select style="widht:50%;" class='form-control'>
  //           <option>--Sélectionner--</option>
  //           ${htmlOption}
  //         </select>
  //       </div>
  //     </div>
  //     `;
  //   div.firstChild.onmousedown = div.firstChild.ondblclick = L.DomEvent.stopPropagation;
  //     return div;
  //   };
  //   legend.addTo(map);
  // }

	return (
		<>
			<div className="page-content">
				<Row>
					<Col className="col-12">
						<Card style={{ backgroundColor: '#fff', borderRadius: 4, }}>
							<CardHeader>
								<CardTitle>Repartion des catastrophes</CardTitle>
							</CardHeader>
							<CardBody>
								<div id="map_statistique" style={{ height: '66vh' }}></div>
							</CardBody>
						</Card>
					</Col>
					{/* <Col className="col-4">
						<Card style={{ backgroundColor: '#fff', borderRadius: 4, }}>
							<CardHeader>
								<CardTitle>Filtre : </CardTitle>
							</CardHeader>
							<CardBody>
								<div className="form-group">
									<label>Region</label>
									<select 
                    name="region"
                    className="form-control"
                    id="idRegion"
                    onChange={handleChangeRegion}>
										<option>Selectionner</option>
                    {regions.length > 0 && regions.map((region,index) => <option key={index} value={region.value}>{region.city}</option>)}
									</select>
								</div>
							</CardBody>
						</Card>
					</Col> */}
				</Row>
			</div>
		</>
	)
}

export default MapStatistique