const express = require('express')
const app = express();
const PORT = process.env.PORT || 3000;
const router = require('./src/router')
const cors = require('cors');

app.use(express.json({ limit: '50mb' }));
app.use(cors({
    origin: '*'
}))
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

app.use('/api/v1/variable', (req, res, next) => {
    next();
}, router);


app.listen(PORT,() =>{
    console.log(`App listening on port ${PORT}`)
})