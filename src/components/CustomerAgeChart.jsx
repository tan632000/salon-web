import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

const CustomerAgeChart = ({ data }) => {
    const renderItem = () => {
        if (!data || data.length === 0) {
            return <p style={{paddingTop: 20, fontSize: 20}}>No data</p>
        } else {
            return (
                <BarChart
                    width={600}
                    height={400}
                    data={data}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                    <XAxis dataKey="age" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#82ca9d" />
                </BarChart>
            )
        }
    }
    
  return (
    <div>
        <h2>User Statistics List By Age</h2>
        {renderItem()}
    </div>
  );
};

export default CustomerAgeChart;
