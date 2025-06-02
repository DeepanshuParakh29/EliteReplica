// Test script for API routes
// Run this with Node.js to test API routes locally

import fetch from 'node-fetch';

// Base URL for API routes
const BASE_URL = 'http://localhost:3000/api';

// Test user data
const testUser = {
  name: 'Test User',
  email: `test-${Date.now()}@example.com`,
  password: 'Password123!'
};

// Test registration route
async function testRegistration() {
  console.log('\n=== Testing User Registration ===');
  console.log(`Registering user with email: ${testUser.email}`);
  
  try {
    const response = await fetch(`${BASE_URL}/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testUser)
    });
    
    const data = await response.json();
    console.log('Response:', data);
    
    if (data.success) {
      console.log('✅ Registration test passed');
      return data.user;
    } else {
      console.log('❌ Registration test failed');
      return null;
    }
  } catch (error) {
    console.error('Error testing registration:', error);
    return null;
  }
}

// Main test function
async function runTests() {
  console.log('Starting API route tests...');
  
  // Test registration
  const user = await testRegistration();
  
  if (user) {
    console.log('\n✅ User registration successful!');
    console.log('User data:', user);
  } else {
    console.log('\n❌ User registration failed!');
  }
  
  console.log('\nAll tests completed!');
}

// Run the tests
runTests().catch(console.error);
