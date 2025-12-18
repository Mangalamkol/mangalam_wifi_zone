import React, { useState, useEffect } from 'react';
import { getPlans, createPlan } from '../services/plans';

const Plans = () => {
  const [plans, setPlans] = useState([]);
  const [newPlan, setNewPlan] = useState({
    name: '',
    durationMinutes: '',
    price: '',
    deviceLimit: '',
  });

  useEffect(() => {
    getPlans().then(response => {
      setPlans(response.data);
    });
  }, []);

  const handleInputChange = (e) => {
    setNewPlan({ ...newPlan, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createPlan(newPlan).then(response => {
      setPlans([...plans, response.data]);
      setNewPlan({ name: '', durationMinutes: '', price: '', deviceLimit: '' });
    });
  };

  return (
    <div>
      <h1>Plans</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={newPlan.name}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="durationMinutes"
          placeholder="Duration (Minutes)"
          value={newPlan.durationMinutes}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={newPlan.price}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="deviceLimit"
          placeholder="Device Limit"
          value={newPlan.deviceLimit}
          onChange={handleInputChange}
        />
        <button type="submit">Create Plan</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Duration (Minutes)</th>
            <th>Price</th>
            <th>Device Limit</th>
          </tr>
        </thead>
        <tbody>
          {plans.map(plan => (
            <tr key={plan._id}>
              <td>{plan.name}</td>
              <td>{plan.durationMinutes}</td>
              <td>{plan.price}</td>
              <td>{plan.deviceLimit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Plans;
