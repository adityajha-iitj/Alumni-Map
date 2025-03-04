import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI; // Store your MongoDB URI in an environment variable, process.env means the process which is happening, uska env kya hai, jaise yaha jab np run dev karte hai to environment mention hua v aata hai..

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

async function connectDB() {
  if (mongoose.connection.readyState >= 1) {
    return; // if already connected then it doesnt again starts new connection, this prevents multiple connections to the database
  }

  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }); // if no earlier connection then it awaits for a connection and then only proceeds
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

export default connectDB;


//mongoose.connect basically connection status, connection establish karne me and to disconnect etc karne me ahelp karnta
// mongoose.connect(uri, options), manually database se connection estab;lish karata hai . usenewUrlParser string chk karne m ehelp karta if it is valid uri 