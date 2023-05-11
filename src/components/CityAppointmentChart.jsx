import React from 'react';
import { PieChart, Pie, Legend, Tooltip } from 'recharts';

const CityAppointmentChart = ({ data }) => {
  return (
    <div>
      <h2>User Statistics List By Area</h2>
      <PieChart width={400} height={300}>
        <Pie
          data={data}
          dataKey="count"
          nameKey="_id"
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          label
        />
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default CityAppointmentChart;
