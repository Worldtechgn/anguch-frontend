import PropTypes from 'prop-types';
import React from "react";
import { Col, Card, CardBody } from "reactstrap";
import CountUp from 'react-countup';
// import ReactApexChart from "react-apexcharts";

const MiniWidget = props => {
  return (
    <React.Fragment>
      {props.reports.map((report, key) => (
        <Col md={6} xl={4} key={key}>
          <Card style={{ backgroundColor: '#fff', borderRadius: 4, }}>
            <CardBody>
              {/* <div className="float-end mt-2">
                <ReactApexChart
                  options={report.options}
                  series={report.series}
                  type={report.charttype}
                  height={report.chartheight}
                  width={report.chartwidth}
                />
              </div> */}
              <div>
                <h4 className="mb-1 mt-1"><span><CountUp end={report.statis.value} separator="," prefix={report.statis.prefix} suffix={report.statis.suffix} decimals={report.statis.decimal} /></span></h4>
                <p className="text-muted mb-0">{report.statis.label}</p>
              </div>
              {/* <p className="text-muted mt-3 mb-0"><span className={"text-" + report.statis.color + " me-1"}><i className={report.statis.icon + " me-1"}></i>{report.statis.badgeValue}</span>{" "}{report.statis.desc}
              </p> */}
            </CardBody>
          </Card>
        </Col>
      ))}
    </React.Fragment>
  );
};

export default MiniWidget;

MiniWidget.propTypes = {
  reports: PropTypes.array
};