import React from "react";
import {formatMoney} from '../utils/formatMoney.js'

const ServiceRow = ({ service, onEditClick, onDeleteClick }) => {
  const { _id, name, description, price, duration } = service;
  return (
    <tr key={_id}>
      <td>{name}</td>
      <td>{description}</td>
      <td>{formatMoney(price)} VND</td>
      <td>{duration} hour(s)</td>
      <td>
        <button
          className="button button-edit"
          onClick={() => onEditClick(service)}
        >
          Edit
        </button>
      </td>
      <td>
        <button
          className="button button-delete"
          onClick={() => onDeleteClick(service._id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ServiceRow;
