import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
  task_id: String,
  task_name: String,
  start_time: Date,
  end_time: Date,
  parent_id: String,
  progress: Number,
  description: String,
  completed: Boolean,
});

// Define a mongoose schema for your user data
const UserSchema = new mongoose.Schema({
  userid: String,
  tasks: [TaskSchema], // Embedding tasks schema as an array
});

// Define a mongoose model based on the schema
export const UserModel = mongoose.models.User || mongoose.model('User', UserSchema);