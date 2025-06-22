import React, { useState } from 'react';
import axios from 'axios';

export default function AnalyzeForm() {
  const [formData, setFormData] = useState({
    name: '',
    sector: '',
    is_sustainable: false,
    waste_amount: '',
    waste_type: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/auth/analyze/', formData);
      alert(`Prediction: ${res.data.prediction ? "Problem Detected" : "No Problem"}`);
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      <input name="name" placeholder="Company Name" onChange={handleChange} />
      <input name="sector" placeholder="Sector" onChange={handleChange} />
      <input name="waste_amount" type="number" placeholder="Waste Amount" onChange={handleChange} />
      <input name="waste_type" placeholder="Waste Type" onChange={handleChange} />
      <label>
        Sustainable?
        <input name="is_sustainable" type="checkbox" onChange={handleChange} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}
