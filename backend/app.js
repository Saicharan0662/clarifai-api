const express = require('express');
require('dotenv').config();
const cors = require('cors');
const app = express();

const connectDb = require('./db/connect');

const PORT = process.env.PORT || 5000;

const imageRouter = require('./routes/image')

//middlewares
app.use(express.json());
app.use(cors());

app.use('/api/v1', imageRouter);

const start = async () => {
    try {
        await connectDb(process.env.MONGO_URI);
        app.listen(PORT, () =>
            console.log(`Server is listening on port ${PORT}...`)
        );
    } catch (error) {
        console.log(error);
    }
}

start();