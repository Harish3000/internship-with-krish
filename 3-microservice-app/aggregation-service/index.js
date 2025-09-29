const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

const services = {
    rate: 'http://rate-service:3000',
    allocation: 'http://allocation-service:3000',
    logistic: 'http://logistic-service:3000'
};

app.get('/:company', async (req, res) => {
    const { company } = req.params;
    const startTime = Date.now();

    const requests = Object.keys(services).map(service => {
        const url = `${services[service]}/${company}`;
        return axios.get(url, { timeout: 800 }).catch(error => {
            return { data: { value: 'no response' } };
        });
    });

    try {
        const [rateResponse, allocationResponse, logisticResponse] = await Promise.all(requests);

        const aggregation = {
            company: company,
            time: Math.floor(new Date().getTime() / 1000),
            value: rateResponse.data.value,
            duration: (Date.now() - startTime) / 1000,
            location: logisticResponse.data.location || ['no response']
        };
        res.json(aggregation);

    } catch (error) {
        res.status(500).json({ error: 'Failed to aggregate data' });
    }
});

app.listen(port, () => {
    console.log(`Aggregation service listening on port ${port}`);
});