import React from "react";
import {formatMoney} from '../utils/formatMoney.js'
const Card = ({ image, service, price, money }) => {
  return (
    <div className="card">
      <div className="image">{image}</div>
      <div className="content">
        <span className="service">{service}</span>
        <span className="price">{formatMoney(price)} {money && 'VNĐ'}</span>
      </div>
    </div>
  );
};

export default Card;
