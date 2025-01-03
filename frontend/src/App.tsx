import React, { useState, useEffect } from 'react';
import ProductsPage from './ProductsPage';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => setIsLoggedIn(!isLoggedIn);

  return (
    <div>
      <header>
        <h1>Termékek</h1>
        <button onClick={handleLogin}>
          {isLoggedIn ? 'Kijelentkezés' : 'Bejelentkezés'}
        </button>
      </header>
      <ProductsPage isLoggedIn={isLoggedIn} />
    </div>
  );
};

export default App;