import React, { useState } from "react";

const EditServicePopup = ({ show, onClose, onEdit, service }) => {
  const [formData, setFormData] = useState({
    name: service.name,
    description: service.description,
    price: service.price,
    duration: service.duration,
    photo: service.images[0]
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
    setFormData({ ...formData, photo: data.secure_url })
  };

  return (
    <div className="overlay">
      <div
        className="modal-edit fade"
        id="editservice"
        tabIndex={-1}
        role="dialog"
        aria-aria-labelledby="editserviceLabel"
        style={{height: 590, marginTop: 100}}
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
              <span class="icon-cross"></span>
              <span class="visually-hidden">x</span>
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

                <div className="form-group">
                  <label htmlFor="photo">Photo URL</label>
                  <input
                    type="file"
                    onChange={handlePhotoChange}
                  />
                  {formData.photo && (
                    <img alt="preview image" src={formData.photo} className="image" />
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

export default EditServicePopup;
