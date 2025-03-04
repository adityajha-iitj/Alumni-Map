import mongoose from "mongoose";


const AlumniSchema = new mongoose.Schema({
name:{type: String,require:true},
passout_year:{type: Number,require:true},
lat:{type:Number, require:true},
lng:{type:Number, require:true},
current_job:{
    name_of_company: {type:String,require:true},
},
previous_jobs: {type:Array,require:false},
department:{type:String, require:false},
degree_type:{type:String, require:true},
contact:{
    linkedin: {type:String, require:false},
    portfolio:{type:String, require:false}
}


})

const Alumn = mongoose.models.Alumn || mongoose.model("Alumn", AlumniSchema); // checks models obj if aumn already exist so that only one Sobject is being made and no multiple schemas are defined

export default Alumn;

//mongoose.model creates a new model or blueprint in the database, here "alumn" is the name of collection we want t create in the databse and mongo will convert in to lower case and plural..and the second arguement is the schema we wanter to follow.
// we did cost Alumn to make on object of this tyoe too in our code.