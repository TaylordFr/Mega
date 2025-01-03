import { useState, useEffect } from 'react';
import { fetchProtected } from '../api';
import { useNavigate } from 'react-router-dom';

function Protected() {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchProtected();
        setMessage(response.message);
      } catch (error) {
        setMessage('Unauthorized');
        navigate('/login');  // Ha a felhasználó nem bejelentkezett, vissza a login oldalra
      }
    };
    fetchData();
  }, [navigate]);

  return (
    <div>
      <h2>Protected Page</h2>
      <p>{message}</p>
    </div>
  );
}

export default Protected;
