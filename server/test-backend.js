const axios = require('axios');

const API_URL = 'http://localhost:5000/api';
let authToken = '';
let userId = '';

// Test user data
const testUser = {
    email: 'test@example.com',
    password: 'Test123!@#',
    name: 'Test User',
    phone: '1234567890'
};

// Colors for console output
const colors = {
    reset: '\x1b[0m',
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m'
};

const log = {
    success: (msg) => console.log(colors.green + '✓ ' + msg + colors.reset),
    error: (msg) => console.log(colors.red + '✗ ' + msg + colors.reset),
    info: (msg) => console.log(colors.yellow + 'ℹ ' + msg + colors.reset)
};

// Test functions
async function testServerHealth() {
    try {
        const response = await axios.get(`${API_URL}/health`);
        if (response.status === 200) {
            log.success('Server is running');
            return true;
        }
    } catch (error) {
        log.error('Server health check failed');
        console.error(error.message);
        return false;
    }
}

async function testRegistration() {
    try {
        const response = await axios.post(`${API_URL}/users/register`, testUser);
        if (response.data.token) {
            log.success('Registration successful');
            authToken = response.data.token;
            userId = response.data.user._id;
            return true;
        }
    } catch (error) {
        log.error('Registration failed');
        console.error(error.response?.data || error.message);
        return false;
    }
}

async function testLogin() {
    try {
        const response = await axios.post(`${API_URL}/users/login`, {
            email: testUser.email,
            password: testUser.password
        });
        if (response.data.token) {
            log.success('Login successful');
            authToken = response.data.token;
            return true;
        }
    } catch (error) {
        log.error('Login failed');
        console.error(error.response?.data || error.message);
        return false;
    }
}

async function testProtectedRoute() {
    try {
        const response = await axios.get(`${API_URL}/users/profile`, {
            headers: { Authorization: `Bearer ${authToken}` }
        });
        if (response.data) {
            log.success('Protected route access successful');
            return true;
        }
    } catch (error) {
        log.error('Protected route access failed');
        console.error(error.response?.data || error.message);
        return false;
    }
}

async function testDatabaseConnection() {
    try {
        const response = await axios.get(`${API_URL}/health/db`);
        if (response.status === 200) {
            log.success('Database connection successful');
            return true;
        }
    } catch (error) {
        log.error('Database connection failed');
        console.error(error.response?.data || error.message);
        return false;
    }
}

async function cleanup() {
    try {
        if (userId) {
            await axios.delete(`${API_URL}/users/${userId}`, {
                headers: { Authorization: `Bearer ${authToken}` }
            });
            log.info('Test user cleaned up');
        }
    } catch (error) {
        log.error('Cleanup failed');
        console.error(error.response?.data || error.message);
    }
}

// Main test runner
async function runTests() {
    log.info('Starting backend tests...');
    
    const tests = [
        { name: 'Server Health', fn: testServerHealth },
        { name: 'Database Connection', fn: testDatabaseConnection },
        { name: 'User Registration', fn: testRegistration },
        { name: 'User Login', fn: testLogin },
        { name: 'Protected Route Access', fn: testProtectedRoute }
    ];

    const results = [];
    
    for (const test of tests) {
        log.info(`Running test: ${test.name}`);
        const success = await test.fn();
        results.push({ name: test.name, success });
    }

    // Cleanup
    await cleanup();

    // Summary
    console.log('\nTest Summary:');
    results.forEach(result => {
        if (result.success) {
            log.success(`${result.name}: Passed`);
        } else {
            log.error(`${result.name}: Failed`);
        }
    });

    const passedTests = results.filter(r => r.success).length;
    const totalTests = results.length;
    
    console.log(`\nPassed ${passedTests} out of ${totalTests} tests`);
}

// Run tests
runTests(); 