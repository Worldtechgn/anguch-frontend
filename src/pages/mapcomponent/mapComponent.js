import React, { useEffect } from 'react'

import * as L from 'leaflet';
import 'leaflet.markercluster';
import 'leaflet/dist/leaflet.css';
import '../../../src/assets/cluster.css'

export const MapComponent = () => {

  useEffect(() => {
    initMap()
  },[])

  const initMap = () =>{
    const OSM_Url = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    const ESRI_WI_Attribution = 'Map data &copy; <a href="http://www.esri.com/">Esri</a>, ' + 'ANGUCH';

    const arr = [
      [9.509325871876037, -13.71122824905625],
      [9.510423258357626, -13.711147232277911],
      [9.509460033103908, -13.711495263724448],
      [9.510681732763187, -13.7124899965714],
      [9.511545558171262, -13.712427434757126],
      [9.51120002826987, -13.710744521953165]
    ]

    var map = L.map('map').setView([10.755987983909058, -11.062657121625131], 6);

    L.tileLayer(OSM_Url, {
      attribution: ESRI_WI_Attribution,
      minZoom: 0,
      maxZoom: 20,
      ext: 'png'
    }).addTo(map);

    //On crée un controle 'mycontrol' pour la carte 'map' et on y ajoute le tableau des trois(3) fonds de carte
    let markers = L.markerClusterGroup({ 
      iconCreateFunction: function (cluster) { 
        var markers = cluster.getAllChildMarkers();
        var digits = (cluster.getChildCount()+'').length;
        return L.divIcon({ 
          html: markers.length, 
          className: 'cluster digits-' + digits,
          iconSize: L.point(40, 40) 
        }); 
      } 
    });

    for (let i = 0; i < arr.length; i++) {
      var latLng = new L.LatLng(arr[i][0], arr[i][1]);
      var marker = new L.circleMarker(latLng, 
        {
          title: 'Catastrophe',
          fillOpacity: 0.7,
          radius: 8,
          fillColor: "red",
          color: "red",
        });
      markers.addLayer(marker);
    }
    map.addLayer(markers);

  }

  return (
    <>
      <div id="map" style={{height:'50vh'}}></div>
    </>
  )
}