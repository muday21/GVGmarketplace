// Test script to debug Better Auth session issues
// Using built-in fetch (Node.js 18+)

async function testSession() {
  console.log('🔍 Testing Better Auth Session...\n');
  
  try {
    // Test 1: Check if session endpoint works
    console.log('1. Testing custom session endpoint...');
    const sessionResponse = await fetch('http://localhost:3001/api/auth/get-session', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    const sessionData = await sessionResponse.json();
    console.log('Custom Session Response:', JSON.stringify(sessionData, null, 2));
    
    // Test 1b: Check main Better Auth session endpoint
    console.log('\n1b. Testing main Better Auth session endpoint...');
    const mainSessionResponse = await fetch('http://localhost:3000/api/auth/session', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    console.log('Main Session Status:', mainSessionResponse.status);
    console.log('Main Session Headers:', Object.fromEntries(mainSessionResponse.headers.entries()));
    
    if (mainSessionResponse.ok) {
      const mainSessionData = await mainSessionResponse.json();
      console.log('Main Session Response:', JSON.stringify(mainSessionData, null, 2));
    } else {
      const errorText = await mainSessionResponse.text();
      console.log('Main Session Error:', errorText);
    }
    
    // Test 2: Check debug user endpoint
    console.log('\n2. Testing debug user endpoint...');
    const debugResponse = await fetch('http://localhost:3001/api/debug/user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    const debugData = await debugResponse.json();
    console.log('Debug Response:', JSON.stringify(debugData, null, 2));
    
    // Test 3: Test login and check cookies
    console.log('\n3. Testing login with cookie tracking...');
    const loginResponse = await fetch('http://localhost:3001/api/auth/sign-in/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'berekettade7@gmail.com',
        password: '12345678'
      })
    });
    
    console.log('Login Status:', loginResponse.status);
    console.log('Login Headers:', Object.fromEntries(loginResponse.headers.entries()));
    
    const loginData = await loginResponse.json();
    console.log('Login Response:', JSON.stringify(loginData, null, 2));
    
    // Extract cookies from login response
    const setCookieHeader = loginResponse.headers.get('set-cookie');
    console.log('\n4. Cookies from login:', setCookieHeader);
    
    // Test 4: Test session with cookies
    if (setCookieHeader) {
      console.log('\n5. Testing session with cookies...');
      
      // Extract just the cookie value and name
      const cookieMatch = setCookieHeader.match(/([^=]+)=([^;]+)/);
      if (cookieMatch) {
        const cookieName = cookieMatch[1];
        const cookieValue = cookieMatch[2];
        const cookieString = `${cookieName}=${cookieValue}`;
        
        console.log('Extracted cookie:', cookieString);
        
        const sessionWithCookies = await fetch('http://localhost:3001/api/auth/get-session', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Cookie': cookieString
          },
        });
        
        const sessionWithCookiesData = await sessionWithCookies.json();
        console.log('Session with Cookies:', JSON.stringify(sessionWithCookiesData, null, 2));
      }
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testSession();