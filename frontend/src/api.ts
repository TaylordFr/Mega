interface ApiResponse {
    message: string; // Az API válaszainak struktúrája
  }
  
  const API_URL = 'http://localhost:3000';
  
  export const register = async (username: string, password: string): Promise<ApiResponse> => {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error('Registration failed');
    }
    return await response.json();
  };
  
  export const login = async (username: string, password: string): Promise<ApiResponse> => {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error('Login failed');
    }
    return await response.json();
  };
  
  export const logout = async (): Promise<ApiResponse> => {
    const response = await fetch(`${API_URL}/logout`, {
      method: 'POST',
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error('Logout failed');
    }
    return await response.json();
  };
  
  export const fetchProtected = async (): Promise<ApiResponse> => {
    const response = await fetch(`${API_URL}/protected`, {
      method: 'GET',
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error('Unauthorized');
    }
    return await response.json();
  };
  