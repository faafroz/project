import mongoose from 'mongoose';
const userSchema = mongoose.Schema({
  email: {type:String,require:true,unique:true},// unique is used to speed operations in the database
  password:{type:String,require:true},
});
export default mongoose.model('User',userSchema);
