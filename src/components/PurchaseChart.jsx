/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Chart } from "react-google-charts";
import { ConfigSelectors } from "../redux/configRedux";
import axiosClient from "../api/axiosClient.js";
import LoadingIndicator from "./LoadingIndicator";

const PurchaseChart = ({ onChange }) => {
  const isOpen = useSelector(ConfigSelectors.isOpenSidebar);
  const salonId = localStorage.getItem("salonId") || "All";
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
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true); // Set loading state to true before API call

    axiosClient
      .get(`/appointments/${salonId}/appointments-per-time-slot`)
      .then((data) => {
        setData(data);
      })
      .finally(() => {
        setLoading(false); // Set loading state to false after API call completion
      });
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

  // Return the chart component or loading indicator based on the loading state
  return (
    <div style={{ maxWidth: 1266.42, marginTop: 20 }}>
      {isLoading ? <LoadingIndicator /> : renderChart()}
    </div>
  );
};

export default PurchaseChart;
