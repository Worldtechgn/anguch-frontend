import React, { useEffect, useState } from "react"
import ReactApexChart from "react-apexcharts"
import axiosApi from "../../helpers/api_helper";

const PieChartEtatTraitement = () => {
  const [series, setSeries] = useState([]);

  useEffect(() => {
    fetchEtatTraitement();

  }, [])

  const fetchEtatTraitement = () => {
    axiosApi.get('/dashboard/statistique/etat-traitement').then(res => {
      setSeries([res.data.non, res.data.encours, res.data.oui])
    })
  }


  // console.log(etat);

  // const series = [1, 52, 23]
  const options = {
    labels: ["Non traiter", "Encours de traitement", "Traité"],
    colors: ["#5b73e8", "#f1b44c", "#34c38f",],
    legend: {
      show: !0,
      position: 'bottom',
      horizontalAlign: 'center',
      verticalAlign: 'middle',
      floating: !1,
      fontSize: '23px',
      offsetX: 0
    },
    responsive: [{
      breakpoint: 600,
      options: {
        chart: {
          height: 240
        },
        legend: {
          show: !1
        },
      }
    }]
  }

  return (
    <ReactApexChart options={options} series={series} type="donut" height="320" className="apex-charts" />
  )
}

export default PieChartEtatTraitement
