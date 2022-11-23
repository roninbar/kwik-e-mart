const PROXY_CONFIG = [
    {
        context: [
            '/api',
        ],
        target: 'http://localhost:3000',
        secure: false
    },
    {
        context: [
            '/products',
            '/receipts',
        ],
        target: 'https://kwik-e-mart.storage.googleapis.com',
        secure: true
    }
]

module.exports = PROXY_CONFIG;