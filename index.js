const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 4500;

app.use(cors());
app.use(express.json());



const uri =`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.3b6qmgb.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        const fresherJobCollection = client.db('JobTask').collection('freshersJob');
        const experiencedJobCollection = client.db('JobTask').collection('experiencedJob');
        app.get('/jobs', async(req, res) => {
            const query = {}
            const cursor = fresherJobCollection.find(query).limit(3);
            const services = await cursor.toArray();
            res.send(services);
        });
        app.get('/jobs1', async(req, res) => {
            const query = {}
            const cursor = experiencedJobCollection.find(query).limit(3);
            const services = await cursor.toArray();
            res.send(services);
        });
        app.get('/jobs2', async(req, res) => {
            const query = {}
            const cursor = fresherJobCollection.find(query);
            const services = await cursor.toArray();
            res.send(services);
        });
        app.get('/jobs3', async(req, res) => {
            const query = {}
            const cursor = experiencedJobCollection.find(query);
            const services = await cursor.toArray();
            res.send(services);
        });
        
       

          
       
      
        
      
        
          


        
      
    }
    finally{

    }

}
run().catch(err=>console.log(err));


app.get('/', (req, res) => {
    res.send('Photography Server Running');
});

app.listen(port, () => {
    console.log(`Photography server running on port ${port}`);
})