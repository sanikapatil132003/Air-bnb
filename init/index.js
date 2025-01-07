const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("Connected to db");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  try {
    const ownerId = new mongoose.Types.ObjectId("67761480161b20227108ee2a"); // Convert to ObjectId

    // Validate and transform data
    const validData = initData.data.map((entry) => {
      if (typeof entry.image === "object" && entry.image.url) {
        entry.image = entry.image.url; // Use the URL if an object is passed
      }
      return { ...entry, owner: ownerId }; // Assign the ObjectId
    });

    await Listing.deleteMany({});
    await Listing.insertMany(validData); // Insert transformed data
    console.log("Database initialized with data");
  } catch (err) {
    console.error("Error initializing the database:", err);
  }
};

initDB();
