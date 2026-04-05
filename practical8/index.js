import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const uri = process.env.MONGODB_URI || "";
const client = new MongoClient(uri);

let studentsCollection;

async function connectDB() {
  await client.connect();
  const db = client.db();
  studentsCollection = db.collection("students");
  console.log("Connected to MongoDB");
}

connectDB().catch(console.error);

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.get("/students", async (req, res) => {
  const students = await studentsCollection.find().toArray();
  res.json(students);
});

app.post("/students", async (req, res) => {
  console.log(req.headers);
  console.log(req.body);
  const { name, age, course, email } = req.body;
  const newStudent = { name, age, course, email };
  const result = await studentsCollection.insertOne(newStudent);
  res.status(201).json({ insertedId: result.insertedId });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
