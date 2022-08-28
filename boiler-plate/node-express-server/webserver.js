//vars + const
const express = require('express');
let app = express();
const port = 3000
let userAgent = require('user-agents');

//core
app.get('/', (req, res) => {
    res.send('Hello Express!')
})

app.listen(port,() => {
    console.log(`Listening on port ${port}`)
})

app.use(() => {
    console.log(userAgent)
})

//userAgentLogging
userAgent = new userAgent();
console.log(userAgent.toString());