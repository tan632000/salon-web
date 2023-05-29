import React from "react";
import {formatMoney} from '../utils/formatMoney.js'

const ServiceRow = ({ service, onEditClick, onDeleteClick }) => {
  const { _id, name, description, price, duration, images } = service;
  return (
    <tr key={_id}>
      <td>
        <img 
          src={images[0]}
          alt='service'
          style={{width: '100%', height: 'auto', resize: 'contain'}}
        />
      </td>
      <td>{name}</td>
      <td>{description}</td>
      <td>{formatMoney(price)} VND</td>
      <td>{duration} hour(s)</td>
      <td>
        <div className="button-container">
          <button
            className="button button-edit"
            onClick={() => onEditClick(service)}
          >
            Edit
          </button>
          <button
            className="button button-delete"
            onClick={() => onDeleteClick(service._id)}
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ServiceRow;
