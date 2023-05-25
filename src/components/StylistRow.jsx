import React from "react";

const StylistRow = ({ stylist, onEditClick, onDeleteClick }) => {
  const { id, name, email, phoneNumber, servicesOfferedName, photo } = stylist;
  return (
    <tr key={id}>
      <td>
        <img src={photo} className="image" />
      </td>
      <td>{name}</td>
      <td>{email}</td>
      <td>{phoneNumber}</td>
      <td>{servicesOfferedName.join(", ")}</td>
      <td>
        <div className="button-container">
          <button
            className="button button-edit"
            onClick={() => onEditClick(stylist)}
          >
            Edit
          </button>
          <button
            className="button button-delete"
            onClick={() => onDeleteClick(stylist.id)}
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
};

export default StylistRow;
