import React, { useState } from "react";

const EditServicePopup = ({ show, onClose, onEdit, service }) => {
  const [formData, setFormData] = useState({
    name: service.name,
    description: service.description,
    price: service.price,
    duration: service.duration,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEdit = (event) => {
    event.preventDefault();
    const updatedservice = { ...service, ...formData };
    onEdit(updatedservice);
    onClose();
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div className="overlay">
      <div
        className="modal-edit fade"
        id="createservice"
        tabIndex={-1}
        role="dialog"
        aria-aria-labelledby="createserviceLabel"
        style={{height: 450, marginTop: 100}}
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
              <h3 className="title">Edit service</h3>
              <form onSubmit={handleEdit}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="formName"
                    placeholder="Enter name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <input
                    type="description"
                    className="form-control"
                    id="description"
                    placeholder="Enter description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="price">Price</label>
                  <input
                    type="tel"
                    className="form-control"
                    id="price"
                    placeholder="Enter price"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="duration">Duration</label>
                  <input
                    type="text"
                    className="custom-file-input"
                    id="duration"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                  />
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

export default EditServicePopup;
