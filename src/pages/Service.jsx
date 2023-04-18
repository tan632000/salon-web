import React, { useEffect, useState } from "react";
import ServiceRow from "../components/ServiceRow";
import CreateServicePopup from "../components/CreateServicePopup";
import EditServicePopup from "../components/EditServicePopup";
import axiosClient from "../api/axiosClient";
import { useDispatch, useSelector } from "react-redux";
import { ConfigActions, ConfigSelectors } from "../redux/configRedux";
const Service = () => {
    const salonId = localStorage.getItem('salonId');
    const [services, setServices] = useState([]);
    const dispatch = useDispatch();
    const updateDataMode = useSelector(ConfigSelectors.updateDateMode);
  
    useEffect(() => {
      axiosClient
        .get(`/services/${salonId}`)
        .then((data) => {
            setServices(data)
            dispatch(ConfigActions.setListServices(data))
        })
        .catch((err) => console.log(err))
    }, [updateDataMode]);
  
    // State for showing or hiding the create service popup
    const [showCreatePopup, setShowCreatePopup] = useState(false);
  
    // State for showing or hiding the edit service popup
    const [showEditPopup, setShowEditPopup] = useState(false);
  
    // State for the service being edited
    const [editingService, setEditingService] = useState(null);
  
    // Function to add a new service to the services array
    const addService = async (service) => {
      try {
        axiosClient
        .post('/services', {...service})
        .then((data) => {
          dispatch(ConfigActions.setUpdateDataMode(!updateDataMode));
        })
        .catch((err) => console.log(err))
      } catch (error) {
        console.error("Error adding service:", error);
      }
    };
  
    // Function to delete a service from the services array
    const deleteService = (id) => {
      try {
        axiosClient
        .delete(`/services/${id}`)
        .then((data) => {
          dispatch(ConfigActions.setUpdateDataMode(!updateDataMode));
        })
        .catch((err) => console.log(err))
      } catch (error) {
        console.error("Error deleting service:", error);
      }
    };
  
    // Function to update an existing service in the services array
    const updateService = (updateService) => {
      const dataUpdated = {
        name: updateService.name,
        description: updateService.description,
        price: updateService.price,
        duration: updateService.duration,
      }
      try {
        axiosClient
        .put(`/services/${updateService._id}`, { ...dataUpdated })
        .then((data) => {
          dispatch(ConfigActions.setUpdateDataMode(!updateDataMode));
        })
        .catch((err) => console.log(err))
      } catch (error) {
        console.log(error);
      }
    };
  
    // Function to open the create service popup
    const openCreatePopup = () => {
      setShowCreatePopup(true);
    };
  
    // Function to close the create service popup
    const closeCreatePopup = () => {
      setShowCreatePopup(false);
    };
  
    // Function to open the edit service popup
    const openEditPopup = (service) => {
      setEditingService(service);
      setShowEditPopup(true);
    };
  
    // Function to close the edit service popup
    const closeEditPopup = () => {
      setShowEditPopup(false);
      setEditingService(null);
    };
    return (
        <div>
            <h1>Services</h1>
            <button className="button" onClick={openCreatePopup}>
                Create Service
            </button>
            {showCreatePopup && (
              <CreateServicePopup onClose={closeCreatePopup} onAdd={addService} />
            )}
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Duration</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>
                {services.map((service) => (
                  <ServiceRow
                    key={service._id}
                    service={service}
                    onEditClick={openEditPopup}
                    onDeleteClick={deleteService}
                  />
                ))}
                </tbody>
            </table>
            {showEditPopup && (
              <EditServicePopup
                  onClose={closeEditPopup}
                  service={editingService}
                  onEdit={updateService}
              />
            )}
        </div>
    );
};

export default Service;