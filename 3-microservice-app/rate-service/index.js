const express = require('express');
const app = express();
const port = 3000;

app.get('/:company', (req, res) => {
    const { company } = req.params;
    const rate = {
        company: company,
        time: Math.floor(new Date().getTime() / 1000),
        value: Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000
    };
    res.json(rate);
});

app.listen(port, () => {
    console.log(`Rate service listening on port ${port}`);
});