// import React, { useState } from "react";
// import PropTypes from "prop-types";

// function EditStylistPopup(props) {
//   const [name, setName] = useState(props.stylist.name);
//   const [email, setEmail] = useState(props.stylist.email);
//   const [phoneNumber, setPhoneNumber] = useState(props.stylist.phoneNumber);
//   const [listService, setListService] = useState(props.stylist.listService);
//   const [rating, setRating] = useState(props.stylist.rating);

//   const handleNameChange = (event) => {
//     setName(event.target.value);
//   };

//   const handleEmailChange = (event) => {
//     setEmail(event.target.value);
//   };

//   const handlePhoneNumberChange = (event) => {
//     setPhoneNumber(event.target.value);
//   };

//   const handleListServiceChange = (event) => {
//     setListService(event.target.value);
//   };

//   const handleRatingChange = (event) => {
//     setRating(event.target.value);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const updatedStylist = {
//       ...props.stylist,
//       name: name,
//       email: email,
//       phoneNumber: phoneNumber,
//       listService: listService,
//       rating: rating,
//     };
//     props.onEdit(updatedStylist);
//   };

//   return (
//     <div className="popup">
//       <div className="popup-inner">
//         <form onSubmit={handleSubmit}>
//           <h2>Edit Stylist</h2>
//           <label>
//             Name:
//             <input type="text" value={name} onChange={handleNameChange} />
//           </label>
//           <label>
//             Email:
//             <input type="text" value={email} onChange={handleEmailChange} />
//           </label>
//           <label>
//             Phone Number:
//             <input
//               type="text"
//               value={phoneNumber}
//               onChange={handlePhoneNumberChange}
//             />
//           </label>
//           <label>
//             List Service:
//             <input
//               type="text"
//               value={listService}
//               onChange={handleListServiceChange}
//             />
//           </label>
//           <label>
//             Rating:
//             <input type="text" value={rating} onChange={handleRatingChange} />
//           </label>
//           <div className="button-group">
//             <button className="btn cancel" onClick={props.onClose}>
//               Cancel
//             </button>
//             <button className="btn save" type="submit">
//               Save
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// EditStylistPopup.propTypes = {
//   stylist: PropTypes.shape({
//     id: PropTypes.number.isRequired,
//     name: PropTypes.string.isRequired,
//     email: PropTypes.string.isRequired,
//     phoneNumber: PropTypes.string.isRequired,
//     listService: PropTypes.string.isRequired,
//     rating: PropTypes.number.isRequired,
//   }).isRequired,
//   onEdit: PropTypes.func.isRequired,
//   onClose: PropTypes.func.isRequired,
// };

// export default EditStylistPopup;

import React, { useState } from "react";
import { SERVICES } from "../constants/services";
import "../styles/EditStylistPopup.css";

const EditStylistPopup = ({ show, onClose, onEdit, stylist }) => {
  const [name, setName] = useState(stylist.name);
  const [email, setEmail] = useState(stylist.email);
  const [phoneNumber, setPhoneNumber] = useState(stylist.phoneNumber);
  const [rating, setRating] = useState(stylist.rating);
  const [selectedServices, setSelectedServices] = useState(stylist.listService);
  const [photo, setPhoto] = useState(stylist.photo);
  const handleEdit = () => {
    const updatedStylist = {
      ...stylist,
      name,
      email,
      phoneNumber,
      rating,
      listService: selectedServices,
      photo: photo,
    };
    onEdit(updatedStylist);
    onClose();
  };

  const handleClose = () => {
    onClose();
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

  const handlePhotoChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setPhoto(URL.createObjectURL(event.target.files[0]));
    }
  };
  return (
    <div className="overlay">
      <div
        className="modal-edit fade"
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
                      {SERVICES.map((service) => (
                        <option
                          value={service}
                          selected={selectedServices.includes(service) === true}
                        >
                          {service}
                        </option>
                      ))}
                    </select>
                    <span class="focus"></span>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="phoneNumber">Rating</label>
                  <input
                    type="number"
                    class="form-control"
                    id="formRating"
                    min="0"
                    max="5"
                    placeholder="Enter rating"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                  />
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
