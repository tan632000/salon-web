import React from 'react';

const TopServices = ({ topServices }) => {
  return (
    <div>
      <h3>Top 5 Services Picked Most</h3>
      <table>
        <thead>
          <tr>
            <th>Service Name</th>
            <th>Salon Name</th>
            <th>Count</th>
          </tr>
        </thead>
        <tbody>
          {topServices.length > 0 && topServices.map(service => (
            <tr key={service.serviceId}>
              <td>{service.serviceName}</td>
              <td>{service.salonName}</td>
              <td>{service.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopServices;
