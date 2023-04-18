import React from "react";
import {formatMoney} from '../utils/formatMoney.js'
const Card = ({ image, service, price, money }) => {
  return (
    <div className="card">
      <div className="image">{image}</div>
      <div className="content">
        <text className="service">{service}</text>
        <text className="price">{formatMoney(price)} {money && 'VNĐ'}</text>
      </div>
    </div>
  );
};

export default Card;
