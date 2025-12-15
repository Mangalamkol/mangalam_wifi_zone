import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Public = () => {
    const [plans, setPlans] = useState([]);

    useEffect(() => {
        fetchPlans();
    }, []);

    const fetchPlans = async () => {
        const res = await axios.get('http://localhost:5000/api/public/plans');
        setPlans(res.data);
    };

    const purchasePlan = async (planId) => {
        try {
            const { data: { key } } = await axios.get('http://localhost:5000/api/payment/key');
            const { data: { order } } = await axios.post('http://localhost:5000/api/payment/create-order', { planId });

            const options = {
                key,
                amount: order.amount,
                currency: order.currency,
                name: "WiFi Hotspot",
                description: "Test Transaction",
                order_id: order.id,
                handler: function (response) {
                    axios.post('http://localhost:5000/api/payment/verify-payment', response);
                    alert('Payment Successful! Check your email for the coupon.');
                },
                prefill: {
                    name: "Test User",
                    email: "test.user@example.com",
                    contact: "9999999999"
                },
                notes: {
                    address: "Razorpay Corporate Office"
                },
                theme: {
                    color: "#3399cc"
                }
            };
            const rzp1 = new window.Razorpay(options);
            rzp1.open();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Available Plans</h1>
            <ul>
                {plans.map(plan => (
                    <li key={plan._id}>
                        {plan.name} - ${plan.price} - {plan.duration} days - {plan.deviceLimit} devices
                        <button onClick={() => purchasePlan(plan._id)}>Purchase</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Public;