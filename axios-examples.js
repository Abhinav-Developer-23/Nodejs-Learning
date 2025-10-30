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
    
    // Log request details
    console.log('========== AXIOS REQUEST ==========');
    console.log('Method: GET');
    console.log(`URL: ${BASE_URL}${endpoint}`);
    console.log('Query Parameters:', JSON.stringify(queryParams, null, 2));
    console.log('Headers:', JSON.stringify(customHeaders, null, 2));
    console.log('===================================\n');
    
    const response = await axiosInstance.get(endpoint, {
      params: queryParams, // Query parameters
      headers: customHeaders // Custom headers
    });
    
    // Log response details
    console.log('========== AXIOS RESPONSE ==========');
    console.log(`Status: ${response.status} ${response.statusText}`);
    console.log('Headers:', JSON.stringify(response.headers, null, 2));
    console.log('Response Data:', JSON.stringify(response.data, null, 2));
    console.log('=====================================\n');
    
    console.log('✅ GET Request Successful!');
    console.log('Response Status:', response.status);
    
    return response.data;
  } catch (error) {
    console.error('❌ GET Request Failed!');
    
    // Log error details
    console.error('\n========== AXIOS ERROR ==========');
    
    if (error.response) {
      // Server responded with error status (4xx, 5xx)
      console.error(`Status: ${error.response.status} ${error.response.statusText}`);
      console.error('Error Data:', JSON.stringify(error.response.data, null, 2));
      console.error('Error Headers:', JSON.stringify(error.response.headers, null, 2));
    } else if (error.request) {
      // Request was made but no response received
      console.error('No response received from server');
      console.error('Request:', error.request);
    } else {
      // Error in setting up the request
      console.error('Error Message:', error.message);
    }
    
    console.error('==================================\n');
    
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
    
    // Log request details
    console.log('========== AXIOS REQUEST ==========');
    console.log('Method: POST');
    console.log(`URL: ${BASE_URL}${endpoint}`);
    console.log('Query Parameters:', JSON.stringify(queryParams, null, 2));
    console.log('Headers:', JSON.stringify(customHeaders, null, 2));
    console.log('Request Body:', JSON.stringify(jsonBody, null, 2));
    console.log('===================================\n');
    
    const response = await axiosInstance.post(
      endpoint,
      jsonBody, // JSON body
      {
        params: queryParams, // Query parameters
        headers: customHeaders // Custom headers
      }
    );
    
    // Log response details
    console.log('========== AXIOS RESPONSE ==========');
    console.log(`Status: ${response.status} ${response.statusText}`);
    console.log('Headers:', JSON.stringify(response.headers, null, 2));
    console.log('Response Data:', JSON.stringify(response.data, null, 2));
    console.log('=====================================\n');
    
    console.log('✅ POST Request Successful!');
    console.log('Response Status:', response.status);
    
    return response.data;
  } catch (error) {
    console.error('❌ POST Request Failed!');
    
    // Log error details
    console.error('\n========== AXIOS ERROR ==========');
    
    if (error.response) {
      // Server responded with error status (4xx, 5xx)
      console.error(`Status: ${error.response.status} ${error.response.statusText}`);
      console.error('Error Data:', JSON.stringify(error.response.data, null, 2));
      console.error('Error Headers:', JSON.stringify(error.response.headers, null, 2));
    } else if (error.request) {
      // Request was made but no response received
      console.error('No response received from server');
      console.error('Request:', error.request);
    } else {
      // Error in setting up the request
      console.error('Error Message:', error.message);
    }
    
    console.error('==================================\n');
    
    throw error;
  }
};

/**
 * Promise.all Example - Making multiple requests concurrently
 * Demonstrates how to make multiple API calls in parallel
 */
const examplePromiseAll = async () => {
  try {
    console.log('🚀 Starting Promise.all Example...\n');
    
    // Create multiple axios promises
    const request1 = axiosInstance.get('/api/users', {
      params: { page: 1, limit: 5 },
      headers: { 'X-API-Key': 'key-1' }
    });
    
    const request2 = axiosInstance.get('/api/posts', {
      params: { page: 1, limit: 5 },
      headers: { 'X-API-Key': 'key-2' }
    });
    
    const request3 = axiosInstance.post('/api/notifications', 
      { message: 'Test notification' },
      {
        params: { notify: true },
        headers: { 'X-API-Key': 'key-3' }
      }
    );
    
    // Log all requests
    console.log('========== PROMISE.ALL REQUESTS ==========');
    console.log('Request 1: GET /api/users');
    console.log('Request 2: GET /api/posts');
    console.log('Request 3: POST /api/notifications');
    console.log('Executing all requests concurrently...\n');
    
    // Execute all requests concurrently using Promise.all
    const startTime = Date.now();
    const [response1, response2, response3] = await Promise.all([
      request1,
      request2,
      request3
    ]);
    const endTime = Date.now();
    const duration = endTime - startTime;
    
    // Log all responses
    console.log('========== PROMISE.ALL RESPONSES ==========');
    console.log(`All requests completed in ${duration}ms\n`);
    
    console.log('Response 1 (Users):');
    console.log(`  Status: ${response1.status}`);
    console.log(`  Data:`, JSON.stringify(response1.data, null, 2));
    
    console.log('\nResponse 2 (Posts):');
    console.log(`  Status: ${response2.status}`);
    console.log(`  Data:`, JSON.stringify(response2.data, null, 2));
    
    console.log('\nResponse 3 (Notifications):');
    console.log(`  Status: ${response3.status}`);
    console.log(`  Data:`, JSON.stringify(response3.data, null, 2));
    
    console.log('\n===========================================\n');
    
    console.log('✅ Promise.all Example Successful!');
    console.log(`Total time: ${duration}ms (faster than sequential requests)`);
    
    return {
      users: response1.data,
      posts: response2.data,
      notifications: response3.data,
      duration
    };
  } catch (error) {
    console.error('❌ Promise.all Example Failed!');
    
    // Log error details
    console.error('\n========== PROMISE.ALL ERROR ==========');
    
    if (error.response) {
      // Server responded with error status (4xx, 5xx)
      console.error(`Status: ${error.response.status} ${error.response.statusText}`);
      console.error('Error Data:', JSON.stringify(error.response.data, null, 2));
    } else if (error.request) {
      // Request was made but no response received
      console.error('No response received from server');
    } else {
      // Error in setting up the request
      console.error('Error Message:', error.message);
    }
    
    console.error('========================================\n');
    
    // Note: If any promise in Promise.all fails, the entire operation fails
    console.error('Note: Promise.all fails fast - if any request fails, all fail');
    
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
    
    console.log('\n--- Waiting 2 seconds before Promise.all example ---\n');
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Run Promise.all example
    await examplePromiseAll();
    
    console.log('\n===========================================');
    console.log('  All examples completed!');
    console.log('===========================================');
  } catch (error) {
    console.error('\n===========================================');
    console.error('  Examples completed with errors');
    console.error('  (This is expected since www.jsonexperiment.com is imaginary)');
    console.error(`  Error: ${error.message}`);
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
  examplePromiseAll,
  axiosInstance
};
