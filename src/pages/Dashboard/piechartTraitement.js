import React, { useEffect, useState } from "react"
import ReactEcharts from "echarts-for-react"
import axiosApi from "../../helpers/api_helper";

const PieTraitement = () => {
  const [options, setOptions] = useState({});

  useEffect(() => {
    fetchEtatTraitement();

  }, [])

  const fetchEtatTraitement = () => {
    axiosApi.get('/dashboard/statistique/etat-traitement').then(res => {
      setOptions({
        toolbox: {
          show: false,
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: ["Traité", "Non traiter", "Encours de traitement"],
          textStyle: {
            color: ["#74788d"],
          },
        },
        color: ["#02a499", "#38a4f8", "#f8b425"],
        series: [
          {
            name: "Etat de traitement de la catastrophe",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              { value: res.data.oui, name: "Traité" },
              { value: res.data.non, name: "Non traiter" },
              { value: res.data.encours, name: "Encours de traitement" },
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      })
    })
  }

  return (
    <React.Fragment>
      <ReactEcharts style={{ height: "400px" }} option={options} />
    </React.Fragment>
  )
}
export default PieTraitement
