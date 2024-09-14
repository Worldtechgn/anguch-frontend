import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

const MultipleBarChart = (props) => {

  const {donnees, chartTitle} = props;
  useEffect(() => {
    fetchData(donnees);
  }, [donnees])

  const [data, setData] = useState({})
  const [option, setOption] = useState({})
  const fetchData = (donnees) => {    
    const _data = donnees;
    setData({
      type: 'bar',
      labels: _data.labels,
      datasets: _data.datasets
    })
    setOption({
      responsive: true,
      legend: {
        position: "bottom",
      },
      tooltips: {
        callbacks: {
          label: (item, data) => {
            const dataset = data.datasets[item.datasetIndex]
            const newLabel = [];
            if (dataset.label) {
              newLabel.push(dataset.label + ':')
            }
            newLabel.push(dataset.data[item.index])
            if (dataset.unitSuffix) {
              newLabel.push(dataset.unitSuffix)
            }
            return newLabel.join(' ')
          }
        },
      },
      title: {
        display: true,
        text: chartTitle
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

export default MultipleBarChart;
