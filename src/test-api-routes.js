// Test script for API routes
// Run this with Node.js to test API routes locally

const fetch = require('node-fetch');

// Base URL for API routes
const BASE_URL = 'http://localhost:3000/api';

// Test user data
const testUser = {
  name: 'Test User',
  email: `test-${Date.now()}@example.com`,
  password: 'Password123!'
};

let verificationToken = '';
let resetToken = '';

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

// Test email verification route
async function testEmailVerification(token) {
  console.log('\n=== Testing Email Verification ===');
  console.log(`Verifying email with token: ${token}`);
  
  try {
    const response = await fetch(`${BASE_URL}/users/verify-email?token=${token}`, {
      method: 'GET'
    });
    
    const data = await response.json();
    console.log('Response:', data);
    
    if (data.success) {
      console.log('✅ Email verification test passed');
      return true;
    } else {
      console.log('❌ Email verification test failed');
      return false;
    }
  } catch (error) {
    console.error('Error testing email verification:', error);
    return false;
  }
}

// Test password reset request route
async function testPasswordResetRequest() {
  console.log('\n=== Testing Password Reset Request ===');
  console.log(`Requesting password reset for email: ${testUser.email}`);
  
  try {
    const response = await fetch(`${BASE_URL}/users/reset-password/request`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: testUser.email })
    });
    
    const data = await response.json();
    console.log('Response:', data);
    
    if (data.success) {
      console.log('✅ Password reset request test passed');
      return true;
    } else {
      console.log('❌ Password reset request test failed');
      return false;
    }
  } catch (error) {
    console.error('Error testing password reset request:', error);
    return false;
  }
}

// Test password reset confirmation route
async function testPasswordResetConfirm(token) {
  console.log('\n=== Testing Password Reset Confirmation ===');
  console.log(`Confirming password reset with token: ${token}`);
  
  const newPassword = 'NewPassword123!';
  
  try {
    const response = await fetch(`${BASE_URL}/users/reset-password/confirm`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token,
        password: newPassword,
        confirmPassword: newPassword
      })
    });
    
    const data = await response.json();
    console.log('Response:', data);
    
    if (data.success) {
      console.log('✅ Password reset confirmation test passed');
      testUser.password = newPassword;
      return true;
    } else {
      console.log('❌ Password reset confirmation test failed');
      return false;
    }
  } catch (error) {
    console.error('Error testing password reset confirmation:', error);
    return false;
  }
}

// Test admin user route (GET)
async function testAdminUserGet() {
  console.log('\n=== Testing Admin User GET ===');
  
  try {
    const response = await fetch(`${BASE_URL}/users/admin`, {
      method: 'GET',
      headers: {
        'Cookie': 'admin_token=YOUR_ADMIN_TOKEN_HERE' // Replace with actual admin token
      }
    });
    
    const data = await response.json();
    console.log('Response:', data);
    
    if (response.status === 200) {
      console.log('✅ Admin user GET test passed');
      return true;
    } else {
      console.log('❌ Admin user GET test failed');
      return false;
    }
  } catch (error) {
    console.error('Error testing admin user GET:', error);
    return false;
  }
}

// Main test function
async function runTests() {
  console.log('Starting API route tests...');
  
  // Test registration
  const user = await testRegistration();
  
  if (user) {
    // For testing purposes, we would need to get the verification token from the database
    // In a real test scenario, you would need to extract this from the database or logs
    console.log('\n⚠️ To test email verification, you need the verification token from the database or email logs.');
    console.log('⚠️ To test password reset, you need the reset token from the database or email logs.');
    
    // Uncomment these lines when you have the tokens
    // await testEmailVerification(verificationToken);
    // await testPasswordResetRequest();
    // await testPasswordResetConfirm(resetToken);
  }
  
  // Test admin route (requires admin token)
  console.log('\n⚠️ To test admin routes, you need a valid admin token.');
  // await testAdminUserGet();
  
  console.log('\nAll tests completed!');
}

// Run the tests
runTests().catch(console.error);
