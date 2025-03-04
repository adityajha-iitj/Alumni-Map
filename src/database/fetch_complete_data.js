import connectDB from "./dbConnect";
import Alumn from "./AlumniSchema";
import importJSONData from "./enterData";
import mongoose from "mongoose";

export default async function no_filter_handler() {
  await connectDB();
  if(!mongoose.modelNames().includes("alumnus")){importJSONData();} // if data is not already added, this fucntion adds the data to the database
  importJSONData();
  try {
    const alumniData = await Alumn.find({}); //earlier the data sent was not of js object type and thus was not getting processed properly...now it is converted to js object by adding .lean and hence it works properly
    return alumniData; 
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
