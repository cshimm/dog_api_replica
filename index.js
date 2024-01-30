import express from "express"
import {data} from './data/dog_facts.js'

const app = express();
const port = process.env.PORT || 3000;
app.set('port', port);

// Home route
app.get('/', (req, res) => {
    res.status(200);
    res.type('text/plain');
    res.send('Welcome to the home page');
});

// Facts route
app.get('/facts', (req, res) => {
    try {
        res.status(200);
        res.type('text/plain');
        let facts = [];
        // Absolute value of num param handles negative numbers
        const numFacts = Math.abs(req.query.num);
        // return from Math.abs will be truthy if num param was a number.
        // This protects against lexicographic string inputs (e.g. facts?num=abc)
        // if the num param is greater than the data's length, we return all facts
        if (!numFacts || numFacts > data.length) {
            return res.send({
                facts: data,
                success: 'true'
            });
        }
        // Iterate numFacts number of times and add each entry to facts array.
        for (let i = 0; i < numFacts; i++)
            facts.push(data[i]);
        return res.send({
            facts,
            success: 'true',
        });
    } catch (e) {
        // Send a status of 500 and error message upon invalid request
        res.type('text/plain');
        res.status(500);
        res.send({
            message: "Internal server error",
            success: false
        });
    }
});

// 404 route
app.use((req, res) => {
    res.status(404);
    res.send('404 Not Found');
});

app.listen(port, () => {
    console.log(`Running on port ${port}`);
});