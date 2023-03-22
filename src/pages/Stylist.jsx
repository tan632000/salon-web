import React, { useState } from "react";
import StylistRow from "../components/StylistRow";
import CreateStylistPopup from "../components/CreateStylistPopup";
import EditStylistPopup from "../components/EditStylistPopup";
import "../styles/Stylist.css";

const StylistPage = () => {
  // Initialize the stylist data with an empty array
  const [stylists, setStylists] = useState([
    {
      id: 1,
      photo:
        "https://www.shutterstock.com/image-photo/smiling-girl-student-wear-wireless-260nw-1492613150.jpg",
      name: "Jane Doe",
      email: "jane.doe@salon.com",
      phoneNumber: "5551234",
      listService: ["Haircut", "Coloring", "Styling"],
      rating: 4.8,
    },
    {
      id: 2,
      photo:
        "https://www.shutterstock.com/image-photo/smiling-girl-student-wear-wireless-260nw-1492613150.jpg",
      name: "John Smith",
      email: "john.smith@salon.com",
      phoneNumber: "5555678",
      listService: ["Haircut", "Shaving", "Beard Trimming"],
      rating: 4.8,
    },
    {
      id: 3,
      photo:
        "https://www.shutterstock.com/image-photo/smiling-girl-student-wear-wireless-260nw-1492613150.jpg",
      name: "Sarah Johnson",
      email: "sarah.johnson@salon.com",
      phoneNumber: "5559876",
      listService: ["Makeup", "Waxing", "Facials"],
      rating: 4.8,
    },
  ]);

  // State for showing or hiding the create stylist popup
  const [showCreatePopup, setShowCreatePopup] = useState(false);

  // State for showing or hiding the edit stylist popup
  const [showEditPopup, setShowEditPopup] = useState(false);

  // State for the stylist being edited
  const [editingStylist, setEditingStylist] = useState(null);

  // Function to add a new stylist to the stylists array
  const addStylist = (stylist) => {
    setStylists([...stylists, stylist]);
  };

  // Function to delete a stylist from the stylists array
  const deleteStylist = (id) => {
    setStylists(stylists.filter((stylist) => stylist.id !== id));
  };

  // Function to update an existing stylist in the stylists array
  const updateStylist = (updatedStylist) => {
    setStylists(
      stylists.map((stylist) => {
        if (stylist.id === updatedStylist.id) {
          return updatedStylist;
        }
        return stylist;
      })
    );
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
        // <div className="popup-background">
        <CreateStylistPopup onClose={closeCreatePopup} onAdd={addStylist} />
        // </div>
      )}
      <table>
        <thead>
          <tr>
            <th>Avartar</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Services</th>
            <th>Rating</th>
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
