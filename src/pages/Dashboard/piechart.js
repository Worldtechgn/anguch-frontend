import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { Card, CardBody, Table } from "reactstrap";
import Chart from 'react-apexcharts'

const PieChart = (props) => {

	const { reports } = props
	const [options, setOptions] = useState({})
	const [series, setSeries] = useState([])
	useEffect(() => {
		let series = reports.map(report => report.statis.value)
		let labels = reports.map(report => report.statis.label)

		setOptions({
			plotOptions: {
				radialBar: {
					startAngle: -135,
					endAngle: 225,
					hollow: {
						margin: 0,
						size: "70%",
						background: "#fff",
						image: undefined,
						imageOffsetX: 0,
						imageOffsetY: 0,
						position: "front",
						dropShadow: {
							enabled: true,
							top: 3,
							left: 0,
							blur: 4,
							opacity: 0.24
						}
					},
					track: {
						background: "#fff",
						strokeWidth: "67%",
						margin: 0, // margin is in pixels
						dropShadow: {
							enabled: true,
							top: -3,
							left: 0,
							blur: 4,
							opacity: 0.35
						}
					},
					dataLabels: {
						showOn: "always",
						name: {
							offsetY: -20,
							show: true,
							color: "#888",
							fontSize: "13px"
						},
						value: {
							formatter: function (val) {
								return val;
							},
							color: "#111",
							fontSize: "30px",
							show: true
						}
					}
				}
			},
			fill: {
				type: "gradient",
				gradient: {
					shade: "dark",
					type: "horizontal",
					shadeIntensity: 0.5,
					gradientToColors: ["#ABE5A1"],
					inverseColors: true,
					opacityFrom: 1,
					opacityTo: 1,
					stops: [0, 100]
				}
			},
			stroke: {
				lineCap: "round"
			},
			labels: labels
		})
		setSeries(series)
	}, [reports]);

	return (
		<>
			<Card>
				{/* <CardHeader><CardTitle className="mb-4 h4">Repartition par type de catastrophe</CardTitle></CardHeader> */}
				<CardBody>
					<Chart
						options={options}
						series={series}
						type="pie"
						width="580"
					/>
					<Table className="table table-striped table-bordered mb-0">
						<thead>
							<tr>
								<th>Labelle</th>
								<th>Valeur</th>
							</tr>
						</thead>
						<tbody>
							{
								reports.map((report, key) => (
									<tr key={key}>
										<td>{report.statis.label}</td>
										<td>{report.statis.value}</td>
									</tr>
								))
							}
						</tbody>
					</Table>
				</CardBody>
			</Card>
		</>
	)
}

export default PieChart

PieChart.propTypes = {
	reports: PropTypes.array
};