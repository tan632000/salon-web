import React, { useEffect, useState } from "react";
import StylistRow from "../components/StylistRow";
import CreateStylistPopup from "../components/CreateStylistPopup";
import EditStylistPopup from "../components/EditStylistPopup";
import "../styles/Stylist.css";
import axiosClient from "../api/axiosClient";
import { useDispatch, useSelector } from "react-redux";
import { ConfigActions, ConfigSelectors } from "../redux/configRedux";

const StylistPage = () => {
  const salonId = localStorage.getItem('salonId');
  const [stylists, setStylists] = useState([]);
  const dispatch = useDispatch();
  const updateDataMode = useSelector(ConfigSelectors.updateDateMode);

  useEffect(() => {
    axiosClient
      .get(`/stylists/${salonId}`)
      .then((data) => {
        setStylists(data)
      })
      .catch((err) => console.log(err))

    axiosClient
      .get(`/services/${salonId}`)
      .then((data) => {
        dispatch(ConfigActions.setListServices(data))
      })
      .catch((err) => console.log(err))
  }, [updateDataMode]);

  // State for showing or hiding the create stylist popup
  const [showCreatePopup, setShowCreatePopup] = useState(false);

  // State for showing or hiding the edit stylist popup
  const [showEditPopup, setShowEditPopup] = useState(false);

  // State for the stylist being edited
  const [editingStylist, setEditingStylist] = useState(null);

  // Function to add a new stylist to the stylists array
  const addStylist = async (stylist) => {
    try {
      axiosClient
      .post('/stylists', {...stylist})
      .then((data) => {
        dispatch(ConfigActions.setUpdateDataMode(!updateDataMode));
      })
      .catch((err) => console.log(err))
    } catch (error) {
      console.error("Error adding stylist:", error);
    }
  };

  // Function to delete a stylist from the stylists array
  const deleteStylist = (id) => {
    try {
      axiosClient
      .delete(`/stylists/${id}`)
      .then((data) => {
        dispatch(ConfigActions.setUpdateDataMode(!updateDataMode));
      })
      .catch((err) => console.log(err))
    } catch (error) {
      console.error("Error deleting stylist:", error);
    }
  };

  // Function to update an existing stylist in the stylists array
  const updateStylist = (updatedStylist) => {
    const dataUpdated = {
      name: updatedStylist.name,
      email: updatedStylist.email,
      phoneNumber: updatedStylist.phoneNumber,
      photo: updatedStylist.photo,
      servicesOffered: updatedStylist.servicesOffered,
    }
    try {
      axiosClient
      .put(`/stylists/${updatedStylist.id}`, { ...dataUpdated })
      .then((data) => {
        dispatch(ConfigActions.setUpdateDataMode(!updateDataMode));
      })
      .catch((err) => console.log(err))
    } catch (error) {
      console.log(error);
    }
  };

  // Function to open the create stylist popup
  const openCreatePopup = () => {
    setShowCreatePopup(true);
  };

  // Function to close the create stylist popup
  const closeCreatePopup = () => {
    setShowCreatePopup(false);
  };

  // Function to open the edit stylist popup
  const openEditPopup = (stylist) => {
    setEditingStylist(stylist);
    setShowEditPopup(true);
  };

  // Function to close the edit stylist popup
  const closeEditPopup = () => {
    setShowEditPopup(false);
    setEditingStylist(null);
  };

  return (
    <div>
      <h1>Stylists</h1>
      <button className="button" onClick={openCreatePopup}>
        Create Stylist
      </button>
      {showCreatePopup && (
        <CreateStylistPopup onClose={closeCreatePopup} onAdd={addStylist} />
      )}
      <table>
        <thead>
          <tr>
            <th>Avartar</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Services</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {stylists.map((stylist) => (
            <StylistRow
              key={stylist.id}
              stylist={stylist}
              onEditClick={openEditPopup}
              onDeleteClick={deleteStylist}
            />
          ))}
        </tbody>
      </table>
      {showEditPopup && (
        <EditStylistPopup
          onClose={closeEditPopup}
          stylist={editingStylist}
          onEdit={updateStylist}
        />
      )}
    </div>
  );
};

export default StylistPage;
