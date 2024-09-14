import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import axiosApi from "../../helpers/api_helper";

const Apaexlinecolumn = () => {
  const [regions, setRegions] = useState([]);
  const [types, setType] = useState([]);
  const [series, setSeries] = useState([]);
  const [options, setOptions] = useState({});

  useEffect(() => {
    fetchRegion();

  }, [])

  const fetchRegion = () => {
    axiosApi.get('/dashboard/statistique/menage-region').then(res => {
      setType(listRegionByType(res.data).types);
      setRegions(listRegionByType(res.data).regions);

      //console.log(listRegionByType(res.data).types.data);

      setSeries([
        {
          name: listRegionByType(res.data).types.map(es => es.name),
          data: [74, 83, 102, 97, 86, 106, 93, 114, 94],
        },
        {
          // name: "Reven",
          data: [74, 83, 102, 97, 86, 106, 93, 114, 94],
        },
        {
          //name: "Free Cash Flow",
          data: [37, 42, 38, 26, 47, 50, 54, 55, 43],
        },
      ]);

      setOptions({
        chart: {
          toolbar: {
            show: !1,
          },
        },
        plotOptions: {
          bar: {
            horizontal: !1,
            columnWidth: '45%',
            endingShape: 'rounded'
          },
        },
        dataLabels: {
          enabled: !1
        },
        stroke: {
          show: !0,
          width: 2,
          colors: ['transparent']
        },
        seriess: [{
          name: 'Net Profit',
          data: [46, 57, 59, 54, 62, 58, 64]
        }, {
          name: 'Revenue',
          data: [74, 83, 102, 97, 86, 106, 93]
        }, {
          name: 'Free Cash Flow',
          data: [37, 42, 38, 26, 47, 50, 54, 55, 43]
        }],
        colors: ['#f1b44c', '#5b73e8', '#34c38f'],
        xaxis: {
          categories: listRegionByType(res.data).regions,

        },
        yaxis: {
          title: {
            text: 'nombre total de menage affecté'
          }
        },
        grid: {
          borderColor: '#f1f1f1',
        },
        fill: {
          opacity: 1

        },
        tooltip: {
          y: {
            formatter: function (val) {
              return "$ " + val + " thousands";
            }
          }
        }
      })
    })

  }


  const listRegionByType = (listRegion) => {
    let arrayRegions = [];
    let typeTmp = [];
    let typeData = [];
    for (let i = 0; i < listRegion.length; i++) {
      const element = listRegion[i];
      arrayRegions.push(element.region);

      typeTmp.push({
        name: element.type,
        data: element.data
      });
    }

    for (const type of typeTmp) {
      typeData.push({
        name: type.name,
        data: type.data[type.name].map(e => e.nbreTotalMenage)
      })
    }
    return { types: typeData, regions: arrayRegions };
  }






  return (
    <ReactApexChart options={options} series={types} type="histogram" height={350} className="apex-charts" />
  );
};

export default Apaexlinecolumn;
