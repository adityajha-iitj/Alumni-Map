import connectDB from "./dbConnect";
import Alumn from "./AlumniSchema";

export default async function no_filter_handler(req, res) {
    await connectDB(); // mongoDB se connection ke liye wait karega and then proceed karega
  
    try {
      const alumniData = await Alumn.find({}); // Fetch all records since no parameter is given
      res.status(200); // send response that data is successfully fetched 

      return(alumniData) // returns the fetched data to the caller function and which can be stored in a variable and then be used to fetch the locations 

    } catch (error) {
      console.log(error)
    }
  }

  