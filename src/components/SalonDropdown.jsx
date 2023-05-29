import React from 'react';
import Select from 'react-select';

const SalonDropdown = ({ salons, onChange }) => {
  const options = [
    { value: 'All', label: 'All Salons' },
    ...salons.map((salon) => ({ value: salon._id, label: salon.name })),
  ];

  const handleSelectChange = (selectedOption) => {
    onChange(selectedOption ? selectedOption.value : null);
  };

  return (
    <div style={{
      border: 1,
      borderRadius: 5,
      boxShadow: '5px 5px 5px #888888',
      marginTop: 10
    }}>
      <Select
        options={options}
        onChange={handleSelectChange}
        isClearable={true}
        placeholder="Select a salon"
      />
    </div>
  );
};

export default SalonDropdown;
