/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Chart } from "react-google-charts";
import { ConfigSelectors } from "../redux/configRedux";
import axiosClient from '../api/axiosClient.js'

const PurchaseChart = ({onChange}) => {
  const isOpen = useSelector(ConfigSelectors.isOpenSidebar);
  const salonId = localStorage.getItem('salonId');
  const [data, setData] = useState([
    ["Time", "Number of Appointments"],
    ["9:00 AM", 4],
    ["10:00 AM", 6],
    ["11:00 AM", 8],
    ["12:00 PM", 5],
    ["1:00 PM", 10],
    ["2:00 PM", 7],
    ["3:00 PM", 9],
  ]);

  useEffect(() => {
    axiosClient
    .get(`/appointments/${salonId}/appointments-per-time-slot`)
    .then((data) => {
      setData(data)
    })
  }, [onChange]);
  const options = {
    title: "Number of Appointments Picked per Time Slot",
    chartArea: { width: "60%" },
    hAxis: {
      title: "Time",
      minValue: 0,
    },
    vAxis: {
      title: "Number of Appointments",
    },
  };
  const renderChart = useCallback(() => {
    return (
      <Chart
        chartType="ColumnChart"
        width={"100%"}
        height={"400px"}
        data={data}
        options={options}
      />
    );
  }, [data, options]);

  useEffect(() => {
    renderChart();
  }, [isOpen, renderChart]);

  // return the chart component
  return <div style={{ maxWidth: 1266.42 }}>{renderChart()}</div>;
};

export default PurchaseChart;
