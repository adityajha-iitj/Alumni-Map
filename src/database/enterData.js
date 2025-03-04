import fs from 'fs';
// import path from 'path';
import connectDB from './dbConnect'; // Your connection function
import Alumn from './AlumniSchema';   // Your Mongoose model


export default async function importJSONData() {
  
  await connectDB();
  
  try {
   
    
    const fileData = fs.readFileSync("src/database/coordinates.json", 'utf-8'); // apne ko ruk ke hi rehna h jab tk data upload na ho jaaye as uske aage ki cheeze data pe hi dependent h therefore we have to wait isliye  synchronus cheez use liya
    
    
    const jsonData = JSON.parse(fileData); // string object me convert kar diya JSON ko 
    
   
    await Alumn.insertMany(jsonData);
    console.log("Data successfully imported to MongoDB!");
    
  } catch (error) {
    console.error("Error importing JSON data:", error);
  }
}



