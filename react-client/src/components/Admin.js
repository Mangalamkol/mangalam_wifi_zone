import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Admin = () => {
    const [plans, setPlans] = useState([]);
    const [coupons, setCoupons] = useState([]);
    const [newPlan, setNewPlan] = useState({ name: '', price: '', duration: '', deviceLimit: '' });

    useEffect(() => {
        fetchPlans();
        fetchCoupons();
    }, []);

    const fetchPlans = async () => {
        const res = await axios.get('http://localhost:5000/api/admin/plans');
        setPlans(res.data);
    };

    const fetchCoupons = async () => {
        const res = await axios.get('http://localhost:5000/api/admin/coupons');
        setCoupons(res.data);
    };

    const handlePlanChange = (e) => {
        setNewPlan({ ...newPlan, [e.target.name]: e.target.value });
    };

    const createPlan = async () => {
        await axios.post('http://localhost:5000/api/admin/plans', newPlan);
        fetchPlans();
    };

    const generateCoupons = async (planId) => {
        const count = prompt('How many coupons to generate?');
        if (count) {
            await axios.post(`http://localhost:5000/api/admin/plans/${planId}/generate-coupons`, { count: parseInt(count) });
            fetchCoupons();
        }
    };

    return (
        <div>
            <h1>Admin Panel</h1>

            <section>
                <h2>Plans</h2>
                <input type="text" name="name" placeholder="Plan Name" onChange={handlePlanChange} />
                <input type="number" name="price" placeholder="Price" onChange={handlePlanChange} />
                <input type="number" name="duration" placeholder="Duration (days)" onChange={handlePlanChange} />
                <input type="number" name="deviceLimit" placeholder="Device Limit" onChange={handlePlanChange} />
                <button onClick={createPlan}>Create Plan</button>
                <ul>
                    {plans.map(plan => (
                        <li key={plan._id}>
                            {plan.name} - ${plan.price} - {plan.duration} days - {plan.deviceLimit} devices
                            <button onClick={() => generateCoupons(plan._id)}>Generate Coupons</button>
                        </li>
                    ))}
                </ul>
            </section>

            <section>
                <h2>Coupons</h2>
                <ul>
                    {coupons.map(coupon => (
                        <li key={coupon._id}>
                            {coupon.code} - Plan: {coupon.plan.name} - Expires: {new Date(coupon.expiry).toLocaleDateString()}
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
};

export default Admin;