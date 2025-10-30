const axios = require('axios');

// Base URL for the imaginary API
const BASE_URL = 'https://www.jsonexperiment.com';

// Create an axios instance with default configuration
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Request interceptor - logs outgoing requests
axiosInstance.interceptors.request.use(
  (config) => {
    console.log('\n========== AXIOS REQUEST ==========');
    console.log(`Method: ${config.method.toUpperCase()}`);
    console.log(`URL: ${config.baseURL}${config.url}`);
    
    // Log query parameters if present
    if (config.params) {
      console.log('Query Parameters:', JSON.stringify(config.params, null, 2));
    }
    
    // Log headers
    console.log('Headers:', JSON.stringify(config.headers, null, 2));
    
    // Log request body if present
    if (config.data) {
      console.log('Request Body:', JSON.stringify(config.data, null, 2));
    }
    
    console.log('===================================\n');
    
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor - logs incoming responses
axiosInstance.interceptors.response.use(
  (response) => {
    console.log('\n========== AXIOS RESPONSE ==========');
    console.log(`Status: ${response.status} ${response.statusText}`);
    console.log(`Headers:`, JSON.stringify(response.headers, null, 2));
    console.log('Response Data:', JSON.stringify(response.data, null, 2));
    console.log('=====================================\n');
    
    return response;
  },
  (error) => {
    console.error('\n========== AXIOS ERROR ==========');
    
    if (error.response) {
      // Server responded with error status
      console.error(`Status: ${error.response.status} ${error.response.statusText}`);
      console.error('Error Data:', JSON.stringify(error.response.data, null, 2));
      console.error('Error Headers:', JSON.stringify(error.response.headers, null, 2));
    } else if (error.request) {
      // Request was made but no response received
      console.error('No response received');
      console.error('Request:', error.request);
    } else {
      // Error in setting up the request
      console.error('Error Message:', error.message);
    }
    
    console.error('==================================\n');
    
    return Promise.reject(error);
  }
);

/**
 * GET Request Example with query parameters and custom headers
 */
const exampleGetRequest = async () => {
  try {
    console.log('🚀 Starting GET Request Example...\n');
    
    const endpoint = '/api/users';
    const queryParams = {
      page: 1,
      limit: 10,
      sort: 'name',
      filter: 'active'
    };
    const customHeaders = {
      'X-API-Key': 'your-api-key-here',
      'X-Client-Version': '1.0.0',
      'Authorization': 'Bearer your-token-here'
    };
    
    const response = await axiosInstance.get(endpoint, {
      params: queryParams, // Query parameters
      headers: customHeaders // Custom headers
    });
    
    console.log('✅ GET Request Successful!');
    console.log('Response Status:', response.status);
    console.log('Response Data:', JSON.stringify(response.data, null, 2));
    
    return response.data;
  } catch (error) {
    console.error('❌ GET Request Failed!');
    
    // Graceful error handling
    if (error.response) {
      // Server responded with error status (4xx, 5xx)
      console.error('Error Status:', error.response.status);
      console.error('Error Data:', error.response.data);
    } else if (error.request) {
      // Request was made but no response received
      console.error('No response received from server');
    } else {
      // Error in setting up the request
      console.error('Error:', error.message);
    }
    
    throw error;
  }
};

/**
 * POST Request Example with JSON body, query parameters, and custom headers
 */
const examplePostRequest = async () => {
  try {
    console.log('🚀 Starting POST Request Example...\n');
    
    const endpoint = '/api/users';
    const jsonBody = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      age: 30,
      active: true,
      preferences: {
        theme: 'dark',
        notifications: true
      }
    };
    const queryParams = {
      notify: true,
      sendEmail: true
    };
    const customHeaders = {
      'X-API-Key': 'your-api-key-here',
      'X-Request-ID': `req-${Date.now()}`,
      'Authorization': 'Bearer your-token-here',
      'X-Client-Version': '1.0.0'
    };
    
    const response = await axiosInstance.post(
      endpoint,
      jsonBody, // JSON body
      {
        params: queryParams, // Query parameters
        headers: customHeaders // Custom headers
      }
    );
    
    console.log('✅ POST Request Successful!');
    console.log('Response Status:', response.status);
    console.log('Response Data:', JSON.stringify(response.data, null, 2));
    
    return response.data;
  } catch (error) {
    console.error('❌ POST Request Failed!');
    
    // Graceful error handling
    if (error.response) {
      // Server responded with error status (4xx, 5xx)
      console.error('Error Status:', error.response.status);
      console.error('Error Data:', error.response.data);
    } else if (error.request) {
      // Request was made but no response received
      console.error('No response received from server');
    } else {
      // Error in setting up the request
      console.error('Error:', error.message);
    }
    
    throw error;
  }
};

// Main function to run examples
const runExamples = async () => {
  console.log('===========================================');
  console.log('  AXIOS LEARNING EXAMPLES');
  console.log('  API: www.jsonexperiment.com');
  console.log('===========================================\n');
  
  try {
    // Run GET request example
    await exampleGetRequest();
    
    console.log('\n--- Waiting 2 seconds before next request ---\n');
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Run POST request example
    await examplePostRequest();
    
    console.log('\n===========================================');
    console.log('  All examples completed!');
    console.log('===========================================');
  } catch (error) {
    console.error('\n===========================================');
    console.error('  Examples completed with errors');
    console.error('  (This is expected since www.jsonexperiment.com is imaginary)');
    console.error('===========================================');
  }
};

// Run the examples if this file is executed directly
if (require.main === module) {
  runExamples();
}

module.exports = {
  exampleGetRequest,
  examplePostRequest,
  axiosInstance
};

