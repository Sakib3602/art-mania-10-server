const express = require("express");
const app = express();
const port = 9000;

const cors = require("cors");

app.use(cors());
app.use(express.json());
// A95XIL7VbGicGJjn
// artandcraft

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri =
  "mongodb+srv://artandcraft:A95XIL7VbGicGJjn@cluster0.b5jufhp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    const database = client.db("artandcraft").collection("homecard");
    const database1 = client.db("artandcraft").collection("additem");

    // to get home card data from db
    app.get("/homecard", async (req, res) => {
      const cursor = await database.find().toArray();

      res.send(cursor);
    });

    app.get("/homecard/:id", async (req, res) => {
      const getId = req.params.id;
      const query = { _id: new ObjectId(getId) };
      const result = await database.findOne(query);
      res.send(result);
    });

    app.post("/addItemData", async (req, res) => {
      const takeData = req.body;

      const result = await database1.insertOne(takeData);
      res.send(result);
    });
    app.get("/addItemData", async (req, res) => {
      const cursor = await database1.find().toArray();
      res.send(cursor);
    });

    app.get("/addItemData/:id", async (req, res) => {
      const id = req.params;

      const query = { _id: new ObjectId(id) };
      const result = await database1.findOne(query);
      res.send(result);
    });

    app.get("/update/:id", async (req, res) => {
      const id = req.params;
      const query = { _id: new ObjectId(id) };
      const result = await database1.findOne(query);
      res.send(result);
    });

    app.put("/update/:id", async (req, res) => {
      const id = req.params;
      console.log(id);
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const coffee = req.body;
      const updateDoc = {
        $set: {
          customization: coffee.customization,
          email: coffee.email,
          itemName: coffee.itemName,
          photo: coffee.photo,
          price: coffee.price,
          process: coffee.process,
          ratings: coffee.ratings,
          stock: coffee.stock,
          subcategory: coffee.subcategory,
          username: coffee.username,
        },
      };

      const result = await database1.updateOne(filter, updateDoc, options);
      res.send(result);
      console.log("updated", result);
    });

    app.get("/addItemValue/:email", async (req, res) => {
      const email = req.params.email;
      console.log(email);
      const query = { email: email };
      const result = await database1.find(query).toArray();
      res.send(result);
    });




    app.delete('/deletedRoute/:email', async(req,res)=>{
      const query = { email : req.params.email };
      console.log(query)
      const result = await database1.deleteOne(query);
      res.send(result)
    })










    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
