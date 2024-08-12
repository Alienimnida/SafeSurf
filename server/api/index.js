const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 3000;
const corsOptions = {
    origin: 'https://safe-surf-ruby.vercel.app',
    credentials: true,
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const endpointCorsOptions = cors({
    origin: 'https://safe-surf-ruby.vercel.app',
    methods: ['POST', 'GET'],
    allowedHeaders: ['Content-Type'],
    credentials: true
});
app.options('/', endpointCorsOptions);
app.options('/api/scan', endpointCorsOptions);
app.options('/api/result/:scanId', endpointCorsOptions);

app.get('/', async (req, res) => {
    res.send("Hello world");
});


app.post('/api/scan', async (req, res) => {
    try {
        const response = await axios.post('https://urlscan.io/api/v1/scan/',
            { url: req.body.url },
            { headers: { 'API-Key': process.env.URLSCAN_API_KEY } }
        );
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/result/:scanId', async (req, res) => {
    try {
        const response = await axios.get(`https://urlscan.io/api/v1/result/${req.params.scanId}/`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Proxy server listening at http://localhost:${port}`);
});