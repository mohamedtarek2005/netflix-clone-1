import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api/client';
import Button from '../components/Button';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';

export default function Subscription() {
  const navigate = useNavigate();
  const [plans, setPlans] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    api.get('/subscriptions/plans').then((data) => setPlans(data.plans)).finally(() => setLoading(false));
  }, []);

  async function choosePlan(planKey) {
    setSubmitting(true);
    setError('');
    try {
      const data = await api.post('/subscriptions', { plan: planKey });
      navigate(`/payment?subscriptionId=${data.subscription.id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) return <Loading />;

  return (
    <div className="page container">
      <h1>Choose Your Plan</h1>
      <ErrorMessage message={error} />
      <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
        {Object.entries(plans).map(([key, plan]) => (
          <div key={key} style={{ background: 'var(--bg-elevated)', padding: 24, borderRadius: 8, width: 240 }}>
            <h2>{plan.name}</h2>
            <p style={{ fontSize: 28, fontWeight: 700 }}>${plan.price}<span style={{ fontSize: 14 }}>/month</span></p>
            <p style={{ color: 'var(--text-muted)' }}>{plan.quality} · {plan.devices} device(s)</p>
            <Button disabled={submitting} onClick={() => choosePlan(key)}>Select {plan.name}</Button>
          </div>
        ))}
      </div>
    </div>
  );
}
