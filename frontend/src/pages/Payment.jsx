import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { api } from '../api/client';
import Button from '../components/Button';
import ErrorMessage from '../components/ErrorMessage';

// Simplified/test payment flow: no card data is collected or sent anywhere
// — the backend's paymentService always "succeeds" for demo purposes.
export default function Payment() {
  const [params] = useSearchParams();
  const subscriptionId = params.get('subscriptionId');
  const navigate = useNavigate();

  const [status, setStatus] = useState('idle'); // idle | processing | success
  const [error, setError] = useState('');

  async function handlePay(e) {
    e.preventDefault();
    setStatus('processing');
    setError('');
    try {
      await api.post('/payments', { subscriptionId: Number(subscriptionId) });
      setStatus('success');
    } catch (err) {
      setError(err.message);
      setStatus('idle');
    }
  }

  if (status === 'success') {
    return (
      <div className="page container" style={{ textAlign: 'center' }}>
        <h1>Payment Successful 🎉</h1>
        <p>Your subscription is now active.</p>
        <Button onClick={() => navigate('/profile')}>Go to Profile</Button>
      </div>
    );
  }

  return (
    <div className="page container">
      <form className="form" onSubmit={handlePay}>
        <h2>Test Payment</h2>
        <ErrorMessage message={error} />
        <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>
          This is a simulated payment — no real card details are collected.
        </p>
        <input placeholder="Card number (test only)" defaultValue="4242 4242 4242 4242" disabled />
        <input placeholder="Expiry" defaultValue="12/34" disabled />
        <Button type="submit" disabled={status === 'processing'}>
          {status === 'processing' ? 'Processing...' : 'Pay & Activate'}
        </Button>
      </form>
    </div>
  );
}
