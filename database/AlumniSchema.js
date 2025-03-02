import mongoose from "mongoose";


const AlumniSchema = new mongoose.Schema({
name:{type: String,require:true},
passout_year:{type: Number,require:true},
current_job:{
    name_of_company: {type:String,require:true},
    job_location: {type:String, require:true},

},
previous_jobs: {type:Array,require:false},
department:{type:String, require:false},
degree_type:{type:String, require:true},
contact:{
    linkedin: {type:String, require:false},
    portfolio:{type:String, require:false}
}


})

module.exports=mongoose.model('Alumn', AlumniSchema)