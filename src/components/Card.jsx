import React from "react";
const Card = ({ image, service, price }) => {
  return (
    <div className="card">
      <div className="image">{image}</div>
      <div className="content">
        <text className="service">{service}</text>
        <text className="price">{price}</text>
      </div>
    </div>
  );
};

export default Card;
