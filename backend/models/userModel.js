import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    isAdmin: {type: Boolean, default: false, required: true}
}, {
    timestamps: true    //created at and updated at timestamps of the record
});

//create model based on userSchema
const User = mongoose.model("User", userSchema);

export default User;