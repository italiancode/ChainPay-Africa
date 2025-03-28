const axios = require('axios');

// Your Reloadly sandbox credentials
const clientId = 'Sty4FSmbTndq8CZYVWnQVQ2PZV1gq8A5';
const clientSecret = '8N1Cm2F1QG-f0cXQXNHlB2ko0WXy59-a1VrPDZ2fH9Ev30UatI8IgsvtzzYwxQN';

// Base URLs for Reloadly sandbox
const authUrl = 'https://auth.reloadly.com/oauth/token';
const topupUrl = 'https://topups-sandbox.reloadly.com';

// Function to get access token
async function getAccessToken() {
    try {
        console.log('Attempting to get access token...');
        const response = await axios.post(authUrl, {
            client_id: clientId,
            client_secret: clientSecret,
            grant_type: 'client_credentials',
            audience: 'https://topups-sandbox.reloadly.com'
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log('Access token retrieved successfully');
        return response.data.access_token;
    } catch (error) {
        console.error('Error getting access token:', error.response?.data || error.message);
        throw error;
    }
}

// Function to fetch operator details (optional, for debugging)
async function getOperatorDetails(operatorId, accessToken) {
    try {
        const response = await axios.get(`${topupUrl}/operators/${operatorId}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Accept': 'application/com.reloadly.topups-v1+json'
            }
        });
        console.log(`Operator ${operatorId} details:`, response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching operator details:', error.response?.data || error.message);
        throw error;
    }
}

// Function to buy airtime with blockchain context
async function buyAirtime(operatorId, amount, recipientPhone, senderWallet, customIdentifier) {
    try {
        const accessToken = await getAccessToken();

        // Dummy senderPhone required by Reloadly API
        const senderPhone = { countryCode: 'CA', number: '11231231231' };
        const uniqueCustomIdentifier = `ChainPay-Blockchain-${customIdentifier}-${Date.now()}`; // Ensure uniqueness with timestamp

        console.log('Sending top-up request with payload:', {
            operatorId,
            amount,
            useLocalAmount: true,
            customIdentifier: uniqueCustomIdentifier,
            recipientPhone,
            senderPhone
        });

        const response = await axios.post(`${topupUrl}/topups`, {
            operatorId: operatorId,
            amount: amount,
            useLocalAmount: true,
            customIdentifier: uniqueCustomIdentifier,
            recipientPhone: recipientPhone,
            senderPhone: senderPhone
        }, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
                'Accept': 'application/com.reloadly.topups-v1+json'
            }
        });

        const transactionDetails = {
            ...response.data,
            senderWallet: senderWallet,
            message: 'Airtime purchased via ChainPay blockchain bill pay system'
        };

        console.log('Airtime purchase successful:', transactionDetails);
        return transactionDetails;
    } catch (error) {
        console.error('Error buying airtime:', error.response?.data || error.message);
        throw error;
    }
}

// Function to generate random custom identifier
function generateCustomIdentifier() {
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 8);
    return `ChainPay-${timestamp}-${randomString}`;
}

// Export the buyAirtime function
module.exports = {
    buyAirtime,
    generateCustomIdentifier
};


// Example usage with blockchain context
// async function main() {
//     try {
//         const operatorId = '535'; // EE PIN England
//         const amount = '10.00'; // Valid amount for this operator
//         const customIdentifier = generateCustomIdentifier(); // Generate random 
//         identifier
//         const recipientPhone = { countryCode: 'GB', number: 
//         '447951731337' }; // UK test number
//         const senderWallet = '0x1a2b3c4d5e6f7g8h9i0j'; // Example blockchain 
//         wallet address

//         console.log('Starting airtime purchase...');
//         const result = await buyAirtime(operatorId, amount, recipientPhone, 
//         senderWallet, customIdentifier);
//         console.log('Transaction Details:', result);
//     } catch (error) {
//         console.error('Main error:', error);
//     }
// }

// // Run the example
// main();