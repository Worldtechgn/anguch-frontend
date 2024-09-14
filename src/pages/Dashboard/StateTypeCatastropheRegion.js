import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

const StateTypeCatastropheRegion = (props) => {

  const {catastrophes} = props;
  useEffect(() => {
    fetchRegion(catastrophes);
  }, [catastrophes])

  const [data, setData] = useState({})
  const [option, setOption] = useState({})
  const fetchRegion = (catastrophes) => {    
    const _data = catastrophes;
    setData({
      type: 'bar',
      labels: _data.regions,
      datasets: _data.datasets
    })
    setOption({
      responsive: true,
      legend: {
        position: "bottom",
      },
      title: {
        display: false,
        text: "Nombre total menage affecté par region"
      },
      scales: {
        xAxes: [{
          stacked: false
        }],
        yAxes: [{
          ticks: {
            beginAtZero: true,
            stacked: false,
          }
        }]
      }
    })
  }

  return (
    <Bar width={474} height={300} data={data} options={option} />
  )

};

export default StateTypeCatastropheRegion;
