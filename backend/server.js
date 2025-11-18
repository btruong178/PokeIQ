import express from 'express';
import cors from 'cors';
import dynamodbApiRouter from './DynamoDB/dynamodb-api.js';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to the Backend Server!');
});

app.use('/dynamoDB-api', dynamodbApiRouter);

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});