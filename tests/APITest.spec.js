import { test, expect, request } from '@playwright/test';
import testData from '../testData/data.json'; // Assuming test data is stored here

let apiContext;

// Utility function to measure response time
async function measureResponseTime(requestFn) {
    const startTime = Date.now();
    const response = await requestFn();
    const endTime = Date.now();
    const responseTime = endTime - startTime;
    return { response, responseTime };
}

// Utility function to validate response
function validateResponse(response, expectedStatus, responseTimeLimit) {
    expect(response.status()).toBe(expectedStatus);
    expect(response.responseTime).toBeLessThan(responseTimeLimit);
}

test.beforeAll(async () => {
    apiContext = await request.newContext({
        baseURL: 'https://api.restful-api.dev',
        extraHTTPHeaders: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${testData.token}` // Token from test data
        }
    });
});

test('Verify Get Request for single object', async () => {
    const { response, responseTime } = await measureResponseTime(() => apiContext.get('/objects/2'));
    validateResponse({ status: () => response.status(), responseTime }, 200, 1000);

    const body = await response.json();
    expect(body.id).toBe('2');
    expect(body.name).toBe('Apple iPhone 12 Mini, 256GB, Blue');
});

test('Verify Get Request for multiple objects', async () => {
    const { response, responseTime } = await measureResponseTime(() => apiContext.get('/objects'));
    validateResponse({ ...response, responseTime }, 200, 1000);

    const body = await response.json();
    expect(Array.isArray(body)).toBeTruthy();
    expect(body.length).toBe(testData.expectedObjectCount);

    body.forEach((item) => {
        expect(item).toHaveProperty('id');
        expect(item).toHaveProperty('name');
        expect(item.id).toBeTruthy();
        expect(item.name).toBeTruthy();
    });
});

test('Verify Post Request for single object', async () => {
    const postData = {
        name: 'Mac book new',
        data: {
            year: 2026,
            price: 1849.99,
            'CPU model': 'Intel Core i9',
            'Hard disk size': '2 TB'
        }
    };

    const { response } = await measureResponseTime(() => apiContext.post('/objects', { data: postData }));
    validateResponse({ ...response }, 200, 1000);

    const body = await response.json();
    expect(body.name).toBe(postData.name);
});

test('Verify PUT Request for single object', async () => {
    const putData = {
        name: 'Mac book updated',
        data: {
            year: 2026,
            price: 1999.99,
            'CPU model': 'Intel Core i9',
            'Hard disk size': '2 TB'
        }
    };

    const { response } = await measureResponseTime(() => apiContext.put('/objects/ff8081819d62221a019d7827f1541f29', { data: putData }));
    validateResponse({ ...response }, 200, 1000);

    const body = await response.json();
    expect(body.name).toBe(putData.name);
});

test('Verify Delete Request for single object', async () => {
    const { response } = await measureResponseTime(() => apiContext.delete('/objects/ff8081819d62221a019d7827f1541f29'));
    validateResponse({ ...response }, 200, 1000);

    const body = await response.json();
    expect(body).toEqual({}); // Assuming delete returns an empty object
});