import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
    trim: true, 
  },
  firstName: {
    type: String,
    required: true,
    trim: true, 
  },
  lastName: {
    type: String,
    required: true,
    trim: true, 
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true, 
    match: [/\S+@\S+\.\S+/, 'Please enter a valid email address'], 
  },
  password: {
    type: String,
    required: true,
    minlength: 8, 
  },
  flights: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Flight'
    }
  ]
});


userSchema.index({ userName: 1, email: 1 });

export const User = mongoose.model('User', userSchema);
