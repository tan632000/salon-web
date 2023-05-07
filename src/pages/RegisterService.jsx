/* eslint-disable array-callback-return */
import React, {useEffect, useState} from 'react';
import axiosClient from '../api/axiosClient';
import Modal from '../components/Modal';

const RegisterService = () => {
  const [registeredSalons, setRegisteredSalons] = useState([]);
  const [isVerified, setIsVerified] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axiosClient.get('/users/registered-salon')
    .then((data) => {
      setRegisteredSalons(data);
    })
    .catch(error => {
      console.error(error);
    });
  }, [isVerified]);

  const handleVerification = (event, salon) => {
    axiosClient.put(`/users/${salon._id}/verify-salon-registered`, { verified: !salon.verified })
      .then((data) => {
        setIsVerified(!isVerified);
      })
      .catch(error => {
        console.error(error);
      });
  };
  
  const handleImageClick = (image) => {
    console.log(image);
    setSelectedImage(image);
    setShowModal(true);
  }

  return (
    <div>
      <h1>Registered Salons</h1>
      <table>
        <thead>
          <tr>
            <th>Owner Photo</th>
            <th>Owner Name</th>
            <th>Owner Email</th>
            <th>Owner Phone</th>
            <th>Salon Name</th>
            <th>Salon Address</th>
            <th>Salon Phone</th>
            <th>Payment Proof</th>
            <th>Verified</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {registeredSalons.length > 0 && registeredSalons.map(salon => {
            return (
              <tr key={salon._id}>
                <td>
                  <img 
                    src={salon.userId.photo} 
                    alt={salon.userId.firstName} 
                    style={{width: '100%', height: 'auto', resize: 'contain'}}   
                  />
                </td>
                <td>{salon.userId.firstName} {salon.userId.lastName}</td>
                <td>{salon.userId.email}</td>
                <td>{salon.userId.phoneNumber}</td>
                <td>{salon.salonId.name}</td>
                <td>{salon.salonId.address}</td>
                <td>{salon.salonId.phone}</td>
                <td>
                  <img 
                    style={{width: 150, height: 300, cursor: 'pointer', resize: 'contain'}} 
                    src={salon.paymentProof} 
                    alt="Payment Proof"
                    onClick={() => handleImageClick(salon.paymentProof)}
                  />
                  </td>
                <td>
                  <button className={salon.verified ? 'verified' : 'unverified'} onClick={(event) => handleVerification(event, salon)}>
                  {salon.verified ? "Mark as Not Verified" : "Mark as Verified"}
                  </button>
                </td>
                <td>{new Date(salon.updatedAt).toLocaleString()}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Modal showModal={showModal} onClose={() => setShowModal(false)} imageSrc={selectedImage} />
    </div>
  );
};

export default RegisterService;