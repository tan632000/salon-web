import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { SERVICES } from "../constants/services";
import "../styles/CreateStylistPopup.css";

const CreateStylistPopup = ({ onClose, onAdd }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [selectedServices, setSelectedServices] = useState([]);
  const [photo, setPhoto] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handlePhotoChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setPhoto(URL.createObjectURL(event.target.files[0]));
    }
  };

  const handleServiceChange = (event) => {
    const options = event.target.options;
    const selectedValues = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedValues.push(options[i].value);
      }
    }
    setSelectedServices(selectedValues);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const newStylist = {
      id: uuidv4(),
      name: name,
      email: email,
      phoneNumber: phoneNumber,
      listService: selectedServices,
      rating: 0,
      photo: photo,
    };

    onAdd(newStylist);
    onClose();
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div className="overlay">
      <div
        className="modal fade"
        id="createStylist"
        tabIndex={-1}
        role="dialog"
        aria-aria-labelledby="createStylistLabel"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content clearfix">
            {/* Close button */}
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-aria-label="Close"
              onClick={handleClose}
            >
              <span aria-hidden="true">x</span>
            </button>
            <div className="modal-body">
              <h3 class="title">Create Stylist</h3>
              <form onSubmit={handleFormSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Enter name"
                    value={name}
                    onChange={handleNameChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={handleEmailChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phoneNumber">Phone Number</label>
                  <input
                    type="tel"
                    className="form-control"
                    id="phoneNumber"
                    placeholder="Enter phone number"
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="services">Services</label>
                  <div class="select select-multiple">
                    <select
                      id="multi-select"
                      multiple
                      onChange={handleServiceChange}
                    >
                      {SERVICES.map((service) => (
                        <option value={service}>{service}</option>
                      ))}
                    </select>
                    <span class="focus"></span>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="photo">Photo URL</label>
                  <input
                    type="file"
                    className="custom-file-input"
                    id="photo"
                    onChange={handlePhotoChange}
                    required
                  />
                  {photo && (
                    <img alt="preview image" src={photo} className="image" />
                  )}
                </div>

                <button type="submit" className="btn">
                  Create
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateStylistPopup;
