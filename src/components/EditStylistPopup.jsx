import React, { useState } from "react";
import { useSelector } from "react-redux";
import { ConfigSelectors } from "../redux/configRedux";
import "../styles/EditStylistPopup.css";

const EditStylistPopup = ({ show, onClose, onEdit, stylist }) => {
  const [name, setName] = useState(stylist.name);
  const [email, setEmail] = useState(stylist.email);
  const listServices = useSelector(ConfigSelectors.listServices);
  const [phoneNumber, setPhoneNumber] = useState(stylist.phoneNumber);
  const [selectedServices, setSelectedServices] = useState(stylist.servicesOfferedName);
  const [photo, setPhoto] = useState(stylist.photo);
  const [editService, setEditService] = useState(false);

  const handleEdit = () => {
    const updatedStylist = {
      ...stylist,
      name,
      email,
      phoneNumber,
      servicesOffered: editService === true ? selectedServices : stylist.servicesOffered,
      photo: photo,
    };
    onEdit(updatedStylist);
    onClose();
  };

  const handleClose = () => {
    onClose();
  };

  const handleServiceChange = (event) => {
    setEditService(true);
    const options = event.target.options;
    const selectedValues = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedValues.push(options[i].value);
      }
    }
    setSelectedServices(selectedValues);
  };

  const handlePhotoChange = async (event) => {
    let file = '';
    if (event.target.files && event.target.files[0]) {
      file = event.target.files[0];
    }
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'imageupload');
    const data = await fetch('https://api.cloudinary.com/v1_1/c-ng-ty-tnhh-cic-vi-t-nam-chapter/image/upload', {
      method: 'POST',
      body: formData
    }).then(r => r.json());
    setPhoto(data.secure_url)
  };
  return (
    <div className="overlay">
      <div
        className="modal-edit fade"
        id="createStylist"
        tabIndex={-1}
        role="dialog"
        aria-aria-labelledby="createStylistLabel"
        style={{height: 700, marginTop: 20}}
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
              <h3 class="title">Edit Stylist</h3>
              <form onSubmit={handleEdit}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    class="form-control"
                    id="formName"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
                    onChange={(e) => setEmail(e.target.value)}
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
                    onChange={(e) => setPhoneNumber(e.target.value)}
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
                      {listServices.map((service) => (
                        <option
                          value={service._id}
                          selected={selectedServices.includes(service.name) === true}
                        >
                          {service.name}
                        </option>
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
                  />
                  {photo && (
                    <img alt="preview image" src={photo} className="image" />
                  )}
                </div>

                <button type="submit" className="btn">
                  Edit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditStylistPopup;
