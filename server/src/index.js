const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');

dotenv.config();

const { getAbi } = require('./api');

const app = express();

app.use(cors())

app.get('/getContractAbi', async (req, res) => {
    try {
        const { network, address } = req.query;
        const response = await getAbi(network, address);
    
        res.send(response.data);
    } catch (error) {
        const { status = 500, data } = error.response || {};

        res.status(status).send(data);
    }
});

app.listen(8080);