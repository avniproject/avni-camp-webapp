// API client utility for making requests to local camp server

class ApiClient {
  constructor() {
    this.baseURL = ''; // Use relative URLs since we're on the same server
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    const config = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    };

    // No auth token needed for local server communication
    // The local server will handle authentication with remote servers

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const error = await response.json().catch(() => ({ 
          message: `HTTP error! status: ${response.status}` 
        }));
        throw new Error(error.message || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API request failed: ${endpoint}`, error);
      throw error;
    }
  }

  // Sync API methods
  async startFullSync() {
    return this.request('/api/camp/full', { method: 'POST' });
  }

  async startUploadOnlySync() {
    return this.request('/api/camp/upload-only', { method: 'POST' });
  }

  async getSyncStatus() {
    return this.request('/api/camp/status');
  }

  async getSyncHistory(limit = 10) {
    return this.request(`/api/camp/history?limit=${limit}`);
  }

  async getSyncStatistics() {
    return this.request('/api/camp/statistics');
  }

  async getSyncConfig() {
    return this.request('/api/camp/config');
  }

  async cancelSync() {
    return this.request('/api/camp/cancel', { method: 'POST' });
  }

  async runDiagnostics() {
    return this.request('/api/camp/diagnostics');
  }
}

export default ApiClient;