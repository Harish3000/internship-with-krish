const express = require('express');
const app = express();
const port = 3000;

app.get('/:company', (req, res) => {
    const { company } = req.params;
    const allocation = {
        company: company,
        time: Math.floor(new Date().getTime() / 1000),
        value: Math.floor(Math.random() * (100 - 10 + 1)) + 10
    };
    res.json(allocation);
});

app.listen(port, () => {
    console.log(`Allocation service listening on port ${port}`);
});