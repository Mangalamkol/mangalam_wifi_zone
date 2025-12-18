import React, { useState } from 'react';

function Help() {
  const [paymentId, setPaymentId] = useState('');
  const [coupon, setCoupon] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRecover = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setCoupon(null);

    try {
      const response = await fetch('/api/coupons/recover', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ payment_id: paymentId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to recover coupon');
      }

      setCoupon(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Coupon Recovery</h1>
      <p className="mb-4">Enter your payment ID to recover your coupon details.</p>
      
      <form onSubmit={handleRecover}>
        <div className="mb-4">
          <label htmlFor="paymentId" className="block text-sm font-medium text-gray-700">Payment ID</label>
          <input
            type="text"
            id="paymentId"
            value={paymentId}
            onChange={(e) => setPaymentId(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <button type="submit" disabled={loading} className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          {loading ? 'Recovering...' : 'Recover Coupon'}
        </button>
      </form>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {coupon && (
        <div className="mt-8 bg-gray-100 p-4 rounded-md">
          <h2 className="text-xl font-bold">Your Coupon Details</h2>
          <p><strong>Code:</strong> {coupon.code}</p>
          <p><strong>Expires At:</strong> {new Date(coupon.expiresAt).toLocaleString()}</p>
          <p><strong>Plan:</strong> {coupon.planName}</p>
          <p><strong>Device Limit:</strong> {coupon.deviceLimit}</p>
        </div>
      )}
    </div>
  );
}

export default Help;
