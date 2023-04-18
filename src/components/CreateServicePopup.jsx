import React, { useState } from "react";

const CreateServicePopup = ({ onClose, onAdd }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescChange = (event) => {
    setDescription(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleDurationChange = async (event) => {
    setDuration(event.target.value)
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const newService = {
      name: name,
      description: description,
      price: price,
      duration: duration,
      salonId: localStorage.getItem('salonId')
    };
    onAdd(newService);
    onClose();
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div className="overlay">
      <div
        className="modal fade"
        id="createService"
        tabIndex={-1}
        role="dialog"
        aria-aria-labelledby="createServiceLabel"
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
              <h3 class="title">Create Service</h3>
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
                  <label htmlFor="description">Description</label>
                  <input
                    type="text"
                    className="form-control"
                    id="description"
                    placeholder="Enter description"
                    value={description}
                    onChange={handleDescChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phoneNumber">Price</label>
                  <input
                    type="tel"
                    className="form-control"
                    id="price"
                    placeholder="Enter price"
                    value={price}
                    onChange={handlePriceChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="duration">Duration</label>
                  <input
                    type="text"
                    className="custom-file-input"
                    id="duration"
                    onChange={handleDurationChange}
                    required
                  />
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

export default CreateServicePopup;
