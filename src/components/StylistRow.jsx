import React from "react";

const StylistRow = ({ stylist, onEditClick, onDeleteClick }) => {
  const { name, email, phoneNumber, listService, rating, photo } = stylist;

  return (
    <tr>
      <td>
        <img src={photo} className="image" />
      </td>
      <td>{name}</td>
      <td>{email}</td>
      <td>{phoneNumber}</td>
      <td>{listService.join(", ")}</td>
      <td>{rating}</td>
      <td>
        <button
          className="button button-edit"
          onClick={() => onEditClick(stylist)}
        >
          Edit
        </button>
      </td>
      <td>
        <button
          className="button button-delete"
          onClick={() => onDeleteClick(stylist.id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default StylistRow;
