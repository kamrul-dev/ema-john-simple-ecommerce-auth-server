const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const port = process.env.PORT || 5000;
const app = express();

//middleware
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hdgqt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const productCollection = client.db('emaJohn').collection('product');

        // get all data from this api
        //http://localhost:5000/product
        app.get('/product', async (req, res) => {
            const query = {};
            const cursor = productCollection.find(query);
            const products = await cursor.toArray();
            res.send(products);
        });

        //product count api from database
        //http://localhost:5000/productCount
        app.get('/productCount', async (req, res) => {
            const query = {};
            const cursor = productCollection.find(query);
            const count = await cursor.count();
            res.send({count});
        })
    }
    finally {

    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Ema-John is Running');
})

app.listen(port, () => {
    console.log('Listening Port', port);
})