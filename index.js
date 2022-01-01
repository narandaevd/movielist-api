const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const SERVER_PORT = process.env.PORT || 5000;
app.use(express.static(path.resolve(__dirname, 'build')));
app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
})
app.listen(SERVER_PORT, () => {
    console.log(`Application has been started on port: ${SERVER_PORT}...`)
})