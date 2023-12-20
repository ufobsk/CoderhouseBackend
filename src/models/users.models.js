import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
    name: String,
    reference: String,
}, {_id: false});

const userSchema = new mongoose.Schema({
    first_name: { type: String },
    last_name: { type: String },
    email: {
        type: String,
        required: true,
        unique: true
    },
    age: { type: Number },
    password: {
        type: String,
        required: true
    },
    cart: { type: mongoose.Types.ObjectId, ref: 'Carts' },
    role: {
        type: String,
        enum: ['admin', 'usuario', 'premium']
    },
    githubId: {
        type: String,
        unique: true,
        sparse: true
    },
    username: String,
    passwordResetToken: String, 
    passwordResetExpires: Date, 
    documents: [fileSchema], 
    last_connection: Date,
});

const userModel = mongoose.model('User', userSchema);

export default userModel;