import { MongoClient, ServerApiVersion } from "mongodb";

export default function handler(req, res) {
  const uri =
    "mongodb+srv://human:human@master.tajtsyz.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });
  client.connect((err) => {
    const collection = client.db("tetris").collection("players");
    // perform actions on the collection object
    let scorers = collection.aggregate([
      { $sort: { scores: 1 } },
      { $limit: 10 },
    ]);

    client.close();
    res.status(500).json({ scorers });
  });
}
