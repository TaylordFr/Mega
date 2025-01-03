import { useEffect } from 'react';
import { logout } from '../api';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        await logout();
        navigate('/login');  // Kijelentkezés után vissza a bejelentkezés oldalra
      } catch (error) {
        alert('Logout failed');
      }
    };

    handleLogout();
  }, [navigate]);

  return <h2>Logging out...</h2>;
}

export default Logout;
