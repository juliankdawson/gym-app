import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'http://localhost:3000';

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

class ApiError extends Error {
  status: number;
  
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

const getAccessToken = async (): Promise<string | null> => {
  return await AsyncStorage.getItem('@auth_access_token');
};

const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

const accessToken = await getAccessToken();
if (accessToken && !(config.headers as Record<string, string>)['Authorization']) {
  config.headers = {
    ...(config.headers as Record<string, string>),
    Authorization: `Bearer ${accessToken}`,
  };
}
  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      let errorMessage = 'An error occurred';
      try {
        const errorData = await response.json();
        errorMessage = errorData.error || errorMessage;
      } catch {
        errorMessage = `HTTP ${response.status}: ${response.statusText}`;
      }
      throw new ApiError(errorMessage, response.status);
    }

    if (response.status === 204) {
      return null;
    }

    return await response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError('Network error. Please check your connection.', 0);
  }
};

export const authApi = {
  async login(email: string, password: string): Promise<AuthResponse> {
    return await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  async register(name: string, email: string, password: string): Promise<AuthResponse> {
    return await apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });
  },

  async refresh(refreshToken: string): Promise<AuthResponse> {
    return await apiRequest('/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
    });
  },

  async logout(refreshToken: string): Promise<void> {
    await apiRequest('/auth/logout', {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
    });
  },
};

export { ApiError };