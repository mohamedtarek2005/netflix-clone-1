import { useEffect, useState } from 'react';
import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import Loading from '../components/Loading';

export default function Profile() {
  const { logout } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/users/me').then(setProfile).finally(() => setLoading(false));
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="page container" style={{ maxWidth: 480 }}>
      <h1>Profile</h1>
      <div style={{ background: 'var(--bg-elevated)', padding: 24, borderRadius: 8, marginBottom: 20 }}>
        <p><strong>Name:</strong> {profile.user.name}</p>
        <p><strong>Email:</strong> {profile.user.email}</p>
        <p>
          <strong>Subscription:</strong>{' '}
          {profile.subscription ? `${profile.subscription.plan} (${profile.subscription.status})` : 'No active plan'}
        </p>
      </div>
      <Button variant="secondary" onClick={logout}>Logout</Button>
    </div>
  );
}
